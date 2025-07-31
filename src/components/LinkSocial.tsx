"use client";

import {
  SiMaildotru,
  SiInstagram,
  SiTiktok,
  SiGithub,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
  SiWhatsapp,
  SiTelegram,
  SiDiscord,
} from "react-icons/si";
import { Social } from "@/typings";

const LinkSocial: React.FC<Social> = ({ href, title }) => {
  const getIcon = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("email") || titleLower.includes("mail"))
      return <SiMaildotru size="20px" />;
    if (titleLower.includes("instagram")) return <SiInstagram size="20px" />;
    if (titleLower.includes("tiktok")) return <SiTiktok size="20px" />;
    if (titleLower.includes("github")) return <SiGithub size="20px" />;
    if (titleLower.includes("linkedin")) return <SiLinkedin size="20px" />;
    if (titleLower.includes("twitter") || titleLower.includes("x.com"))
      return <SiTwitter size="20px" />;
    if (titleLower.includes("youtube")) return <SiYoutube size="20px" />;
    if (titleLower.includes("whatsapp")) return <SiWhatsapp size="20px" />;
    if (titleLower.includes("telegram")) return <SiTelegram size="20px" />;
    if (titleLower.includes("discord")) return <SiDiscord size="20px" />;

    return (
      <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const getPlatformColors = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("instagram"))
      return {
        bg: "from-pink-500/30 to-purple-500/30",
        border: "border-pink-400/40",
        shadow: "hover:shadow-pink-400/30",
      };
    if (titleLower.includes("tiktok"))
      return {
        bg: "from-white/20 to-red-500/30",
        border: "border-red-400/40",
        shadow: "hover:shadow-red-400/30",
      };
    if (titleLower.includes("github"))
      return {
        bg: "from-white/20 to-gray-600/30",
        border: "border-gray-400/40",
        shadow: "hover:shadow-gray-400/30",
      };
    if (titleLower.includes("youtube"))
      return {
        bg: "from-red-500/30 to-red-600/30",
        border: "border-red-400/40",
        shadow: "hover:shadow-red-400/30",
      };
    if (titleLower.includes("telegram"))
      return {
        bg: "from-blue-400/30 to-blue-500/30",
        border: "border-blue-400/40",
        shadow: "hover:shadow-blue-400/30",
      };
    if (titleLower.includes("discord"))
      return {
        bg: "from-indigo-500/30 to-purple-500/30",
        border: "border-indigo-400/40",
        shadow: "hover:shadow-indigo-400/30",
      };

    return {
      bg: "from-blue-500/30 to-blue-600/30",
      border: "border-blue-400/40",
      shadow: "hover:shadow-blue-400/30",
    };
  };

  const colors = getPlatformColors();

  return (
    <div className="group relative">
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${colors.bg} rounded-full blur opacity-0 group-hover:opacity-60 sm:group-hover:opacity-40 transition duration-500`}
      ></div>

      <a
        aria-label={`${title} link`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                   bg-white/10 backdrop-blur-md border ${colors.border} rounded-full
                   hover:bg-white/20 hover:border-white/50 text-white/90 hover:text-white
                   transform transition-all duration-300 hover:scale-110 sm:hover:scale-105 hover:-rotate-3
                   hover:shadow-xl ${colors.shadow}
                   active:scale-95 group touch-manipulation`}
      >
        <div className="transform transition-all duration-300 group-hover:scale-110">
          {getIcon()}
        </div>

        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

        <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-150 pointer-events-none"></div>
      </a>

      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/20 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          {title}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
      </div>

      {title.toLowerCase().includes("verified") && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LinkSocial;
