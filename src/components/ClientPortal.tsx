import { Hexagon, Check, Clock, ArrowLeft, Camera, ShieldCheck } from 'lucide-react';
import { fotosRegistro } from '../data/mockData';

interface ClientPortalProps {
  onBack: () => void;
}

const macroStages = [
  { name: 'Ingeniería y Planos', status: 'done', date: 'Completado - 25 Jun 2026' },
  { name: 'Aprovisionamiento de Materiales', status: 'done', date: 'Completado - 28 Jun 2026' },
  { name: 'Fabricación en Planta', status: 'active', date: 'En progreso - 60% completado' },
  { name: 'Control de Calidad', status: 'pending', date: 'Programado - 14 Jul 2026' },
  { name: 'Despacho y Entrega', status: 'pending', date: 'Estimado - 18 Jul 2026' },
];

const stageConfig = {
  done: { dot: 'bg-emerald-500', line: 'bg-emerald-300', icon: Check, iconBg: 'bg-emerald-500', text: 'text-emerald-700' },
  active: { dot: 'bg-brand-500', line: 'bg-gray-200', icon: Clock, iconBg: 'bg-brand-500', text: 'text-brand-700' },
  pending: { dot: 'bg-gray-300', line: 'bg-gray-200', icon: Clock, iconBg: 'bg-gray-200', text: 'text-gray-400' },
};

function CircularProgress({ value }: { value: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="14"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#714B67" />
            <stop offset="100%" stopColor="#017E84" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-900 tracking-tight">{value}%</span>
        <span className="text-xs text-gray-500 font-medium mt-1">Avance General</span>
      </div>
    </div>
  );
}

export default function ClientPortal({ onBack }: ClientPortalProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/30 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
              <Hexagon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-gray-900 text-sm tracking-tight">TSM</div>
              <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Portal de Clientes</div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 h-9 px-3 text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al ERP
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Seguimiento en tiempo real
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Seguimiento OT-2026-071</h1>
          <p className="text-sm text-gray-500 mt-1">Torre de Enfriamiento - Minera Los Andes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-card p-8 flex flex-col items-center justify-center animate-fadeIn">
            <CircularProgress value={68} />
            <div className="mt-6 grid grid-cols-3 gap-3 w-full">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">48 T</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Peso</div>
              </div>
              <div className="text-center border-x border-gray-100">
                <div className="text-lg font-bold text-gray-900">6</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Módulos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">18 Jul</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Entrega</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-card p-6 animate-fadeIn">
            <h2 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-brand-500" />
              Etapas del Proyecto
            </h2>
            <div className="relative">
              <div className="space-y-1">
                {macroStages.map((stage, idx) => {
                  const cfg = stageConfig[stage.status as keyof typeof stageConfig];
                  const Icon = cfg.icon;
                  const isLast = idx === macroStages.length - 1;
                  return (
                    <div key={stage.name} className="flex gap-3.5">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full ${cfg.iconBg} flex items-center justify-center shrink-0 ring-4 ring-white shadow-sm`}>
                          <Icon className={`w-4 h-4 ${stage.status === 'pending' ? 'text-gray-400' : 'text-white'}`} strokeWidth={2.5} />
                        </div>
                        {!isLast && <div className={`w-0.5 flex-1 ${cfg.line} my-1 min-h-[28px]`} />}
                      </div>
                      <div className="flex-1 pb-5">
                        <div className={`text-sm font-semibold ${stage.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                          {stage.name}
                        </div>
                        <div className={`text-xs mt-0.5 ${cfg.text} font-medium`}>{stage.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 animate-fadeIn">
          <div className="flex items-center gap-2 mb-5">
            <Camera className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-gray-900">Registro Fotográfico</h2>
            <span className="text-xs text-gray-400">- Avance de fabricación en planta</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fotosRegistro.map((foto) => (
              <div key={foto.url} className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-card hover:shadow-cardHover transition-all cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={foto.url}
                    alt={foto.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-medium text-white drop-shadow">{foto.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Top Solution Metal (TSM) - Fabricación de estructuras metálicas de alta exigencia.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Para consultas sobre esta OT, contacte a su ejecutivo TSM.
          </p>
        </div>
      </main>
    </div>
  );
}
