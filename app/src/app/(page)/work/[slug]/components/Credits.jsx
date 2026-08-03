import styles from "./styles/Credits.module.css";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

export default function Credits({ project }) {
  const cleanText = (value) => (typeof value === "string" ? value.trim() : "");
  const getCreditGroup = (credit) => {
    if (typeof credit._key === "string" && credit._key.startsWith("client-")) return "client";
    if (typeof credit._key === "string" && credit._key.startsWith("inhouse-")) return "inhouse";
    return "inhouse";
  };
  const normalizeCredits = (credits, fallbackKeyPrefix) =>
    Array.isArray(credits)
      ? credits.map((credit, index) => ({
          key: credit._key || `${fallbackKeyPrefix}-${index}`,
          group: getCreditGroup(credit),
          role: cleanText(credit.role),
          entries: Array.isArray(credit.entries) ? credit.entries.map(cleanText).filter(Boolean) : [],
        }))
      : [];

  const credits = normalizeCredits(project.credits, "inhouse");
  const explicitClientCredits = normalizeCredits(project.creditsClient, "client");
  const inhouseCredits = credits.filter((credit) => credit.group === "inhouse");
  const clientCredits = hasSanityValue(project.creditsClient)
    ? explicitClientCredits
    : credits.filter((credit) => credit.group === "client");

  const CreditList = ({ credits, className, fallbackTitle }) => (
    <ul className={className}>
      {credits.length > 0 ? (
        credits.map(({ key, role, entries }) => (
          <li className={styles.credit} key={key}>
            {role || <SanityPreviewFallback fieldTitle="credit role" />}
            <br />
            {entries.length > 0 ? (
              entries.map((entry, i) => <div key={i}>{entry}</div>)
            ) : (
              <SanityPreviewFallback fieldTitle="credit entries" />
            )}
          </li>
        ))
      ) : (
        <SanityPreviewFallback as="li" fieldTitle={fallbackTitle} />
      )}
    </ul>
  );

  if (!hasSanityValue(project.credits) && !hasSanityValue(project.creditsClient)) {
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

      <div className={styles["credits-columns"]}>
        <CreditList
          credits={inhouseCredits}
          className={styles["credits-inhouse"]}
          fallbackTitle="inhouse credits"
        />
        <CreditList credits={clientCredits} className={styles["credits-client"]} fallbackTitle="client credits" />
      </div>
    </section>
  );
}
