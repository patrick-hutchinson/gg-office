import styles from "./styles/HeaderMobile.module.css";
import Link from "next/link";

const MobileMenu = ({ location, setShowMenu }) => {
  function handleMenuClick() {
    setShowMenu(false);
  }

  return (
    <div className={`${styles.expandMenu}`}>
      <li
        className={`${styles.button} button ${location.includes("work") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/">Work</Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("about") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/about">About</Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("research") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/research">Research</Link>
      </li>
      <li className={`${styles.button} button`}>
        <Link href="https://www.gg-rugs.com" target="_blank">
          RUGS
        </Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("contact") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/contact">Contact</Link>
      </li>
    </div>
  );
};

export default MobileMenu;
