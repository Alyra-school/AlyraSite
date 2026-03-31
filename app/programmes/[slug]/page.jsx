import { notFound } from "next/navigation";
import ProgramDetailPage from "../../../src/components/ProgramDetailPage";
import { getProgramBySlug, getProgramPageByProgramId, getPrograms } from "../../../src/lib/programData";
import { pageMetadata } from "../../../src/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) {
    return pageMetadata({
      title: "Formation introuvable",
      description: "Cette formation n'existe pas ou n'est plus disponible.",
      path: `/programmes/${slug}`,
    });
  }

  return pageMetadata({
    title: program.title,
    description: `${program.subtitle} - Date: ${program.date}, Duree: ${program.duration}.`,
    path: `/programmes/${slug}`,
  });
}

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const [program, programs] = await Promise.all([getProgramBySlug(slug), getPrograms()]);
  if (!program) notFound();

  const detailContent = await getProgramPageByProgramId(program.id);

  const similarPrograms = programs
    .filter((item) => item.slug !== program.slug)
    .map((item) => ({
      ...item,
      score: item.tags.filter((tag) => program.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.subtitle,
    provider: {
      "@type": "EducationalOrganization",
      name: "Alyra",
      url: "https://www.alyra.fr",
    },
    offers: {
      "@type": "Offer",
      price: String(program.price),
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <ProgramDetailPage
        program={program}
        similarPrograms={similarPrograms}
        detailContent={detailContent}
        isContentLoading={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
