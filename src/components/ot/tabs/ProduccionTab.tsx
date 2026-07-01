import { Check, Clock, Plus, FileBarChart, Lock } from 'lucide-react';
import { procesosProduccion, avancesPlanos, type ProcesoProduccion } from '../../../data/mockData';
import { usePermissions } from '../../../context/PermissionsContext';

const estadoConfig: Record<ProcesoProduccion['estado'], { dot: string; text: string; ring: string }> = {
  Completado: { dot: 'bg-emerald-500', text: 'text-emerald-700', ring: 'ring-emerald-100' },
  'En Progreso': { dot: 'bg-brand-500', text: 'text-brand-700', ring: 'ring-brand-100' },
  Pendiente: { dot: 'bg-gray-300', text: 'text-gray-500', ring: 'ring-gray-100' },
};

export default function ProduccionTab() {
  const { can } = usePermissions();
  const canEdit = can('produccion', 'edit');

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-gray-900">Procesos de Fabricación</h3>
          <span className="text-xs text-gray-400">2 de 5 completados</span>
        </div>

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />
          <div className="space-y-1">
            {procesosProduccion.map((p, idx) => {
              const cfg = estadoConfig[p.estado];
              const isCompleted = p.estado === 'Completado';
              const isInProgress = p.estado === 'En Progreso';

              return (
                <div key={p.nombre} className="relative pl-10 py-2.5 group">
                  <div
                    className={`absolute left-0 top-2.5 w-8 h-8 rounded-full flex items-center justify-center ring-4 ${cfg.ring} transition-all ${
                      isCompleted
                        ? 'bg-emerald-500'
                        : isInProgress
                          ? 'bg-brand-500'
                          : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : isInProgress ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${isCompleted || isInProgress ? 'text-gray-900' : 'text-gray-500'}`}>
                          {idx + 1}. {p.nombre}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {p.estado}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Responsable: <span className="text-gray-700 font-medium">{p.responsable}</span>
                        {p.inicio && <span className="ml-2 text-gray-400">- Inicio: {new Date(p.inicio).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}</span>}
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-gradient-to-r from-brand-500 to-teal-500' : 'bg-gray-200'
                            }`}
                            style={{ width: `${p.avance}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-600 w-9 text-right tabular-nums">{p.avance}%</span>
                      </div>
                    </div>

                    {(isInProgress || (!isCompleted && idx === procesosProduccion.findIndex((x) => x.estado === 'Pendiente'))) && (
                      canEdit ? (
                        <button className="shrink-0 flex items-center gap-1 h-7 px-2.5 text-[11px] font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-md transition-colors">
                          <Plus className="w-3 h-3" strokeWidth={2.5} />
                          Registrar Avance
                        </button>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 h-7 px-2.5 text-[11px] font-semibold text-gray-400 bg-gray-50 rounded-md">
                          <Lock className="w-3 h-3" />
                          Solo lectura
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileBarChart className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Avance de Planos</h3>
          </div>
          <span className="text-xs text-gray-400">{avancesPlanos.length} activos</span>
        </div>

        <div className="space-y-3">
          {avancesPlanos.map((ap) => (
            <div
              key={ap.plano}
              className="p-3.5 border border-gray-200 rounded-lg hover:border-brand-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs font-semibold text-brand-700 shrink-0">{ap.plano}</span>
                  <span className="text-xs text-gray-500 truncate">{ap.descripcion}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`w-6 h-6 rounded-full ${ap.avatarColor} flex items-center justify-center text-[10px] font-bold text-white`}>
                    {ap.trabajador.split(' ').pop()?.[0] ?? '?'}
                  </div>
                  <span className="text-xs font-medium text-gray-600 hidden sm:inline">{ap.trabajador}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ap.avance === 100
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-brand-500 to-teal-500'
                    }`}
                    style={{ width: `${ap.avance}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-9 text-right tabular-nums">{ap.avance}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            Última actualización: hace 2 horas
          </div>
          <button className="text-xs font-semibold text-brand-700 hover:text-brand-800">
            Ver todos los planos
          </button>
        </div>
      </div>
    </div>
  );
}
