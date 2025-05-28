import { useContext } from "react";

import styles from "./styles/Contact.module.css";
import Loading from "../../assets/components/Loading/Loading";
import GlobalDataContext from "../../assets/context/GlobalDataContext";

export default function Contact() {
  const { contact } = useContext(GlobalDataContext);

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
