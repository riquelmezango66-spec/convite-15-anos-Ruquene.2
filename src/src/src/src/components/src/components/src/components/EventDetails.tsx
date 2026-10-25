import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  CalendarPlus,
  Share2,
  Check,
  Sparkles,
  Download,
} from "lucide-react";
import { getGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";
import { copyToClipboard } from "../utils/clipboard";

export const EventDetails: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-11-14T15:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Restaurante do Hotel Plazza Restinga Lobito"
  )}`;

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-10">
      <div className="relative rounded-2xl bg-[#1c2a23]/90 border border-[#dfba73]/35 p-6 sm:p-8 text-center shadow-xl backdrop-blur-md mb-8">
        <div className="inline-flex items-center gap-1.5 mb-2 text-[#ecd38c]">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.3em]">
            Contagem Regressiva
          </span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#fcf9f2] font-semibold mb-6">
          A contagem para o grande dia já começou
        </h3>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          {[
            { label: "Dias", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 rounded-xl bg-[#141e19] border border-[#dfba73]/25 flex flex-col items-center justify-center shadow-inner"
            >
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold gold-text-metallic tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-sans-clean text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        <div className="rounded-xl bg-[#1d2c24]/90 border border-[#dfba73]/35 p-6 flex flex-col justify-between hover:border-[#dfba73]/60 transition-all shadow-md">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#273d32] border border-[#dfba73]/30 flex items-center justify-center text-[#dfba73] mb-3">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury text-lg text-[#fcf9f2] font-semibold mb-1">
              Adicionar à Agenda
            </h4>
            <p className="font-sans-clean text-xs text-slate-300 leading-relaxed mb-4">
              Salve a data de <strong className="text-[#ecd38c]">14 de Novembro às 15 horas</strong> no seu calendário para não esquecer.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#273d32] hover:bg-[#324f41] border border-[#dfba73]/30 text-xs font-semibold text-[#ecd38c] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Salvar no Google Agenda</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <button
              onClick={() => downloadIcsFile()}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#16221c] hover:bg-[#203028] border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar arquivo .ICS (Apple / Outlook)</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-[#1d2c24]/90 border border-[#dfba73]/35 p-6 flex flex-col justify-between hover:border-[#dfba73]/60 transition-all shadow-md">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#273d32] border border-[#dfba73]/30 flex items-center justify-center text-[#dfba73] mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury text-lg text-[#fcf9f2] font-semibold mb-1">
              Localização do Evento
            </h4>
            <p className="font-sans-clean text-xs text-[#ecd38c] font-semibold leading-relaxed mb-0.5">
              Restinga • Restaurante do Hotel Plazza
            </p>
            <p className="font-sans-clean text-xs text-slate-400 leading-relaxed mb-4">
              Restinga, Lobito • Ambiente elegante para celebrar esse momento memorável.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#dfba73] hover:bg-[#cca252] text-[#1c2a24] font-bold text-xs transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#16221c] hover:bg-[#203028] border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#dfba73]" />
                  <span>Copiar Link do Convite</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
