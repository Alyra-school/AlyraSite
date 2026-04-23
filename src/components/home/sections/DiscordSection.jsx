import styles from "./DiscordSection.module.css";
import SectionShell from "../shared/SectionShell";
import IconRenderer from "../shared/IconRenderer";
import { discordData } from "../../../data/home";

export default function DiscordSection() {
  return (
    <SectionShell className={`${styles.root} discord-section`} variant="contained">
      <div className="discord-block">
        <div className="discord-visual" aria-hidden="true">
          <div className="discord-orbit">
            <div className="discord-core">
              <span>🎮</span>
            </div>
            <div className="discord-ring discord-ring-1"></div>
            <div className="discord-ring discord-ring-2"></div>
            <div className="discord-ring discord-ring-3"></div>
          </div>

          {discordData.stats.map((stat) => (
            <div key={stat.id} className={stat.className}>
              <strong>{stat.strong}</strong>
              {stat.text ? <span>{stat.text}</span> : null}
            </div>
          ))}

          <span className="discord-dot discord-dot-1"></span>
          <span className="discord-dot discord-dot-2"></span>
          <span className="discord-dot discord-dot-3"></span>
          <span className="discord-dot discord-dot-4"></span>
          <span className="discord-dot discord-dot-5"></span>
        </div>

        <div className="discord-copy">
          <h2>
            Rejoignez nos +2500 membres sur notre <span>Discord !</span>
          </h2>
          <p>{discordData.body}</p>
          <div className="discord-features">
            {discordData.features.map((feature) => (
              <article key={feature.id}>
                <span className="discord-feature-icon" aria-hidden="true">
                  <IconRenderer name="loop" />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
