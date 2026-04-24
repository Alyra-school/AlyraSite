import styles from "./AlyraTeamSection.module.css";
import SectionShell from "../shared/SectionShell";
import { teamData } from "../../../data/home";

export default function AlyraTeamSection() {
  return (
    <SectionShell className={`${styles.root} alyra-team-section`} variant="full">
      <div className="alyra-team-layout">
        <div className="alyra-team-copy">
          <h2>
            L'equipe <span>Alyra</span>
          </h2>
          <p className="alyra-team-quote-mark">“</p>
          <p className="alyra-team-lead">{teamData.lead}</p>
          {teamData.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="alyra-team-grid" aria-label="Equipe Alyra">
          {teamData.members.map((member) => (
            <li key={member.id} className="alyra-member-card">
              <img src={member.avatar} alt={member.name} width="64" height="64" loading="lazy" decoding="async" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
