import React from "react";
import "../styles/FooterStyles.css";
import { useLocation } from "react-router-dom";

function Footer({ className }) {
  const location = useLocation();

  const isAuthPage = location.pathname === "/"; 
  const beatClass = isAuthPage ? "fa-beat" : ""; 

  return (
    <div id="footerContainer" className={className}>
      <section>
        <a
          className="footerLink"
          href="https://github.com/Ethan-Dale"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github fa-2xl"></i>
        </a>
        <a
          className="footerLink"
          href="https://www.linkedin.com/in/ethan-dale-88659a136/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin fa-2xl"></i>
        </a>
      </section>
      <section id="codeLang">
        <i className={`fa-brands fa-node ${beatClass} fa-2xl`}></i>
        <i className={`fa-brands fa-html5 ${beatClass} fa-2xl`}></i>
        <i className={`fa-brands fa-react ${beatClass} fa-2xl`}></i>
        <i className={`fa-brands fa-css3 ${beatClass} fa-2xl`}></i>
      </section>
    </div>
  );
}

export default Footer;
