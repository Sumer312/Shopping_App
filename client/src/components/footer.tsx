import { GiBearFace, GiRobinHoodHat } from "react-icons/gi";
import {
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiDocker,
  SiVite,
  SiPostman,
  SiDaisyui,
  SiJsonwebtokens,
  SiTsnode,
  SiNodedotjs,
  SiReact,
  SiCss3,
  SiMongodb,
  SiGithub,
} from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-12 bg-base-100 text-base-content">
      <div>
        <GiRobinHoodHat size="4rem" />
        <p>
          Clothing Web-App
          <br />
          Personal project
        </p>
        <br />
        <Link
          className="hover:link-accent"
          to="https://github.com/Sumer312/ClothingWebApp"
        >
          <SiGithub size="4rem" />
        </Link>
      </div>
      <div>
        <span className="footer-title">Front-End</span>
        <a className="flex link link-hover gap-3 mb-3">
          <SiReact size="1.5rem" />
          <SiTypescript size="1.5rem" /> React + TS
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <GiBearFace size="1.5rem" />
          Zuntand
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiTailwindcss size="1.5rem" />
          Tailwind
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiCss3 size="1.5rem" />
          CSS
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiDaisyui size="1.5rem" />
          DaisyUI
        </a>
      </div>
      <div>
        <span className="footer-title">Back-End</span>
        <a className="flex link link-hover gap-3 mb-3">
          <SiTsnode size="1.5rem" />
          <SiNodedotjs size="1.5rem" />
          NodeJS + TS
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiExpress size="1.5rem" />
          Express
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiJsonwebtokens size="1.5rem" />
          JWT
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiMongodb size="1.5rem" />
          Mongoose ODM
        </a>
      </div>
      <div>
        <span className="footer-title">Database</span>
        <a className="flex link link-hover gap-3 mb-3">
          <SiMongodb size="1.5rem" />
          MongoDB
        </a>
      </div>
      <div>
        <span className="footer-title">Tools</span>
        <a className="flex link link-hover gap-3 mb-3">
          <SiDocker size="1.5rem" />
          Docker
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiVite size="1.5rem" />
          Vite
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <SiPostman size="1.5rem" />
          Postman
        </a>
        <a className="flex link link-hover gap-3 mb-3">
          <FaGit size="1.5rem" />
          Git
        </a>
      </div>
    </footer>
  );
}
