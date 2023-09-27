import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitch,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="container-footer">
        <span className="copyright">
          Rua Chico Pinto, 417 - Centro - Araras - SP
        </span>
        <ul>
          <li>
            <a href="#">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#">
              <FaXTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTiktok />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitch />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
