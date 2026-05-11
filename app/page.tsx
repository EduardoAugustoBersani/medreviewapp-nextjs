"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  LineChart,
  ListChecks,
  Plus,
  Search,
  Target,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";

const materias = [
  { nome: "Clínica Médica", progresso: 72, assuntos: 18, cor: "from-blue-500 to-cyan-400" },
  { nome: "Cirurgia", progresso: 58, assuntos: 14, cor: "from-emerald-500 to-teal-400" },
  { nome: "Pediatria", progresso: 44, assuntos: 11, cor: "from-purple-500 to-fuchsia-400" },
  { nome: "GO", progresso: 61, assuntos: 16, cor: "from-orange-500 to-amber-400" },
];

const revisoes = [
  { assunto: "Hipertermia maligna", materia: "Cirurgia", data: "Hoje", prioridade: "Alta" },
  { assunto: "Síndrome nefrítica", materia: "Clínica Médica", data: "Hoje", prioridade: "Média" },
];

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl bg-white/90 shadow-sm ${className}`}>{children}</div>;
}

export default function Home() {
  const [busca, setBusca] = useState("");
  const [pomodoro, setPomodoro] = useState(25);

  const revisoesFiltradas = useMemo(() => {
    return revisoes.filter((item) =>
      `${item.assunto} ${item.materia}`.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        MedReview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {materias.map((m) => (
          <Card key={m.nome} className="p-5">
            <h2 className="text-xl font-semibold">{m.nome}</h2>
            <p className="text-slate-500 mt-1">{m.assuntos} assuntos cadastrados</p>

            <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${m.progresso}%` }}
              />
            </div>

            <p className="mt-2 text-sm font-medium">{m.progresso}% concluído</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Revisões</h2>

          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar assunto..."
            className="rounded-xl bg-slate-100 px-4 py-2 outline-none"
          />
        </div>

        <div className="space-y-3 mt-5">
          {revisoesFiltradas.map((item) => (
            <div
              key={item.assunto}
              className="rounded-2xl bg-slate-50 p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.assunto}</h3>
                <p className="text-sm text-slate-500">
                  {item.materia} • {item.data}
                </p>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                Revisar
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-8 p-6 max-w-sm">
        <h2 className="text-2xl font-bold">Pomodoro</h2>

        <div className="mt-6 text-center">
          <div className="text-6xl font-bold text-blue-600">{pomodoro}:00</div>

          <div className="grid grid-cols-3 gap-2 mt-6">
            {[15, 25, 50].map((min) => (
              <button
                key={min}
                onClick={() => setPomodoro(min)}
                className={`rounded-xl py-2 ${
                  pomodoro === min
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
