import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  const creditsMapping = [
    { key: "clients", title: "Client" },
    { key: "directors", title: "Direction" },
    { key: "creativedirectors", title: "Creative Director" },
    { key: "clientdirectors", title: "Project Manager" },
    { key: "designers", title: "Designer" },
    { key: "artists3D", title: "3D Artist" },
    { key: "photographers", title: "Photography" },
  ];

  const INSERT_AFTER = "creativedirectors";

  const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

  const cleanPeople = (people) => (Array.isArray(people) ? people.map(cleanText).filter(Boolean) : []);

  const getCreditRows = (credits) => {
    if (!credits) return [];

    return creditsMapping.flatMap(({ key, title }) => {
      const rows = [];
      const people = cleanPeople(credits[key]);

      if (people.length > 0) {
        rows.push({ key, title, people });
      }

      if (key === INSERT_AFTER && Array.isArray(credits.additionalCredits)) {
        credits.additionalCredits.forEach((credit, index) => {
          const role = cleanText(credit.role);
          const creditPeople = cleanPeople(credit.people);

          if (role && creditPeople.length > 0) {
            rows.push({
              key: credit._id || `${key}-additional-${index}`,
              title: role,
              people: creditPeople,
            });
          }
        });
      }

      return rows;
    });
  };

  const renderCredits = (credits) =>
    getCreditRows(credits).map(({ key, title, people }) => (
      <li className={styles.credit} key={key}>
        {title}
        <br />
        {people.map((person, i) => (
          <div key={i}>{person}</div>
        ))}
      </li>
    ));

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <div className={styles["credits-wrapper"]}>
        <ul className={styles["credits-inhouse"]}>{renderCredits(project.creditsInhouse)}</ul>
        <ul className={styles["credits-client"]}>{renderCredits(project.creditsClient)}</ul>
      </div>
    </section>
  );
}
