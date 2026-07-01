import { CalendarClock, Plus, Clock, Users } from 'lucide-react';
import { usePermissions } from '../../../context/PermissionsContext';

const ganttTasks = [
  { name: 'Habilitado', start: 0, duration: 25, color: 'bg-emerald-400' },
  { name: 'Armado', start: 25, duration: 35, color: 'bg-brand-500' },
  { name: 'Soldado', start: 55, duration: 25, color: 'bg-teal-500' },
  { name: 'Limpieza', start: 78, duration: 8, color: 'bg-amber-400' },
  { name: 'Galvanizado', start: 85, duration: 15, color: 'bg-blue-400' },
];

const secuencia = [
  { ot: 'OT-2026-073', prioridad: 'Alta', inicio: '2026-07-02', fin: '2026-07-10', estado: 'En proceso' },
  { ot: 'OT-2026-071', prioridad: 'Alta', inicio: '2026-06-26', fin: '2026-07-18', estado: 'En proceso' },
  { ot: 'OT-2026-074', prioridad: 'Media', inicio: '2026-07-06', fin: '2026-07-08', estado: 'Programada' },
  { ot: 'OT-2026-075', prioridad: 'Baja', inicio: '2026-07-12', fin: '2026-07-22', estado: 'Programada' },
];

const prioridadStyles: Record<string, string> = {
  Alta: 'bg-rose-100 text-rose-800',
  Media: 'bg-amber-100 text-amber-800',
  Baja: 'bg-gray-100 text-gray-600',
};

const estadoStyles: Record<string, string> = {
  'En proceso': 'bg-blue-100 text-blue-800',
  Programada: 'bg-gray-100 text-gray-600',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
}

export default function PlaneamientoTab() {
  const { can } = usePermissions();
  const canEdit = can('planeamiento', 'edit');

  return (
    <div className="animate-fadeIn space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'OTs en cola', value: '4', icon: CalendarClock, color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Horas programadas', value: '108 h', icon: Clock, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Operadores asignados', value: '6', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Secuencia de Fabricación</h3>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Reasignar OT
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">OT</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Prioridad</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Inicio</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Fin</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {secuencia.map((s) => (
                <tr key={s.ot} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-2.5">
                    <span className="font-mono text-[13px] font-semibold text-brand-700">{s.ot}</span>
                  </td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prioridadStyles[s.prioridad]}`}>
                      {s.prioridad}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-gray-600">{formatDate(s.inicio)}</td>
                  <td className="px-5 py-2.5 text-gray-600">{formatDate(s.fin)}</td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoStyles[s.estado]}`}>
                      {s.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-brand-600" />
          <h3 className="text-sm font-semibold text-gray-900">Cronograma de Horas - OT-2026-071</h3>
        </div>
        <div className="space-y-2.5">
          {ganttTasks.map((task) => (
            <div key={task.name} className="flex items-center gap-3">
              <div className="w-24 text-xs font-medium text-gray-600 text-right shrink-0">{task.name}</div>
              <div className="flex-1 h-7 bg-gray-50 rounded-md relative overflow-hidden border border-gray-100">
                <div
                  className={`absolute top-0 bottom-0 ${task.color} rounded-md flex items-center px-2 transition-all duration-500`}
                  style={{ left: `${task.start}%`, width: `${task.duration}%` }}
                >
                  <span className="text-[10px] font-semibold text-white whitespace-nowrap">{task.duration}h</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-24 shrink-0"></div>
            <div className="flex-1 flex justify-between text-[10px] text-gray-400 font-medium">
              <span>0h</span>
              <span>25h</span>
              <span>50h</span>
              <span>75h</span>
              <span>100h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
