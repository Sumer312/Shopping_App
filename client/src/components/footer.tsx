import {
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiDocker,
  SiVite,
  SiDaisyui,
  SiJsonwebtokens,
  SiTsnode,
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiMongoose,
  SiGithub,
} from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-6 bg-base-100 text-base-content">
      <div>
        <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
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
        <p className="flex gap-3 mb-3">
          <SiReact size="1.5rem" />
          <SiTypescript size="1.5rem" /> React + TS
        </p>
        <p className="flex gap-3 mb-3">
          <SiTailwindcss size="1.5rem" />
          Tailwind
        </p>
        <p className="flex gap-3 mb-3">
          <SiDaisyui size="1.5rem" />
          DaisyUI
        </p>
      </div>
      <div>
        <span className="footer-title">Back-End</span>
        <p className="flex gap-3 mb-3">
          <SiTsnode size="1.5rem" />
          <SiNodedotjs size="1.5rem" />
          NodeJS + TS
        </p>
        <p className="flex gap-3 mb-3">
          <SiExpress size="1.5rem" />
          Express
        </p>
        <p className="flex gap-3 mb-3">
          <SiJsonwebtokens size="1.5rem" />
          JWT
        </p>
        <p className="flex gap-3 mb-3">
          <SiMongodb size="1.5rem" />
          MongoDB
        </p>
      </div>
      <div>
        <span className="footer-title">Tools</span>
        <p className="flex gap-3 mb-3">
          <SiDocker size="1.5rem" />
          Docker
        </p>
        <p className="flex gap-3 mb-3">
          <SiVite size="1.5rem" />
          Vite
        </p>
        <p className="flex gap-3 mb-3">
          <SiMongoose size="1.5rem" />
          Mongoose ODM
        </p>
      </div>
    </footer>
  );
}
