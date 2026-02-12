import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  console.log(project);
  const creditsMapping = [
    { key: "clients", title: "Client" },
    { key: "directors", title: "Direction" },
    { key: "creativedirectors", title: "Creative Director" },
    { key: "clientdirectors", title: "Project Manager" },
    { key: "designers", title: "Designer" },
    { key: "artists3D", title: "3D Artist" },
    { key: "photographers", title: "Photography" },
  ];

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <div className={styles["credits-wrapper"]}>
        <ul className={styles["credits-inhouse"]}>
          {project.creditsInhouse &&
            creditsMapping.map(
              ({ key, title }, index) =>
                project.creditsInhouse[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title} <br />
                    {project.creditsInhouse[key].map((person, i) => (
                      <div key={i}>{person}</div>
                    ))}
                    <br />
                    {index !== creditsMapping.length - 1 && <br />}
                  </li>
                ),
            )}
          {project.creditsInhouse?.additionalCredits?.map((credit) => (
            <li className={`${styles.credit}`} key={credit._id}>
              {credit.role} <br />
              {credit.people.map((person, index) => (
                <div key={index}>{person}</div>
              ))}
            </li>
          ))}
        </ul>
        <ul className={styles["credits-client"]}>
          {project.creditsClient &&
            creditsMapping.map(
              ({ key, title }, index) =>
                project.creditsClient[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title} <br />
                    {project.creditsClient[key].map((person, i) => (
                      <div key={i}>{person}</div>
                    ))}
                    <br />
                    {index !== creditsMapping.length - 1 && <br />}
                  </li>
                ),
            )}
          {project.creditsClient?.additionalCredits?.map((credit) => (
            <li className={`${styles.credit}`} key={credit._id}>
              {credit.role} <br />
              {credit.people.map((person, i) => (
                <div key={i}>{person}</div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
