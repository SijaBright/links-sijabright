import Image from "next/image";
import { Link } from "@/typings";

const LinkCard: React.FC<Link> = ({ href, title, image }) => {
  const getIcon = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("website") || titleLower.includes("portfolio")) {
      return (
        <svg
          className="w-5 h-5 text-blue-400 group-hover:text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (titleLower.includes("moments") || titleLower.includes("memory")) {
      return (
        <svg
          className="w-5 h-5 text-blue-400 group-hover:text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (
      titleLower.includes("spotify") ||
      titleLower.includes("playlist") ||
      titleLower.includes("music")
    ) {
      return (
        <svg
          className="w-5 h-5 text-blue-400 group-hover:text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.75 11.5c-.15.23-.42.31-.67.19-1.83-1.12-4.14-1.37-6.86-.75-.27.06-.55-.11-.61-.39-.06-.27.11-.55.39-.61 2.99-.68 5.52-.39 7.56.87.23.15.31.47.19.69zm.95-2.12c-.18.29-.57.38-.85.2-2.09-1.28-5.28-1.65-7.75-.9-.34.1-.7-.08-.8-.42-.1-.34.08-.7.42-.8 2.83-.86 6.36-.44 8.78 1.07.28.18.37.57.2.85zm.08-2.2C12.04 7.95 7.99 7.75 5.68 8.61c-.41.15-.87-.06-1.02-.47-.15-.41.06-.87.47-1.02 2.73-1.02 7.27-.79 10.15 1.07.35.22.46.69.24 1.04-.22.35-.69.46-1.04.24z" />
        </svg>
      );
    }
    if (
      titleLower.includes("discord") ||
      titleLower.includes("server") ||
      titleLower.includes("chat")
    ) {
      return (
        <svg
          className="w-5 h-5 text-blue-400 group-hover:text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M16.93 4.85c-1.14-.53-2.37-.93-3.66-1.15-.16.28-.34.66-.47.97-1.38-.21-2.75-.21-4.1 0-.13-.31-.32-.69-.48-.97-1.29.22-2.52.62-3.66 1.15C.85 8.58.32 12.22.64 15.82c1.55 1.14 3.06 1.84 4.53 2.29.37-.5.69-1.03.97-1.6-.53-.2-1.04-.45-1.52-.74.13-.09.25-.19.37-.29 2.94 1.35 6.13 1.35 9.04 0 .12.1.24.2.37.29-.48.29-.99.54-1.52.74.28.57.6 1.1.97 1.6 1.47-.45 2.98-1.15 4.53-2.29.37-4.17-.62-7.78-2.64-10.97zM6.7 13.51c-.88 0-1.6-.81-1.6-1.8s.71-1.8 1.6-1.8c.88 0 1.61.81 1.6 1.8 0 .99-.72 1.8-1.6 1.8zm6.6 0c-.88 0-1.6-.81-1.6-1.8s.71-1.8 1.6-1.8c.88 0 1.61.81 1.6 1.8 0 .99-.72 1.8-1.6 1.8z" />
        </svg>
      );
    }
    // Default icon
    return (
      <svg
        className="w-5 h-5 text-blue-400 group-hover:text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-700"></div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center p-4 w-full rounded-2xl 
                   bg-white/10 backdrop-blur-md border border-white/20
                   hover:bg-white/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/30
                   transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
                   active:scale-[0.98] group touch-manipulation"
      >
        <div className="flex-shrink-0 mr-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:border-blue-400/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
              {image ? (
                <Image
                  className="rounded-lg w-7 h-7 object-cover"
                  alt={title}
                  src={image}
                  width={28}
                  height={28}
                />
              ) : (
                getIcon()
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-semibold text-white text-base sm:text-lg tracking-wide group-hover:text-blue-200 transition-colors duration-300">
            {title}
          </h2>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 mx-auto mt-2"></div>
        </div>

        <div className="flex-shrink-0 ml-4 opacity-60 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
            <svg
              className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-blue-400/10 opacity-0 group-active:opacity-100 transition-opacity duration-150 pointer-events-none"></div>
      </a>
    </div>
  );
};

export default LinkCard;
