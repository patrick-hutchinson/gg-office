import styles from "./styles/Credits.module.css";
import React from "react";

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

  const INSERT_AFTER = "creativedirectors";

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <div className={styles["credits-wrapper"]}>
        <ul className={styles["credits-inhouse"]}>
          {project.creditsInhouse &&
            creditsMapping.map(({ key, title }, index) => (
              <React.Fragment key={key}>
                {project.creditsInhouse[key] && (
                  <li className={styles.credit}>
                    {title}
                    <br />
                    {project.creditsInhouse[key].map((person, i) => (
                      <div key={i}>{person}</div>
                    ))}
                    {index !== creditsMapping.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </li>
                )}

                {key === INSERT_AFTER &&
                  project.creditsInhouse?.additionalCredits?.map((credit, index) => (
                    <li className={styles.credit} key={credit._id}>
                      {credit.role}
                      <br />
                      {credit.people.map((person, i) => (
                        <div key={i}>{person}</div>
                      ))}
                      {index !== creditsMapping.length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </li>
                  ))}
              </React.Fragment>
            ))}
        </ul>
        <ul className={styles["credits-client"]}>
          {project.creditsClient &&
            creditsMapping.map(({ key, title }, index) => (
              <React.Fragment key={key}>
                {project.creditsClient[key] && (
                  <li className={styles.credit}>
                    {title}
                    <br />
                    {project.creditsClient[key].map((person, i) => (
                      <div key={i}>{person}</div>
                    ))}
                    {index !== creditsMapping.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </li>
                )}

                {key === INSERT_AFTER &&
                  project.creditsClient?.additionalCredits?.map((credit, index) => (
                    <li className={styles.credit} key={credit._id}>
                      {credit.role}
                      <br />
                      {credit.people.map((person, i) => (
                        <div key={i}>{person}</div>
                      ))}
                      {index !== creditsMapping.length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </li>
                  ))}
              </React.Fragment>
            ))}
        </ul>
      </div>
    </section>
  );
}
