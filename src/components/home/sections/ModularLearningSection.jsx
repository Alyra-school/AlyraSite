import styles from "./ModularLearningSection.module.css";
import SectionShell from "../shared/SectionShell";
import { learningData } from "../../../data/home";

export default function ModularLearningSection() {
  const { modular, tracks } = learningData;

  return (
    <SectionShell id="programmes" className={styles.root} variant="full">
      <div className="modular-learning-surface">
        <div className="section-head modular-learning-head">
          <h2>{modular.title}</h2>
          <p>
            Choisissez entre <span className="hero-accent">autonomie, coaching et lives</span> pour progresser a
            votre rythme, <span className="hero-accent">jusqu'a 144h de formation.</span>
          </p>
        </div>

        <div className="modular-learning-grid">
          {modular.cards.map((item) => (
            <article key={item.title} className="modular-learning-shell">
              <div className={`modular-learning-card ${item.variant === "clock" ? "is-clock" : ""}`}>
                {item.image ? (
                  <img src={item.image} alt={item.alt} width="640" height="880" loading="lazy" decoding="async" />
                ) : (
                  <div className="modular-learning-clock" aria-hidden="true">
                    <span className="clock-digit clock-digit-2">2</span>
                    <span className="clock-digit clock-digit-3">3</span>
                    <span className="clock-digit clock-digit-4">4</span>
                  </div>
                )}
                <div className="modular-learning-overlay" aria-hidden="true" />
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <TrackBlock track={tracks.blockchain} />
      <TrackBlock track={tracks.ia} />
      <TrackBlock track={tracks.enterprise} isEnterprise />
    </SectionShell>
  );
}

function TrackBlock({ track, isEnterprise = false }) {
  return (
    <>
      <div className="parcours-intro">
        <h3 className="sub-section-title">{track.title}</h3>
        {isEnterprise ? (
          <p>
            Renforcez la <strong>competitivite</strong> de votre entreprise
            <br />
            en formant vos equipes a l'IA et a la blockchain.
          </p>
        ) : (
          <>
            <p>
              {track.intro.includes("notre page") ? (
                <>
                  {track.intro.split("notre page")[0]}
                  <span className="hero-accent"> notre page{track.intro.split("notre page")[1]}</span>
                </>
              ) : (
                track.intro
              )}
            </p>
            <p>{track.outro}</p>
          </>
        )}
      </div>
      <div className={`parcours-grid ${track.twoColumns ? "parcours-grid-two" : ""}`}>
        {track.cards.map((item) => (
          <article key={item.title} className="parcours-card">
            <img src={item.image} alt={item.title} width="840" height="460" loading="lazy" decoding="async" />
            <div className="parcours-overlay">
              <h4>{item.title}</h4>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
