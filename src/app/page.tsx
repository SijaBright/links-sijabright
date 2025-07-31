"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import LinkSocial from "@/components/LinkSocial";
import data from "@/data";

function LinkCardSkeleton() {
  return (
    <div className="group relative animate-pulse">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20"></div>
      <div className="relative flex items-center p-4 w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center border border-white/30">
            <div className="w-7 h-7 bg-blue-200/40 rounded-md" />
          </div>
        </div>
        <div className="flex-1 text-center">
          <div className="h-5 bg-blue-100/30 rounded w-2/3 mx-auto mb-2"></div>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-2"></div>
        </div>
        <div className="flex-shrink-0 ml-4 opacity-60">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-100/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialSkeleton() {
  return (
    <div className="group relative animate-pulse">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-full blur opacity-40"></div>
      <div
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                   bg-white/10 backdrop-blur-md border border-blue-400/40 rounded-full`}
      >
        <div className="w-6 h-6 bg-blue-100/30 rounded-full" />
      </div>
    </div>
  );
}

export default function Home() {
  const [links, setLinks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [user, setUser] = useState<any>(null);

  const fetchData = async () => {
    const [linksRes, socialsRes] = await Promise.all([
      fetch("/api/public/links").then((r) => r.json()),
      fetch("/api/public/socials").then((r) => r.json()),
    ]);
    setLinks(
      linksRes.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
    );
    setSocials(
      socialsRes.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.user) setUser(data.user);
      });
  }, []);

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, 5 * 60 * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(white 2px, transparent 1px),
            linear-gradient(90deg, white 2px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-1"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/15 rounded-full animate-float-3"></div>
        <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-blue-300/20 rounded-full animate-float-4"></div>
        <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-1"></div>
        <div className="absolute top-1/5 left-2/3 w-1 h-1 bg-blue-500/30 rounded-full animate-float-3"></div>
      </div>

      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-32 left-12 w-16 h-16 animate-spin-very-slow">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-white/10 fill-none stroke-2"
          >
            <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-16 w-12 h-12 animate-pulse">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-blue-400/15 fill-none stroke-2"
          >
            <polygon points="50,10 90,80 10,80" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-8 w-20 h-20 animate-spin-reverse">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-blue-300/10 fill-none stroke-1"
          >
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-1/3 w-8 h-8 rotate-45 bg-gradient-to-br from-white/5 to-blue-400/10 animate-pulse-slow"></div>
      </div>

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-scan"></div>
      </div>

      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse-slow delay-2000"></div>

      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative flex items-center flex-col mx-auto w-full justify-center pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <a href={data.avatar} target="_blank" className="relative block">
            <Image
              priority
              className="rounded-full ring-4 ring-white/30 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30"
              alt={data.name}
              src={data.avatar}
              width={110}
              height={110}
            />
          </a>
        </div>

        <h1 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent mb-2 text-center tracking-tight">
          {data.name}
        </h1>

        {/* <div className='flex items-center gap-2 mb-4'>
          <svg className='w-4 h-4 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
          </svg>
          <p className='text-sm text-white/90 text-center font-light'>
            Sleman, Yogyakarta
          </p>
        </div> */}

        <p className="text-base sm:text-lg text-white/80 mb-8 text-center max-w-md leading-relaxed font-light px-4">
          {data.description}
        </p>

        <div className="w-full max-w-sm sm:max-w-md space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <LinkCardSkeleton key={i} />
              ))
            : links.map((link, index) => (
                <div
                  key={link._id || link.href}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LinkCard {...link} />
                </div>
              ))}
        </div>

        <div className="flex items-center gap-4 mt-10 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SocialSkeleton key={i} />
              ))
            : socials.map((social, index) => (
                <div
                  key={social._id || social.href}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${(links.length + index) * 100}ms`,
                  }}
                >
                  <LinkSocial {...social} />
                </div>
              ))}
        </div>

        <div className="text-center space-y-2">
          <div className="text-white/70 text-sm font-light tracking-wide">
            <a
              href="https://sijabright.my.id"
              className="hover:text-white transition-colors duration-300 border-b border-transparent hover:border-white/50 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              © 2025 SIJABRIGHT
            </a>
          </div>
        </div>
      </div>

      {user && (
        <a
          href="/config"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg border border-white/30 transition-all z-50 flex items-center justify-center"
          title="Konfigurasi"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <circle
              cx="10"
              cy="10"
              r="3.2"
              stroke="currentColor"
              strokeWidth={1.7}
            />
            <path
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 2.5v1.2m0 12.6v1.2m7.5-7.5h-1.2m-12.6 0H2.5m13.14-4.64l-.85.85m-9.58 9.58l-.85.85m11.28 0l-.85-.85m-9.58-9.58l-.85-.85"
            />
          </svg>
        </a>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-5px);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px);
          }
          33% {
            transform: translateY(-10px);
          }
          66% {
            transform: translateY(-5px);
          }
        }

        @keyframes float-4 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-8px) translateX(5px) scale(1.1);
          }
          75% {
            transform: translateY(5px) translateX(-8px) scale(0.9);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
