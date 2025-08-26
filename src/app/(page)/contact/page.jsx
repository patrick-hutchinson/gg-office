"use client";

import styles from "./styles/Contact.module.css";
import Loading from "@/components/Loading/Loading";
import { DataContext } from "@/context/DataContext";
import React, { useContext } from "react";

export default function Contact() {
  const { contact } = useContext(DataContext);

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
        {socials.map((socialEntry, index) => (
          <React.Fragment key={index}>
            <a href={socialEntry.url} target="_blank" className="button">
              {socialEntry.platform}
            </a>
            <br />
          </React.Fragment>
        ))}
      </section>
    );
  };

  return (
    <main className={`contact ${styles.contact}`}>
      <div></div>
      <div>
        <Email />
        <Address />
        <Socials />
      </div>
    </main>
  );
}
