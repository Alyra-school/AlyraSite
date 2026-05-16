import AlumniHallSection from "../AlumniHallSection";
import layoutStyles from "./StaticPages.module.css";
import alumniStyles from "../AlumniHallSection.module.css";

export default function AlumniPage({ page }) {
  return (
    <main className={`main-content ${layoutStyles.main}`} id="main-content" tabIndex="-1">
      <section className={`section ${layoutStyles.section} ${alumniStyles.standaloneStart}`}>
        {page.alumniHall ? <AlumniHallSection section={page.alumniHall} /> : null}
      </section>
    </main>
  );
}
