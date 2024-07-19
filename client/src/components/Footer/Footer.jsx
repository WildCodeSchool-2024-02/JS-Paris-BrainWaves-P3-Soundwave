import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="p-footer">
        &copy; 2024 AYAM Company. Tous droits réservés.
      </p>
      <ul className="ul-footer">
        <li>
          <a className="link-footer" href="mailto:soundwave.app75@gmail.com">
            Contact
          </a>
        </li>
        <li>
          <a className="link-footer" href="/privacy-policy">
            Politique de confidentialité
          </a>
        </li>
        <li>
          <a className="link-footer" href="/terms-of-service">
            Mentions légales
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
