"use client";

import { useState, useEffect } from "react";

const ICONS = [
  {
    name: "email",
    label: "Email",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.94 6.94A8 8 0 1117.06 6.94l-6.36 6.36a1 1 0 01-1.42 0l-6.36-6.36z" />
      </svg>
    ),
  },
  {
    name: "instagram",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25.75a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    ),
  },
  {
    name: "tiktok",
    label: "TikTok",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.75 2h2.5v7.25h2.5V12h-2.5v7.25h-2.5V12h-2.5V9.25h2.5V2z" />
      </svg>
    ),
  },
  {
    name: "github",
    label: "GitHub",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5 0-1.1.39-2 .1-2.7 0 0 .84-.28 2.75 1.04A9.48 9.48 0 0112 6.84c.85.004 1.71.11 2.51.32 1.91-1.32 2.75-1.04 2.75-1.04.29.7.1 1.6.05 2.7 0 3.87-2.34 4.74-4.57 5 .36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.75 1.75-1.75s1.75.78 1.75 1.75c0 .97-.78 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
      </svg>
    ),
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 003.44 4.19c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" />
      </svg>
    ),
  },
  {
    name: "youtube",
    label: "YouTube",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.7-.8-1.5-.8-1.9-.9C17.2 2.7 12 2.7 12 2.7h-.1s-5.2 0-8.8.3c-.4.1-1.2.1-1.9.9-.6.7-.8 2.3-.8 2.3S0 8.1 0 10v4c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.7.8 1.7.8 2.1.9 1.5.1 6.7.3 6.7.3s5.2 0 8.8-.3c.4-.1 1.2-.1 1.9-.9.6-.7.8-2.3.8-2.3S24 15.9 24 14v-4c0-1.9-.2-3.8-.2-3.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2.003a9.97 9.97 0 00-8.84 14.47l-1.1 4.03 4.14-1.09a9.97 9.97 0 004.7 1.2h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.13a8.13 8.13 0 01-4.14-1.14l-.3-.18-2.46.65.66-2.4-.19-.31A8.13 8.13 0 1112.04 20.13zm4.46-6.18c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.28-.22.22-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.6.59.2 1.05.32 1.41.41.59.15 1.13.13 1.56.08.48-.06 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
      </svg>
    ),
  },
  {
    name: "telegram",
    label: "Telegram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.05 2.29l-19.2 7.9c-1.3.54-1.29 1.3-.23 1.64l4.9 1.53 1.88 5.8c.24.74.6.91 1.22.67l2.62-1.94 4.36 3.22c.8.59 1.38.29 1.57-.73l3.13-14.1c.2-.91-.33-1.32-1.25-.99z" />
      </svg>
    ),
  },
  {
    name: "discord",
    label: "Discord",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.93 4.85c-1.14-.53-2.37-.93-3.66-1.15-.16.28-.34.66-.47.97-1.38-.21-2.75-.21-4.1 0-.13-.31-.32-.69-.48-.97-1.29.22-2.52.62-3.66 1.15C.85 8.58.32 12.22.64 15.82c1.55 1.14 3.06 1.84 4.53 2.29.37-.5.69-1.03.97-1.6-.53-.2-1.04-.45-1.52-.74.13-.09.25-.19.37-.29 2.94 1.35 6.13 1.35 9.04 0 .12.1.24.2.37.29-.48.29-.99.54-1.52.74.28.57.6 1.1.97 1.6 1.47-.45 2.98-1.15 4.53-2.29.37-4.17-.62-7.78-2.64-10.97zM6.7 13.51c-.88 0-1.6-.81-1.6-1.8s.71-1.8 1.6-1.8c.88 0 1.61.81 1.6 1.8 0 .99-.72 1.8-1.6 1.8zm6.6 0c-.88 0-1.6-.81-1.6-1.8s.71-1.8 1.6-1.8c.88 0 1.61.81 1.6 1.8 0 .99-.72 1.8-1.6 1.8z" />
      </svg>
    ),
  },
];

export default function SocialEditor({
  social = {},
  onChange,
  onDelete,
  dragHandleProps,
  isDragging = false,
}: any) {
  const [title, setTitle] = useState(social.title || "");
  const [href, setHref] = useState(social.href || "");
  const [icon, setIcon] = useState(social.icon || "email");

  useEffect(() => {
    setTitle(social.title || "");
    setHref(social.href || "");
    setIcon(social.icon || "email");
  }, [social]);

  const handleInputChange = (field: string, value: string) => {
    if (field === "title") setTitle(value);
    if (field === "href") setHref(value);
    if (field === "icon") setIcon(value);
    onChange({ ...social, [field]: value });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) return;
    onDelete(social);
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-4 mb-4 shadow-lg border border-white/20 transition-all duration-200 relative group select-none"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      {...dragHandleProps}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="text-gray-400 group-hover:text-blue-600 select-none flex-shrink-0"
            style={{
              minWidth: 24,
              minHeight: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "none",
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="6" cy="7" r="2" fill="currentColor" />
              <circle cx="6" cy="12" r="2" fill="currentColor" />
              <circle cx="6" cy="17" r="2" fill="currentColor" />
              <circle cx="12" cy="7" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="17" r="2" fill="currentColor" />
            </svg>
          </div>
          <input
            value={title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="Nama"
            className="border border-white/30 rounded-md px-3 py-2 text-sm bg-white/80 text-black placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all flex-1 min-w-0"
            required
            style={{
              touchAction: "manipulation",
            }}
          />
          <input
            value={href}
            onChange={(e) => handleInputChange("href", e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="URL"
            className="border border-white/30 rounded-md px-3 py-2 text-sm bg-white/80 text-black placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all flex-1 min-w-0"
            required
            style={{
              touchAction: "manipulation",
            }}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <select
              value={icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="border border-white/30 rounded-md px-2 py-1 text-sm bg-white/90 text-black"
              style={{
                touchAction: "manipulation",
              }}
            >
              {ICONS.map(({ name, label }) => (
                <option key={name} value={name}>
                  {label}
                </option>
              ))}
            </select>
            <span className="text-lg">
              {ICONS.find((i) => i.name === (icon || "email"))?.icon}
            </span>
          </div>
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDragging}
              className={`font-semibold px-3 py-2 rounded-md text-xs transition-all duration-200 ${
                isDragging
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-900 border border-gray-400 hover:border-gray-500"
              }`}
              style={{
                touchAction: "manipulation",
              }}
            >
              Hapus
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
