import React, { useEffect, useState } from "react";
import sanityClient from "/src/client.js";
import styles from "./styles/About.module.css";

export default function About() {
  const [about, setAbout] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="about"]{
          biography,
          service,
          clients,
          internship,
          emoji
        }`
      )
      .then((data) => setAbout(data))
      .catch(console.error);
  }, []);

  // Early return if about data is undefined or empty
  if (!about || about.length === 0) {
    return <p>Loading...</p>;
  }

  // Since about is an array, we access the first item (about[0])
  const Biography = () => {
    const bioBlocks = about[0].biography || [];

    return (
      <section>
        <h3>Biography</h3>
        {bioBlocks.map((block, index) => (
          <div key={index}>
            {block.children.map((child, index) => (
              <p key={index}>{child.text}</p>
            ))}
          </div>
        ))}
      </section>
    );
  };

  const Services = () => {
    const services = about[0].service || [];

    return (
      <section>
        <h3>Services</h3>
        {services.map((service, index) => (
          <span key={index}>{service}, </span>
        ))}
      </section>
    );
  };

  const Clients = () => {
    const clients = about[0].clients || [];

    return (
      <section>
        <h3>Clients</h3>
        {clients.map((client, index) => {
          return <span key={index}>{client}, </span>;
        })}
      </section>
    );
  };

  const Internships = () => {
    const internships = about[0].internship || [];

    return (
      <section>
        <h3>Interships</h3>
        {internships.map((internship, index) => {
          return (
            <span className={`${styles.intern}`} key={index}>
              {internship},{" "}
            </span>
          );
        })}
      </section>
    );
  };

  return (
    <main className={`${styles.about}`}>
      <div className={`${styles["emoji-container"]}`}></div>
      <div>
        <Biography />
        <Services />
        <Clients />
        <Internships />
      </div>
    </main>
  );
}
