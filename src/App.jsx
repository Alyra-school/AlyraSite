import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProgramCatalog from "./components/ProgramCatalog";
import ProgramDetailPage from "./components/ProgramDetailPage";
import StaticPage from "./components/StaticPage";
import AppointmentPage from "./components/AppointmentPage";
import NotFoundPage from "./components/NotFoundPage";
import { routeMeta } from "./data/siteMeta";
import useDocumentMeta from "./hooks/useDocumentMeta";
import { staticPagesData } from "./data/staticPagesData";
import { fetchProgramPageContent } from "./services/programPagesRepository";
import { fetchPrograms } from "./services/programsRepository";
import { parseDurationWeeks } from "./utils/programUtils";

const staticRoutes = {
  "/financement": "financement",
  "/vos-besoins": "vos-besoins",
  "/blog": "blog",
  "/qui-sommes-nous": "qui-sommes-nous",
  "/nos-anciens": "nos-anciens",
  "/rendez-vous": "rendez-vous",
};

const routeLabels = {
  home: "Accueil",
  catalog: "Programmes",
  financement: "Financement",
  "vos-besoins": "Vos besoins",
  blog: "Blog",
  "qui-sommes-nous": "Qui sommes nous",
  "nos-anciens": "Nos Anciens",
  "rendez-vous": "Prendre rendez-vous",
  "not-found": "Page introuvable",
};

function getRouteName(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/programmes") return "catalog";
  if (pathname.startsWith("/programmes/")) return "detail";
  return staticRoutes[pathname] ?? "not-found";
}

function ProgramDetailRoute({
  programBySlug,
  catalog,
  isLoading,
  onBack,
  onOpenProgram,
  onHome,
  onCatalog,
}) {
  const { slug } = useParams();
  const program = slug ? programBySlug[slug] : null;
  const [detailContent, setDetailContent] = useState(null);
  const [isContentLoading, setIsContentLoading] = useState(false);

  const similarPrograms = useMemo(() => {
    if (!program) return [];
    return catalog
      .filter((item) => item.slug !== program.slug)
      .map((item) => ({
        ...item,
        score: item.tags.filter((tag) => program.tags.includes(tag)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [catalog, program]);

  useEffect(() => {
    let isMounted = true;

    async function loadDetailContent() {
      if (!program) return;
      setDetailContent(null);
      setIsContentLoading(true);
      const { data } = await fetchProgramPageContent(program);
      if (!isMounted) return;
      setDetailContent(data);
      setIsContentLoading(false);
    }

    loadDetailContent();
    return () => {
      isMounted = false;
    };
  }, [program]);

  if (!program && isLoading) {
    return (
      <main className="main-content" id="main-content" tabIndex="-1">
        <section className="hero programs-hero">
          <div className="section-head">
            <h1>Chargement de la formation...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (!program) {
    return (
      <NotFoundPage
        title="Formation introuvable"
        message="Cette formation n'existe pas ou n'est plus disponible dans notre catalogue."
        onHome={onHome}
        onCatalog={onCatalog}
      />
    );
  }

  return (
    <ProgramDetailPage
      program={program}
      similarPrograms={similarPrograms}
      detailContent={detailContent}
      isContentLoading={isContentLoading}
      onBack={onBack}
      onOpenProgram={onOpenProgram}
      onHome={onHome}
      onCatalog={onCatalog}
    />
  );
}

export default function App() {
  const navRef = useRef(null);
  const mobileNavBaseHeightRef = useRef(0);
  const [programs, setPrograms] = useState([]);
  const [isProgramsLoading, setIsProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    async function loadPrograms() {
      setIsProgramsLoading(true);
      const { data, error } = await fetchPrograms();
      if (!isMounted) return;
      setPrograms(data);
      setProgramsError(error);
      setIsProgramsLoading(false);
    }

    loadPrograms();
    return () => {
      isMounted = false;
    };
  }, []);

  const routeName = getRouteName(location.pathname);

  const programBySlug = useMemo(() => {
    return programs.reduce((acc, program) => {
      acc[program.slug] = program;
      return acc;
    }, {});
  }, [programs]);

  const activeProgram = routeName === "detail"
    ? programBySlug[location.pathname.replace("/programmes/", "")]
    : null;

  const featuredLongProgram = useMemo(() => {
    return [...programs]
      .sort((a, b) => parseDurationWeeks(b.duration) - parseDurationWeeks(a.duration))
      .at(0);
  }, [programs]);

  const baseUrl = "https://www.alyra.fr";
  const breadcrumbItems = useMemo(() => {
    const list = [{ name: "Accueil", path: "/" }];

    if (routeName === "catalog") {
      list.push({ name: "Programmes", path: "/programmes" });
    }

    if (routeName === "detail" && activeProgram) {
      list.push({ name: "Programmes", path: "/programmes" });
      list.push({ name: activeProgram.title, path: location.pathname });
    }

    if (
      routeName !== "home" &&
      routeName !== "catalog" &&
      routeName !== "detail" &&
      routeLabels[routeName]
    ) {
      list.push({ name: routeLabels[routeName], path: location.pathname });
    }

    return list;
  }, [routeName, activeProgram, location.pathname]);

  const meta = useMemo(() => {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Alyra, l'ecole Blockchain et IA",
      url: baseUrl,
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Alyra",
      url: baseUrl,
    };

    const breadcrumbSchema =
      breadcrumbItems.length > 1
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: `${baseUrl}${item.path}`,
            })),
          }
        : null;

    if (routeName === "detail" && activeProgram) {
      const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: activeProgram.title,
        description: activeProgram.subtitle,
        provider: {
          "@type": "Organization",
          name: "Alyra",
        },
        offers: {
          "@type": "Offer",
          price: String(activeProgram.price),
          priceCurrency: "EUR",
        },
      };

      return {
        title: `Alyra | ${activeProgram.title}`,
        description: `${activeProgram.subtitle} - Date: ${activeProgram.date}, Duree: ${activeProgram.duration}.`,
        structuredData: [websiteSchema, organizationSchema, courseSchema, breadcrumbSchema].filter(
          Boolean
        ),
      };
    }

    const defaultMeta = routeMeta[routeName] ?? routeMeta.home;
    return {
      ...defaultMeta,
      structuredData: [
        websiteSchema,
        {
          ...organizationSchema,
          description: defaultMeta.description,
        },
        breadcrumbSchema,
      ].filter(Boolean),
    };
  }, [routeName, activeProgram, breadcrumbItems]);

  useDocumentMeta(meta);

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (id) => {
    navigate(`/#${id}`);
  };

  const goHome = () => goTo("/");
  const goCatalog = () => goTo("/programmes");
  const goCatalogByTrack = (track) => goTo(`/programmes?track=${track}`);
  const goProgram = (slug) => goTo(`/programmes/${slug}`);

  useEffect(() => {
    const updateNavHeight = () => {
      const navElement = navRef.current;
      if (!navElement) return;

      const isMobileNav = window.innerWidth <= 1180;
      const isMobileMenuOpen = navElement.classList.contains("mobile-open");
      let navHeight = navElement.offsetHeight;

      if (isMobileNav && isMobileMenuOpen && mobileNavBaseHeightRef.current > 0) {
        navHeight = mobileNavBaseHeightRef.current;
      } else if (isMobileNav) {
        mobileNavBaseHeightRef.current = navHeight;
      }

      document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    if (document.fonts?.ready) document.fonts.ready.then(updateNavHeight);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && navRef.current
        ? new ResizeObserver(updateNavHeight)
        : null;

    if (resizeObserver && navRef.current) resizeObserver.observe(navRef.current);

    return () => {
      window.removeEventListener("resize", updateNavHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [location.pathname, location.hash]);

  const isProgramsArea = routeName === "catalog" || routeName === "detail";

  return (
    <div className="page">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <NavBar
        navRef={navRef}
        isProgramsArea={isProgramsArea}
        isFinancement={routeName === "financement"}
        isVosBesoins={routeName === "vos-besoins"}
        isBlog={routeName === "blog"}
        isQuiSommesNous={routeName === "qui-sommes-nous"}
        isNosAnciens={routeName === "nos-anciens"}
        isRendezVous={routeName === "rendez-vous"}
        onHome={goHome}
        onCatalogAll={goCatalog}
        onCatalogBlockchain={() => goCatalogByTrack("blockchain")}
        onCatalogIA={() => goCatalogByTrack("ia")}
        onFeaturedLong={() => {
          if (featuredLongProgram) goProgram(featuredLongProgram.slug);
        }}
        featuredLongTitle={featuredLongProgram?.title ?? "Programme long"}
        onFinancement={() => goTo("/financement")}
        onVosBesoins={() => goTo("/vos-besoins")}
        onBlog={() => goTo("/blog")}
        onQuiSommesNous={() => goTo("/qui-sommes-nous")}
        onNosAnciens={() => goTo("/nos-anciens")}
        onRendezVous={() => goTo("/rendez-vous")}
      />

      <Routes>
        <Route path="/" element={<HomePage onProgramList={goCatalog} onSection={goToSection} />} />
        <Route
          path="/programmes"
          element={
            <ProgramCatalog
              programsList={programs}
              onOpenProgram={goProgram}
              onHome={goHome}
              isLoading={isProgramsLoading}
              error={programsError}
            />
          }
        />
        <Route
          path="/programmes/:slug"
          element={
            <ProgramDetailRoute
              programBySlug={programBySlug}
              catalog={programs}
              isLoading={isProgramsLoading}
              onBack={goCatalog}
              onOpenProgram={goProgram}
              onHome={goHome}
              onCatalog={goCatalog}
            />
          }
        />
        <Route path="/financement" element={<StaticPage page={staticPagesData.financement} onHome={goHome} />} />
        <Route
          path="/vos-besoins"
          element={<StaticPage page={staticPagesData["vos-besoins"]} onHome={goHome} />}
        />
        <Route path="/blog" element={<StaticPage page={staticPagesData.blog} onHome={goHome} />} />
        <Route
          path="/qui-sommes-nous"
          element={<StaticPage page={staticPagesData["qui-sommes-nous"]} onHome={goHome} />}
        />
        <Route
          path="/nos-anciens"
          element={<StaticPage page={staticPagesData["nos-anciens"]} onHome={goHome} />}
        />
        <Route path="/rendez-vous" element={<AppointmentPage onHome={goHome} />} />
        <Route path="*" element={<NotFoundPage onHome={goHome} onCatalog={goCatalog} />} />
      </Routes>
    </div>
  );
}
