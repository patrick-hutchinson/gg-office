"use client";

import { useContext, useEffect, useRef, useState } from "react";

import styles from "./styles/About.module.css";
import Loading from "@/components/Loading/Loading";
import { DataContext } from "@/context/DataContext";

import { StateContext } from "@/context/StateContext";

export default function About() {
  const { isMobile } = useContext(StateContext);

  const { about } = useContext(DataContext);
  const AlienContainerRef = useRef(null);

  const offset = isMobile
    ? { right: 200, left: 10, bottom: 300, top: 10 }
    : { right: 300, left: 100, bottom: 400, top: 100 };

  // Function to position and handle hover effect for a specific alien
  const positionAlien = (alien) => {
    // Set the initial random position when the alien is created
    alien.style.left = `${Math.floor(Math.random() * (window.innerWidth - offset.right)) + offset.top}px`;
    alien.style.top = `${Math.floor(Math.random() * (window.innerHeight - offset.bottom)) + offset.top}px`;

    // Add the hover effect to move the alien on mouseenter
    alien.addEventListener("mouseenter", () => {
      const randomLeft = Math.floor(Math.random() * (window.innerWidth - offset.right)) + offset.top;
      const randomTop = Math.floor(Math.random() * (window.innerHeight - offset.bottom)) + offset.top;
      alien.style.left = `${randomLeft}px`;
      alien.style.top = `${randomTop}px`;
      console.log("alien hovered/clicked");
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
      AlienContainerRef.current.querySelectorAll(`.${styles["alien-wrapper"]} div`)
    ).find((span) => span.textContent === intern);

    // If an alien with the same name exists, return early
    if (existingAlien) {
      // remove the wrapper (go up to the alien-wrapper div)
      existingAlien.closest(`.${styles["alien-wrapper"]}`).remove();
      return;
    }

    // If not, create the alien wrapper and set its inner HTML
    const wrapper = document.createElement("div");
    wrapper.className = `${styles["alien-wrapper"]}`;
    wrapper.innerHTML = `<div class="${styles.alien}">${about[0].emoji}</div><div class="button active ${styles["name"]}">${intern}</div>`;

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
            <span key={index} className={styles["service"]}>
              {service}
              {!isLast && ",\u00A0"}
            </span>
          );
        })}
      </section>
    );
  };

  const Internships = () => {
    const internships = about[0].internship || [];
    const [activeInterns, setActiveInterns] = useState([]);

    const toggleIntern = (intern) => {
      setActiveInterns(
        (prev) =>
          prev.includes(intern)
            ? prev.filter((i) => i !== intern) // remove if already active
            : [...prev, intern] // add if not active
      );
      handleInternClick(intern);
    };

    return (
      <section className="internships">
        <h5>Internships</h5>
        {internships.map((intern, index) => {
          const isLast = index === internships.length - 1;
          const isActive = activeInterns.includes(intern);

          return (
            <span
              onClick={() => toggleIntern(intern)}
              className={`${styles.intern} ${isActive ? "active" : ""} button`}
              key={index}
            >
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
          <div className={`button active ${styles["name"]}`}>Enrico</div>
        </div>
        <div className={`${styles["alien-wrapper"]}`}>
          <div className={`${styles.alien}`}>{about[0].emoji}</div>
          <div className={`button active ${styles["name"]}`}>Francesca</div>
        </div>
      </div>
      <main className={`about ${styles.about}`}>
        <Biography />
        <Services />

        <Internships />
      </main>
    </>
  );
}
