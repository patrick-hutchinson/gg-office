import styles from "./styles/Credits.module.css";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

export default function Credits({ project }) {
  const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

  const credits = Array.isArray(project.credits)
    ? project.credits
        .map((credit, index) => ({
          key: credit._key || index,
          role: cleanText(credit.role),
          entries: Array.isArray(credit.entries) ? credit.entries.map(cleanText).filter(Boolean) : [],
        }))
    : [];

  if (!hasSanityValue(project.credits)) {
    return (
      <section className={styles["credits-wrapper"]}>
        <h2>Credits</h2>
        <SanityPreviewFallback fieldTitle="credits" />
      </section>
    );
  }

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <ul className={styles.credits}>
        {credits.map(({ key, role, entries }) => (
          <li className={styles.credit} key={key}>
            {role || <SanityPreviewFallback fieldTitle="credit role" />}
            <br />
            {entries.length > 0 ? (
              entries.map((entry, i) => <div key={i}>{entry}</div>)
            ) : (
              <SanityPreviewFallback fieldTitle="credit entries" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
