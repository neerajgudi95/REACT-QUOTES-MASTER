import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Great Quotes</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" activeClassName={styles.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={styles.active}>
              Add new Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
