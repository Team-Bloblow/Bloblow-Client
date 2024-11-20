import { Link } from "react-router-dom";

import { TEAM_INFO } from "../../config/constants";
import EmailIcon from "../Icon/EmailIcon";
import GithubIcon from "../Icon/GithubIcon";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-start items-center py-38 gap-25 w-full h-200 bg-gradient-to-r from-[#00684A] via-[#009F55] via-40% to-[#00ED64]">
      <div className="flex-center gap-20">
        <Link to={TEAM_INFO.GITHUB} target="_blank">
          <GithubIcon className="size-32 transition hover:fill-emerald-200" />
        </Link>
        <Link to={`mailto:${TEAM_INFO.EMAIL}`}>
          <EmailIcon className="size-32 fill-black transition hover:fill-emerald-200" />
        </Link>
      </div>
      <p className="text-16">
        © 2024 | <span className="font-semibold">Team Bloblow</span> All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
