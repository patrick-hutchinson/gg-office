"use client";

import styles from "./styles/Contact.module.css";
import Loading from "@/components/Loading/Loading";
import { DataContext } from "@/context/DataContext";
import React, { useContext } from "react";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

export default function Contact() {
  const { contact, site } = useContext(DataContext);

  if (!contact && !site) return <Loading />;

  const contactData = contact?.[0] || {};
  const email = contactData.email || site?.email;
  const phone = site?.phone;

  let Email = () => {
    return (
      <section>
        <h5 className={styles.sectionTitle}>Email</h5>
        {hasSanityValue(email) ? (
          <a href={`mailto:${email}`} className="button">
            {email}
          </a>
        ) : (
          <SanityPreviewFallback fieldTitle="contact email" />
        )}
      </section>
    );
  };

  let Phone = () => {
    return (
      <section>
        <h5 className={styles.sectionTitle}>Phone</h5>
        {hasSanityValue(phone) ? (
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="button">
            {phone}
          </a>
        ) : (
          <SanityPreviewFallback fieldTitle="contact phone" />
        )}
      </section>
    );
  };

  let Address = () => {
    return (
      <section>
        <h5 className={styles.sectionTitle}>Address</h5>
        {hasSanityValue(contactData.address) ? (
          <a href={contactData.googleMapsLink || "#"} target="_blank">
            <span className="button">{contactData.address}</span>
          </a>
        ) : (
          <SanityPreviewFallback fieldTitle="contact address" />
        )}
        {hasSanityValue(contactData.address) && !hasSanityValue(contactData.googleMapsLink) && (
          <>
            <br />
            <SanityPreviewFallback fieldTitle="contact Google Maps link" />
          </>
        )}
      </section>
    );
  };

  let Socials = () => {
    const socials = contactData.socials || [];

    return (
      <section>
        <h5 className={styles.sectionTitle}>Socials</h5>
        {hasSanityValue(socials) ? (
          socials.map((socialEntry, index) => (
            <React.Fragment key={index}>
              {hasSanityValue(socialEntry?.url) && hasSanityValue(socialEntry?.platform) ? (
                <a href={socialEntry.url} target="_blank" className="button">
                  {socialEntry.platform}
                </a>
              ) : (
                <SanityPreviewFallback fieldTitle={`contact socials[${index}]`} />
              )}
              <br />
            </React.Fragment>
          ))
        ) : (
          <SanityPreviewFallback fieldTitle="contact socials" />
        )}
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
