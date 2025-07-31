"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import data from "@/data";
import Image from "next/image";

const BLOCK_KEY =
  "f5d672c9e67f5ff4accad98328b45ae4d1381341eac911b695cfbbdedc40bde4";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [blockTime, setBlockTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const blockUntil = Number(localStorage.getItem(BLOCK_KEY) || "0");
    const now = Math.floor(Date.now() / 1000);
    if (blockUntil > now) {
      setBlockTime(blockUntil - now);
    }
  }, []);

  useEffect(() => {
    if (blockTime > 0) {
      setTimer(blockTime);
      localStorage.setItem(
        BLOCK_KEY,
        String(Math.floor(Date.now() / 1000) + blockTime)
      );
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            setBlockTime(0);
            localStorage.removeItem(BLOCK_KEY);
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      localStorage.removeItem(BLOCK_KEY);
    }
  }, [blockTime]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          router.replace("/config");
        }
      });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (blockTime > 0) return;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      router.replace("/config");
    } else {
      setError(data.error || "Username atau password salah.");
      if (res.status === 429 && data.error) {
        const match = data.error.match(/dalam (\d+) detik/);
        if (match) {
          setBlockTime(Number(match[1]));
        }
      }
    }
  };

  const isBlocked = blockTime > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-1"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/15 rounded-full animate-float-3"></div>
        <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-blue-300/20 rounded-full animate-float-4"></div>
        <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-1"></div>
        <div className="absolute top-1/5 left-2/3 w-1 h-1 bg-blue-500/30 rounded-full animate-float-3"></div>
      </div>

      <div className="absolute inset-0 opacity-8 pointer-events-none">
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

      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent mb-2 text-center tracking-tight">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 text-center max-w-md leading-relaxed font-light px-4">
          Login Panel
        </p>
        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col gap-5 w-full max-w-sm border border-white/20"
        >
          <input
            type="text"
            placeholder="Username"
            className="border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/70 text-black placeholder-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isBlocked}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/70 text-black placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isBlocked}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold transition-all border border-blue-700/40 hover:border-blue-800/60 shadow-md"
            type="submit"
            disabled={isBlocked}
          >
            {isBlocked ? `Tunggu ${timer} detik...` : "Login"}
          </button>
          {error && <span className="text-red-500 text-center">{error}</span>}
        </form>
      </div>

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
