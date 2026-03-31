function buildMonthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const normalizedStart = firstDay === 0 ? 6 : firstDay - 1;
  const slots = Array.from({ length: normalizedStart + daysInMonth }, (_, i) => {
    const day = i - normalizedStart + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  while (slots.length % 7 !== 0) slots.push(null);

  const weeks = [];
  for (let i = 0; i < slots.length; i += 7) {
    weeks.push(slots.slice(i, i + 7));
  }

  return weeks;
}

export default function AppointmentPage({ onHome }) {
  const now = new Date();
  const monthLabel = now.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  const weeks = buildMonthGrid(now);
  const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero programs-hero">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <button type="button" className="breadcrumb-link" onClick={onHome}>
            Accueil
          </button>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Prendre rendez-vous</span>
        </nav>
        <div className="section-head">
          <h1>Prendre rendez-vous</h1>
          <p>
            Choisissez une date et un creneau pour echanger avec un conseiller
            formation Alyra.
          </p>
        </div>
      </header>

      <section className="appointment-layout">
        <article className="card">
          <h3>Vos informations</h3>
          <div className="appointment-form">
            <label className="sr-only" htmlFor="appt-name">
              Nom complet
            </label>
            <input id="appt-name" placeholder="Nom complet" />
            <label className="sr-only" htmlFor="appt-email">
              Email
            </label>
            <input id="appt-email" placeholder="Email" type="email" />
            <label className="sr-only" htmlFor="appt-phone">
              Telephone
            </label>
            <input id="appt-phone" placeholder="Telephone" />
            <label className="sr-only" htmlFor="appt-track">
              Formation d'interet
            </label>
            <select id="appt-track" defaultValue="">
              <option value="" disabled>
                Formation d'interet
              </option>
              <option>Blockchain</option>
              <option>IA</option>
            </select>
            <label className="sr-only" htmlFor="appt-date">
              Date
            </label>
            <input id="appt-date" type="date" />
            <label className="sr-only" htmlFor="appt-time">
              Heure
            </label>
            <input id="appt-time" type="time" />
            <button className="primary">Confirmer le rendez-vous</button>
          </div>
        </article>

        <article className="card">
          <div className="appointment-calendar-head">
            <h3>Calendrier</h3>
            <span>{monthLabel}</span>
          </div>
          <div className="calendar-grid calendar-weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-weeks">
            {weeks.map((week, index) => (
              <div key={`week-${index}`} className="calendar-grid">
                {week.map((day, idx) => (
                  <button
                    key={`day-${index}-${idx}`}
                    className={`calendar-day ${day ? "active" : "empty"}`}
                    disabled={!day}
                    type="button"
                    aria-label={day ? `Selectionner le ${day} ${monthLabel}` : undefined}
                  >
                    {day ?? ""}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
