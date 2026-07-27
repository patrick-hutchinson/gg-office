"use client";

import styles from "./styles/Contact.module.css";
import Loading from "@/components/Loading/Loading";
import { DataContext } from "@/context/DataContext";
import React, { useContext } from "react";

export default function Contact() {
  const { contact, site } = useContext(DataContext);

  if (!contact && !site) return <Loading />;

  const contactData = contact?.[0] || {};
  const email = contactData.email || site?.email;
  const phone = site?.phone;

  let Email = () => {
    if (!email) return null;

    return (
      <section>
        <h5 className={styles.sectionTitle}>Email</h5>
        <a href={`mailto:${email}`} className="button">
          {email}
        </a>
      </section>
    );
  };

  let Phone = () => {
    if (!phone) return null;

    return (
      <section>
        <h5 className={styles.sectionTitle}>Phone</h5>
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="button">
          {phone}
        </a>
      </section>
    );
  };

  let Address = () => {
    if (!contactData.address) return null;

    return (
      <section>
        <h5 className={styles.sectionTitle}>Address</h5>
        <a href={contactData.googleMapsLink} target="_blank">
          <span className="button">{contactData.address}</span>
        </a>
      </section>
    );
  };

  let Socials = () => {
    const socials = contactData.socials || [];
    if (socials.length === 0) return null;

    return (
      <section>
        <h5 className={styles.sectionTitle}>Socials</h5>
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
      <div className={styles["text-container"]}>
        <Email />
        <Phone />
        <Address />
        <Socials />
      </div>
    </main>
  );
}
