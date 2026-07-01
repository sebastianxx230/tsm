import { Truck, Package, Calendar, MapPin, Plus } from 'lucide-react';
import { despachos, type Despacho } from '../../../data/mockData';
import { usePermissions } from '../../../context/PermissionsContext';

const despachoStatusStyles: Record<Despacho['estado'], string> = {
  Programado: 'bg-amber-100 text-amber-800',
  'En Ruta': 'bg-blue-100 text-blue-800',
  Entregado: 'bg-emerald-100 text-emerald-800',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
}

export default function LogisticaTab() {
  const { can } = usePermissions();
  const canEdit = can('logistica', 'edit');

  return (
    <div className="animate-fadeIn space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Despachos Programados', value: '3', icon: Truck, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'En Ruta', value: '1', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tonelaje por despachar', value: '110 T', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-50' },
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
            <Truck className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Despachos Programados</h3>
            <span className="text-xs text-gray-400">({despachos.length})</span>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Programar Despacho
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">N° Despacho</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">OT</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Destino</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Transporte</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Peso (T)</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Fecha</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {despachos.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-2.5">
                    <span className="font-mono text-[13px] font-semibold text-brand-700">{d.id}</span>
                  </td>
                  <td className="px-5 py-2.5 font-mono text-[13px] text-gray-700">{d.ot}</td>
                  <td className="px-5 py-2.5 text-gray-900 font-medium">{d.destino}</td>
                  <td className="px-5 py-2.5 text-gray-600">{d.transporte}</td>
                  <td className="px-5 py-2.5 text-right text-gray-700 tabular-nums">{d.pesoTon}</td>
                  <td className="px-5 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(d.fecha)}
                    </span>
                  </td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${despachoStatusStyles[d.estado]}`}>
                      {d.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-600" />
          Rutas de Despacho
        </h3>
        <div className="space-y-3">
          {despachos.map((d) => (
            <div key={d.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <div className="w-px h-6 bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Planta TSM - Quilicura</div>
                <div className="text-xs text-gray-500 mt-2">{d.destino}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-semibold text-gray-700">{d.transporte}</div>
                <div className="text-[11px] text-gray-400">{d.pesoTon} T</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
