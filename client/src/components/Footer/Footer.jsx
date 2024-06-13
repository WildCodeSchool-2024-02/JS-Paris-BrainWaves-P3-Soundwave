import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="p-footer">
            &copy; 2024 Your Company Name. All rights reserved.
          </p>

          <ul className="ul-footer">
            <li>
              <a className="lien-footer" href="/about">
                About Us
              </a>
            </li>
            <li>
              <a className="lien-footer" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a className="lien-footer" href="/privacy">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="lien-footer" href="/terms">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
