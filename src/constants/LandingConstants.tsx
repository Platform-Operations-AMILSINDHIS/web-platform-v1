// for rendering imported objects or adding imported objects from library to constants

import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsTelephone,
} from "react-icons/bs";

import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";

const socialLinks = [
  {
    ICON: BsFacebook,
    url: "",
  },
  {
    ICON: BsTwitter,
    url: "https://twitter.com/amilsindhis?t=AqSLK-YMEZevOcieUMwcvw&s=09",
  },
  {
    ICON: BsInstagram,
    url: "https://instagram.com/kapofbombay?igshid=MzNlNGNkZWQ4Mg==",
  },
  {
    ICON: BsLinkedin,
    url: "https://www.linkedin.com/in/the-khudabadi-amil-panchayat-of-bombay-836830251",
  },
  {
    ICON: BsYoutube,
    url: "https://youtube.com/@thekhudabadiamilpanchayato3151",
  },
];

const contactLinks = [
  {
    ICON: AiOutlineMail,
    LinkLabel: "amilsindhis@gmail.com",
  },
  {
    ICON: BsTelephone,
    LinkLabel: "(+91) 9820081700",
  },
  {
    ICON: CiLocationOn,
    LinkLabel:
      "1 A, Sindhu House,1st Floor, Nanabhai Lane, Fort, Mumbai, Maharashtra 400001",
  },
];

export { socialLinks, contactLinks };
