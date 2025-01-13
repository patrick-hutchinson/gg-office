import React from "react";

import { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import styles from "./styles/Contact.module.css";
import Loading from "../../components/Loading/Loading";

export default function Contact() {
  const [contact, setContact] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="contact"]{
          email,
          address,
          socials
        }`
      )
      .then((data) => setContact(data))
      .catch(console.error);
  }, []);

  // Early return if about data is undefined or empty
  if (!contact) return <Loading />;

  let Email = () => {
    return (
      <section>
        <h5>Email</h5>
        <a href={`mailto:${contact[0].email}`} className="button">
          {contact[0].email}
        </a>
      </section>
    );
  };

  let Address = () => {
    return (
      <section>
        <h5>Address</h5>
        <div>{contact[0].address}</div>
      </section>
    );
  };

  let Socials = () => {
    const socials = contact[0].socials || [];
    return (
      <section>
        <h5>Socials</h5>
        {socials.map((socialEntry, index) => {
          return (
            <>
              <a href={`${socialEntry.url}`} target="_blank" key={index} className="button">
                {socialEntry.platform}
              </a>
              <br />
            </>
          );
        })}
      </section>
    );
  };

  return (
    <main className={`${styles.contact}`}>
      <div></div>
      <div>
        <Email />
        <Address />
        <Socials />
      </div>
    </main>
  );
}
