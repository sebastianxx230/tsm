import { Plus, Factory, Truck, Scale, AlertTriangle, ArrowUpRight, Filter, Download } from 'lucide-react';
import { ordenes, type OTStatus } from '../data/mockData';
import { usePermissions } from '../context/PermissionsContext';

interface DashboardProps {
  onSelectOT: (code: string) => void;
  onCreateOT: () => void;
}

const statusStyles: Record<OTStatus, string> = {
  Producción: 'bg-blue-100 text-blue-800',
  Ingeniería: 'bg-purple-100 text-purple-800',
  Logística: 'bg-amber-100 text-amber-800',
  Calidad: 'bg-teal-100 text-teal-800',
  Despachado: 'bg-emerald-100 text-emerald-800',
  Planeamiento: 'bg-indigo-100 text-indigo-800',
  Comercial: 'bg-pink-100 text-pink-800',
};

const kpis = [
  { label: 'OTs en Producción', value: '6', icon: Factory, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', trend: '+2 esta semana', trendColor: 'text-emerald-600' },
  { label: 'Despachos Programados', value: '3', icon: Truck, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', trend: 'Próximos 7 días', trendColor: 'text-gray-500' },
  { label: 'Tonelaje en Planta', value: '204 T', icon: Scale, iconBg: 'bg-teal-50', iconColor: 'text-teal-600', trend: '+18 T vs. ayer', trendColor: 'text-emerald-600' },
  { label: 'Alertas Críticas', value: '1', icon: AlertTriangle, iconBg: 'bg-rose-50', iconColor: 'text-rose-600', trend: 'Material retrasado', trendColor: 'text-rose-600' },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Dashboard({ onSelectOT, onCreateOT }: DashboardProps) {
  const { can } = usePermissions();
  const canCreate = can('planeamiento', 'edit') || can('produccion', 'edit');

  return (
    <div className="animate-fadeIn">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Panel de Control Operativo</h1>
          <p className="text-sm text-gray-500 mt-0.5">Resumen general de la planta productiva - 1 de Julio, 2026</p>
        </div>
        {canCreate && (
          <button
            onClick={onCreateOT}
            className="flex items-center gap-2 h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Crear OT
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-gray-200 shadow-card p-5 hover:shadow-cardHover transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${kpi.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.iconColor}`} strokeWidth={2} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
              </div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
              <div className={`text-[11px] font-medium mt-2 ${kpi.trendColor}`}>{kpi.trend}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Órdenes de Trabajo Activas</h2>
            <p className="text-xs text-gray-500 mt-0.5">{ordenes.length} órdenes en curso</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filtrar
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">OT</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Cliente</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Proyecto / Site</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider min-w-[180px]">Avance</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Fecha Estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenes.map((ot) => (
                <tr
                  key={ot.code}
                  onClick={() => onSelectOT(ot.code)}
                  className="hover:bg-brand-50/40 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-3">
                    <span className="font-semibold text-brand-700 group-hover:text-brand-800 font-mono text-[13px]">
                      {ot.code}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{ot.cliente}</td>
                  <td className="px-5 py-3">
                    <div className="text-gray-900 font-medium">{ot.proyecto}</div>
                    <div className="text-xs text-gray-500">{ot.site}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[ot.estado]}`}>
                      {ot.estado}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden min-w-[80px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${ot.avance}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-9 text-right">{ot.avance}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-[13px]">{formatDate(ot.fechaEstimada)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
