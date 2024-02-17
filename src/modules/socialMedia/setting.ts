import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import { SocialMedia } from "~/settings/constants";

export const IconSetting = {
  [SocialMedia.Github]: FaGithub,
  [SocialMedia.Linkedin]: FaLinkedin,
  [SocialMedia.Email]: FaEnvelope,
};
