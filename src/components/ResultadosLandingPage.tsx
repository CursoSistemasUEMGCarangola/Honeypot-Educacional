"use client";

import { useEffect, useRef, useState } from "react";

interface Metric {
  id: number;
  nome: string;
  cliques: number;
}

interface ResultadosLandingPageProps {
  campanha: string;
  totalGeral: number;
  metricas: Metric[];
}

export default function ResultadosLandingPage({
  campanha,
  totalGeral: initialTotal,
  metricas: initialMetricas,
}: ResultadosLandingPageProps) {
  const [data, setData] = useState({ totalGeral: initialTotal, metricas: initialMetricas });
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Função para recarregar dados manualmente
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/metricas?v=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData({
          totalGeral: json.totalGeral,
          metricas: json.metricas,
        });
      }
    } catch (err) {
      console.error("Erro ao atualizar métricas:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para garantir que o vídeo comece a rodar imediatamente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay bloqueado ou falhou:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="bg-primary-container min-h-screen font-body-md text-on-background pb-20 selection:bg-secondary selection:text-white">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-yellow-400 dark:bg-yellow-500 border-b-4 border-green-700 shadow-[0px_4px_0px_0px_rgba(0,103,56,1)]">
        <div className="flex items-center gap-3">
          <h1 className="font-headline-md font-black italic uppercase tracking-tighter text-xl text-blue-900 dark:text-blue-950">
            UEMG SEGURA - RESULTADOS
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="animate-pulse flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest hidden sm:inline">
            Campanha Finalizada
          </span>
        </div>
      </header>

      <main className="pt-24 px-gutter max-w-container-max mx-auto flex flex-col gap-lg">
        {/* Banner de Alerta / Conscientização */}
        <section className="bg-blue-900 text-white rounded-xl p-lg border-4 border-yellow-400 shadow-[6px_6px_0px_0px_rgba(0,110,39,1)] relative overflow-hidden">
          <div className="absolute inset-0 mesh-texture opacity-20"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-yellow-400 text-blue-950 font-label-bold text-[10px] px-sm py-xs mb-sm rounded uppercase tracking-widest">
              Aviso Importante
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl font-black uppercase italic tracking-tight mb-sm leading-none">
              Isso foi um teste de Phishing!
            </h2>
            <p className="font-body-lg text-base md:text-lg text-slate-100 mb-xs">
              A campanha <strong className="text-yellow-300">"{campanha}"</strong> foi uma simulação controlada para avaliar a vulnerabilidade a golpes de phishing em nosso campus.
            </p>
            <p className="text-sm text-yellow-100 font-label-bold uppercase tracking-wider">
              Nenhum dado pessoal foi coletado ou salvo no banco de dados.
            </p>
          </div>
        </section>

        {/* Grid Principal: Vídeo e Métricas */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-md items-start">
          {/* Coluna 1: Vídeo Player (Lg: 5/12) */}
          <div className="lg:col-span-5 bg-white rounded-xl border-4 border-blue-900 p-md shadow-[8px_8px_0px_0px_rgba(0,110,39,1)] flex flex-col gap-sm">
            <div className="flex justify-between items-center border-b-2 border-slate-100 pb-sm">
              <div className="flex items-center gap-sm text-blue-900">
                <span className="material-symbols-outlined text-2xl font-black">security</span>
                <h3 className="font-headline-md text-sm uppercase tracking-tight">Vídeo Informativo</h3>
              </div>
              <button
                onClick={toggleMute}
                className="flex items-center gap-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-blue-900 rounded-lg text-xs font-black text-blue-900 uppercase tracking-widest transition-all"
              >
                <span className="material-symbols-outlined text-sm">
                  {muted ? "volume_off" : "volume_up"}
                </span>
                {muted ? "Som" : "Mudo"}
              </button>
            </div>

            {/* Video Container (Vertical 9:16 como no Instagram) */}
            <div className="flex justify-center items-center py-sm bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <div className="relative aspect-[9/16] w-full max-w-[280px] bg-slate-900 rounded-2xl overflow-hidden border-4 border-blue-900 group shadow-lg">
                <video
                  ref={videoRef}
                  src="/ProjetoSeg.mp4"
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs text-outline font-label-bold uppercase tracking-wider mt-xs">
              * Assista ao Reels de conscientização acima.
            </p>
          </div>

          {/* Coluna 2: Métricas (Lg: 7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-md">
            {/* Card Totalizador */}
            <div className="bg-slate-900 text-white p-lg rounded-xl border-4 border-blue-900 shadow-[8px_8px_0px_0px_rgba(255,226,67,1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-2 right-4 text-white/5 font-black text-7xl select-none">UEMG</div>
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-1">
                Total de Engajamentos
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tighter tabular-nums text-yellow-400">
                  {data.totalGeral}
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Estudantes Fisgados
                </span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="mt-4 flex items-center gap-2 px-5 py-2 bg-yellow-400 text-blue-900 hover:bg-yellow-300 border-2 border-blue-900 rounded-lg text-xs font-black uppercase tracking-widest active:translate-y-0.5 duration-100 transition-all disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-sm font-black ${loading ? "animate-spin" : ""}`}>
                  sync
                </span>
                Atualizar Dados
              </button>
            </div>

            {/* Listagem de Métricas por Curso */}
            <div className="bg-white rounded-xl border-4 border-blue-900 p-md shadow-[8px_8px_0px_0px_rgba(0,110,39,1)] flex flex-col gap-sm">
              <h4 className="font-headline-md text-sm text-blue-900 uppercase border-b-2 border-slate-100 pb-sm tracking-widest">
                Ranking por Curso (Cliques)
              </h4>

              <div className="max-h-[300px] overflow-y-auto space-y-sm pr-xs custom-scrollbar">
                {data.metricas.length === 0 ? (
                  <p className="text-sm text-outline italic text-center py-8">Nenhum clique registrado nesta campanha.</p>
                ) : (
                  data.metricas.map((m, idx) => {
                    const percentage = data.totalGeral > 0 ? (m.cliques / data.totalGeral) * 100 : 0;
                    return (
                      <div key={m.id} className="flex flex-col gap-1 border-b border-slate-50 pb-sm last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-xs">
                            <span className="text-[10px] font-black text-secondary uppercase">
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-slate-800 text-sm">{m.nome}</span>
                          </div>
                          <span className="text-sm font-black text-slate-900 tabular-nums">{m.cliques}</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                          <div
                            className="h-full bg-secondary rounded-full transition-all duration-1000"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Educativa: Dicas Rápidas */}
        <section className="bg-white rounded-xl border-4 border-blue-900 p-lg shadow-[8px_8px_0px_0px_rgba(255,226,67,1)] grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-error">
              <span className="material-symbols-outlined font-black text-3xl">report_problem</span>
              <h5 className="font-headline-md text-lg uppercase tracking-tight text-slate-900">1. Senso de Urgência</h5>
            </div>
            <p className="font-body-md text-sm text-outline">
              Golpes de phishing sempre criam uma falsa urgência ou benefícios incríveis ("Ganhe a camisa do Hexa AGORA!"). Pense duas vezes antes de agir sob pressão.
            </p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-error">
              <span className="material-symbols-outlined font-black text-3xl">link</span>
              <h5 className="font-headline-md text-lg uppercase tracking-tight text-slate-900">2. URLs Suspeitas</h5>
            </div>
            <p className="font-body-md text-sm text-outline">
              Sempre verifique a barra de endereços do navegador. Domínios estranhos ou encurtadores desconhecidos são indícios fortíssimos de fraude digital.
            </p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-error">
              <span className="material-symbols-outlined font-black text-3xl">alternate_email</span>
              <h5 className="font-headline-md text-lg uppercase tracking-tight text-slate-900">3. Remetente Duvidoso</h5>
            </div>
            <p className="font-body-md text-sm text-outline">
              E-mails ou páginas que fingem ser de canais oficiais da UEMG, mas usam e-mails ou servidores externos não relacionados à instituição, devem ser ignorados.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-xl py-lg bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
        <div className="relative z-10">
          <p className="font-label-bold text-label-bold opacity-70 mb-xs">
            UEMG - UNIVERSIDADE DO ESTADO DE MINAS GERAIS
          </p>
          <p className="font-label-bold text-label-bold tracking-widest mb-xs">
            CAMPANHA EDUCATIVA DE SEGURANÇA DA INFORMAÇÃO © 2026
          </p>
          <p className="font-label-bold text-label-bold tracking-widest opacity-80">
            3º PERÍODO DE SISTEMAS DE INFORMAÇÃO
          </p>
        </div>
      </footer>
    </div>
  );
}
