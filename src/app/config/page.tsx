"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import LinkEditor from "@/components/config/LinkEditor";
import SocialEditor from "@/components/config/SocialEditor";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GiDoor } from "react-icons/gi";
import { FaFloppyDisk } from "react-icons/fa6";
import data from "@/data";

export default function ConfigPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const router = useRouter();
  const [deletedLinkIds, setDeletedLinkIds] = useState<string[]>([]);
  const [deletedSocialIds, setDeletedSocialIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.status === 401) {
          router.replace("/config/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) setUser(data.user);
        setLoading(false);
      });
  }, [router]);

  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        console.log("[ConfigPage] Links data received:", data);
        const sortedData = data.sort(
          (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
        );
        setLinks(sortedData);
      });

    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        console.log("[ConfigPage] Socials data received:", data);
        const sortedData = data.sort(
          (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
        );
        console.log("[ConfigPage] Socials sorted data:", sortedData);
        setSocials(sortedData);
      })
      .catch((error) => {
        console.error("[ConfigPage] Error fetching socials:", error);
      });
  }, []);

  useEffect(() => {
    console.log("[ConfigPage] Socials state changed:", socials);
  }, [socials]);

  const reassignLinkOrders = useCallback((items: any[]) => {
    return items.map((item, index) => ({ ...item, order: index }));
  }, []);

  const reassignSocialOrders = useCallback((items: any[]) => {
    return items.map((item, index) => ({ ...item, order: index }));
  }, []);

  const getSortedLinks = useCallback(() => {
    const sorted = [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    console.log("[ConfigPage] getSortedLinks result:", sorted);
    return sorted;
  }, [links]);

  const getSortedSocials = useCallback(() => {
    const sorted = [...socials].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    console.log("[ConfigPage] getSortedSocials result:", sorted);
    return sorted;
  }, [socials]);

  const handleChangeLink = useCallback((updated: any) => {
    console.log("[ConfigPage] handleChangeLink:", updated);
    setLinks((prevLinks) => {
      return prevLinks.map((l) => {
        const shouldUpdate =
          (l._id && l._id === updated._id) ||
          (l.tempId && l.tempId === updated.tempId);

        if (shouldUpdate) {
          return { ...l, ...updated };
        }
        return l;
      });
    });
  }, []);

  const handleChangeSocial = useCallback((updated: any) => {
    console.log("[ConfigPage] handleChangeSocial:", updated);
    setSocials((prevSocials) => {
      const newSocials = prevSocials.map((s) => {
        const shouldUpdate =
          (s._id && updated._id && s._id === updated._id) ||
          (s.tempId && updated.tempId && s.tempId === updated.tempId);

        if (shouldUpdate) {
          return { ...s, ...updated };
        }
        return s;
      });
      console.log("[ConfigPage] handleChangeSocial result:", newSocials);
      return newSocials;
    });
  }, []);

  const handleDeleteLink = useCallback(
    (item: any) => {
      if (isDragging) return;

      console.log("[ConfigPage] handleDeleteLink:", item);

      if (item._id) {
        setDeletedLinkIds((prev) => [...prev, item._id]);
      }

      setLinks((prevLinks) => {
        return prevLinks.filter((l) => {
          if (item._id) {
            return l._id !== item._id;
          }
          if (item.tempId) {
            return l.tempId !== item.tempId;
          }
          return true;
        });
      });
    },
    [isDragging]
  );

  const handleDeleteSocial = useCallback(
    (item: any) => {
      if (isDragging) return;

      console.log("[ConfigPage] handleDeleteSocial:", item);

      if (item._id) {
        setDeletedSocialIds((prev) => [...prev, item._id]);
      }

      setSocials((prevSocials) => {
        const filtered = prevSocials.filter((s) => {
          if (item._id) {
            return s._id !== item._id;
          }
          if (item.tempId) {
            return s.tempId !== item.tempId;
          }
          return true;
        });
        console.log("[ConfigPage] handleDeleteSocial result:", filtered);
        return filtered;
      });
    },
    [isDragging]
  );

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/config/login");
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragCancel = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDragEndLinks = useCallback((event: DragEndEvent) => {
    setIsDragging(false);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLinks((prevLinks) => {
      const currentItems = [...prevLinks].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      const oldIndex = currentItems.findIndex(
        (item) => (item._id || item.tempId) === active.id
      );
      const newIndex = currentItems.findIndex(
        (item) => (item._id || item.tempId) === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return prevLinks;
      }

      return arrayMove(currentItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
    });
  }, []);

  const handleDragEndSocials = useCallback((event: DragEndEvent) => {
    setIsDragging(false);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSocials((prevSocials) => {
      const currentItems = [...prevSocials].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      const oldIndex = currentItems.findIndex(
        (item) => (item._id || item.tempId) === active.id
      );
      const newIndex = currentItems.findIndex(
        (item) => (item._id || item.tempId) === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return prevSocials;
      }

      return arrayMove(currentItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
    });
  }, []);

  function generateTempId() {
    return "temp-" + Math.random().toString(36).slice(2, 10);
  }

  const addNewLink = useCallback(() => {
    setLinks((prev) => {
      const nextOrder = prev.length;

      return [
        ...prev,
        {
          tempId: generateTempId(),
          order: nextOrder,
          title: "",
          href: "",
          icon: "default",
        },
      ];
    });
  }, []);

  const addNewSocial = useCallback(() => {
    setSocials((prev) => {
      const nextOrder = prev.length;
      const newSocial = {
        tempId: generateTempId(),
        title: "",
        href: "",
        icon: "email",
        order: nextOrder,
      };
      return [...prev, newSocial];
    });
  }, []);

  const handleSaveAll = async () => {
    try {
      const validLinks = links.filter((l) => l.title && l.href);
      const validSocials = socials.filter((s) => s.title && s.href && s.icon);

      console.log("[ConfigPage] Saving validLinks:", validLinks);
      console.log("[ConfigPage] Saving validSocials:", validSocials);

      await fetch("/api/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: validLinks, deletedIds: deletedLinkIds }),
      });

      await fetch("/api/socials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          socials: validSocials,
          deletedIds: deletedSocialIds,
        }),
      });

      setModalMessage("Semua perubahan telah disimpan!");
      setModalOpen(true);

      const [linksRes, socialsRes] = await Promise.all([
        fetch("/api/links").then((res) => res.json()),
        fetch("/api/socials").then((res) => res.json()),
      ]);

      setLinks(
        linksRes.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
      );
      setSocials(
        socialsRes.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
      );

      setDeletedLinkIds([]);
      setDeletedSocialIds([]);
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = setTimeout(() => setModalOpen(false), 2000);
    } catch (e) {
      setModalMessage("Gagal menyimpan perubahan.");
      setModalOpen(true);
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = setTimeout(() => setModalOpen(false), 2000);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mb-6"></div>
        <div className="text-xl font-semibold text-blac">Memuat data...</div>
        <div className="text-black">Mohon tunggu sebentar</div>
      </div>
    );
  if (!user) return null;

  const sortedLinks = getSortedLinks();
  const sortedSocials = getSortedSocials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden">
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

      <div className="relative flex flex-col items-center mx-auto w-full justify-center pt-16 pb-8 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        </div>
        <h1 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent mb-2 text-center tracking-tight">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 text-center max-w-md leading-relaxed font-light px-4">
          Konfigurasi Link & Sosial
        </p>

        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <p className="text-white text-lg">
              Selamat datang,{" "}
              <span className="font-semibold">{user.username}</span>!
            </p>
            <form onSubmit={handleLogout}>
              <button
                className="bg-white flex gap-2 items-center hover:bg-gray-100 text-blue-700 px-4 py-2 rounded-full font-semibold transition-all duration-200 border border-blue-200 hover:border-blue-400 ml-4 shadow"
                type="submit"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12H9m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Logout
              </button>
            </form>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white border-b-2 border-white pb-2">
            Links
          </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEndLinks}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={sortedLinks.map((item) => item._id || item.tempId)}
              strategy={verticalListSortingStrategy}
            >
              {sortedLinks.map((item) => (
                <SortableLinkEditor
                  key={item._id || item.tempId}
                  id={item._id || item.tempId}
                  item={item}
                  onChange={handleChangeLink}
                  onDelete={handleDeleteLink}
                  isDragging={isDragging}
                />
              ))}
            </SortableContext>
          </DndContext>
          <button
            onClick={addNewLink}
            className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 rounded-lg mt-3 transition-all duration-200 border border-white hover:border-blue-400 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            + Tambah Link
          </button>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white border-b-2 border-white pb-2">
            Sosial Media (Urutan Dari Kiri ke Kanan)
          </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEndSocials}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={sortedSocials.map((item) => item._id || item.tempId)}
              strategy={verticalListSortingStrategy}
            >
              {sortedSocials.map((item) => (
                <SortableSocialEditor
                  key={item._id || item.tempId}
                  id={item._id || item.tempId}
                  item={item}
                  onChange={handleChangeSocial}
                  onDelete={handleDeleteSocial}
                  isDragging={isDragging}
                />
              ))}
            </SortableContext>
          </DndContext>
          <button
            onClick={addNewSocial}
            className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 rounded-lg mt-3 transition-all duration-200 border border-white hover:border-blue-400 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            + Tambah Social
          </button>

          <button
            onClick={handleSaveAll}
            className="w-full text-center bg-gray-100 flex gap-2 align-center items-baseline justify-center items-center hover:bg-gray-200 text-black font-bold py-4 rounded-lg mt-8 transition-all duration-200 shadow-md hover:shadow-lg text-lg"
          >
            <FaFloppyDisk />
            Simpan Semua Perubahan
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 text-black font-bold text-lg border border-black">
            {modalMessage}
          </div>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className="fixed bottom-6 right-6 bg-white hover:bg-blue-100 text-blue-700 rounded-full p-4 shadow-lg border border-blue-200 hover:border-blue-400 transition-all z-50 flex items-center justify-center"
        title="Kembali ke halaman utama"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l9-7 9 7"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9h6v12" />
        </svg>
      </button>

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

function SortableLinkEditor({
  id,
  item,
  onChange,
  onDelete,
  isDragging: globalIsDragging,
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : "auto",
    marginBottom: "0.5rem",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <LinkEditor
        link={item}
        onChange={onChange}
        onDelete={onDelete}
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
        isDragging={globalIsDragging}
      />
    </div>
  );
}

function SortableSocialEditor({
  id,
  item,
  onChange,
  onDelete,
  isDragging: globalIsDragging,
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : "auto",
    marginBottom: "0.5rem",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SocialEditor
        social={item}
        onChange={onChange}
        onDelete={onDelete}
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
        isDragging={globalIsDragging}
      />
    </div>
  );
}
