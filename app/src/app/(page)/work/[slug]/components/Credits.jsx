import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

  const credits = Array.isArray(project.credits)
    ? project.credits
        .map((credit, index) => ({
          key: credit._key || index,
          role: cleanText(credit.role),
          entries: Array.isArray(credit.entries) ? credit.entries.map(cleanText).filter(Boolean) : [],
        }))
        .filter((credit) => credit.role && credit.entries.length > 0)
    : [];

  if (credits.length === 0) return null;

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <ul className={styles.credits}>
        {credits.map(({ key, role, entries }) => (
          <li className={styles.credit} key={key}>
            {role}
            <br />
            {entries.map((entry, i) => (
              <div key={i}>{entry}</div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
