import { BsFillBasketFill, BsGithub } from "react-icons/bs";
import { DiNodejsSmall, DiReact, DiMongodb } from "react-icons/di";
import { GiBearFace } from "react-icons/gi";
import {
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiDocker,
  SiVite,
  SiPostman,
} from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <BsFillBasketFill size="3rem" />
        <p>
          Clothing Web-App
          <br />
          Personal project
        </p>
        <br />
        <Link to="https://github.com/Sumer312/ClothingWebApp">
          <BsGithub size="4rem" />
        </Link>
      </div>
      <ul>
        <span className="footer-title">Front-End</span>
        <li className="link link-hover">
          <DiReact size="1.5rem" /> React
        </li>
        <li className="link link-hover">
          <GiBearFace size="1.5rem" />
          Zuntand
        </li>
        <li className="link link-hover">
          <SiTailwindcss size="1.5rem" />
          Tailwind
        </li>
      </ul>
      <div>
        <span className="footer-title">Back-End</span>
        <a className="link link-hover">
          <DiNodejsSmall size="1.5rem" />
          Node JS
        </a>
        <a className="link link-hover">
          <SiExpress size="1.5rem" />
          Express
        </a>
        <a className="link link-hover">
          <SiTypescript size="1.5rem" />
          TypeScript
        </a>
        <a className="link link-hover">
          {" "}
          <DiMongodb size="1.5rem" />
          Mongoose(ODM)
        </a>
      </div>
      <div>
        <span className="footer-title">Database</span>
        <a className="link link-hover">
          <DiMongodb size="1.5rem" />
          MongoDB
        </a>
      </div>
      <div>
        <span className="footer-title">Tools</span>
        <a className="link link-hover">
          <SiDocker size="1.5rem" />
          Docker
        </a>
        <a className="link link-hover">
          <SiVite size="1.5rem" />
          Vite
        </a>
        <a className="link link-hover">
          <SiPostman size="1.5rem" />
          Postman
        </a>
        <a className="link link-hover">
          <FaGit size="1.5rem" />
          Git
        </a>
      </div>
    </footer>
  );
}
