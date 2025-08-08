"use client";

import { useContext, useEffect, useRef } from "react";

import styles from "./styles/About.module.css";
import Loading from "../../../src/assets/components/Loading/Loading";
import { GlobalDataContext } from "../../assets/context/GlobalDataContext";

import { GlobalStateContext } from "../../assets/context/GlobalStateContext";

export default function About() {
  const { isMobile } = useContext(GlobalStateContext);

  const { about } = useContext(GlobalDataContext);
  const AlienContainerRef = useRef(null);

  const offset = isMobile ? { right: 100, left: 10 } : { right: 300, left: 100 };

  // Function to position and handle hover effect for a specific alien
  const positionAlien = (alien) => {
    // Set the initial random position when the alien is created
    alien.style.left = `${Math.floor(Math.random() * (window.innerWidth - offset.right)) + offset.left}px`;
    alien.style.top = `${Math.floor(Math.random() * (window.innerHeight - offset.right)) + offset.left}px`;

    // Add the hover effect to move the alien on mouseenter
    alien.addEventListener("mouseenter", () => {
      const randomLeft = Math.floor(Math.random() * (window.innerWidth - offset.right)) + offset.left;
      const randomTop = Math.floor(Math.random() * (window.innerHeight - offset.right)) + offset.left;
      alien.style.left = `${randomLeft}px`;
      alien.style.top = `${randomTop}px`;
    });
  };

  // Apply positioning to the initial aliens after the page renders
  useEffect(() => {
    if (AlienContainerRef.current) {
      // Get all initial aliens (Enrico and Francesca) and apply positioning
      const initialAliens = AlienContainerRef.current.querySelectorAll(`.${styles["alien-wrapper"]}`);
      initialAliens.forEach((alien) => {
        positionAlien(alien);
      });
    }
  }, [about]);

  function handleInternClick(intern) {
    // Check if the alien with the same intern name already exists
    const existingAlien = Array.from(
      AlienContainerRef.current.querySelectorAll(`.${styles["alien-wrapper"]} span`)
    ).find((span) => span.textContent === intern);

    // If an alien with the same name exists, return early
    if (existingAlien) {
      return;
    }

    // If not, create the alien wrapper and set its inner HTML
    const wrapper = document.createElement("div");
    wrapper.className = `${styles["alien-wrapper"]}`;
    wrapper.innerHTML = `<div class="${styles.alien}">${about[0].emoji}</div><span>${intern}</span>`;

    // Append to the container and apply positioning/hover effects
    AlienContainerRef.current.appendChild(wrapper);
    positionAlien(wrapper);
  }

  // Early return if about data is undefined or empty
  if (!about) return <Loading />;

  // Since about is an array, we access the first item (about[0])
  const Biography = () => {
    const bioBlocks = about[0].biography || [];

    return (
      <section>
        <h5>Biography</h5>
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
        <h5>Services</h5>
        {services.map((service, index) => {
          const isLast = index === services.length - 1;

          return (
            <span key={index}>
              {service}
              {!isLast && ",\u00A0"}{" "}
            </span>
          );
        })}
      </section>
    );
  };

  // const Clients = () => {
  //   const clients = about[0].clients || [];

  //   return (
  //     <section>
  //       <h5>Clients</h5>
  //       {clients.map((client, index) => {
  //         const isLast = index === clients.length - 1;
  //         return (
  //           <span key={index}>
  //             {client}
  //             {!isLast && ",\u00A0"}{" "}
  //           </span>
  //         );
  //       })}
  //     </section>
  //   );
  // };

  const Internships = () => {
    const internships = about[0].internship || [];

    return (
      <section className="internships">
        <h5>Internships</h5>
        {internships.map((intern, index) => {
          const isLast = index === internships.length - 1;
          return (
            <span onClick={() => handleInternClick(intern)} className={`${styles.intern} button`} key={index}>
              {intern}
              {!isLast && ",\u00A0"}
            </span>
          );
        })}
      </section>
    );
  };

  return (
    <>
      <div className={`${styles["alien-container"]}`} ref={AlienContainerRef}>
        <div className={`${styles["alien-wrapper"]}`}>
          <div className={`${styles.alien}`}>{about[0].emoji}</div>
          <span>Enrico</span>
        </div>
        <div className={`${styles["alien-wrapper"]}`}>
          <div className={`${styles.alien}`}>{about[0].emoji}</div>
          <span>Francesca</span>
        </div>
      </div>
      <main className={`${styles.about}`}>
        <div />
        <div>
          <Biography />
          <Services />
          {/* <Clients /> */}
          <Internships />
        </div>
      </main>
    </>
  );
}
