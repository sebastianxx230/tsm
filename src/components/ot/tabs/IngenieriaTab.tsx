import { FileText, Plus, MoreHorizontal, Package } from 'lucide-react';
import { planos, bom, type Plano } from '../../../data/mockData';
import { usePermissions } from '../../../context/PermissionsContext';

const planoStatusStyles: Record<Plano['estado'], string> = {
  Aprobado: 'bg-emerald-100 text-emerald-800',
  'En Revisión': 'bg-amber-100 text-amber-800',
  Pendiente: 'bg-gray-100 text-gray-600',
  Obsoleto: 'bg-rose-100 text-rose-800',
};

const bomStatusStyles: Record<string, string> = {
  Disponible: 'bg-emerald-100 text-emerald-800',
  'En Tránsito': 'bg-amber-100 text-amber-800',
  'Por Solicitar': 'bg-rose-100 text-rose-800',
};

export default function IngenieriaTab() {
  const { can } = usePermissions();
  const canEdit = can('planeamiento', 'edit');

  return (
    <div className="animate-fadeIn space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Planos de Fabricación</h3>
            <span className="text-xs text-gray-400">({planos.length})</span>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Nuevo Plano
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">ID Plano</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Rev</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Dibujante</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {planos.map((plano) => (
                <tr key={plano.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-2.5">
                    <span className="font-mono text-[13px] font-semibold text-brand-700">{plano.id}</span>
                  </td>
                  <td className="px-5 py-2.5">
                    <span className="inline-flex items-center justify-center w-7 h-6 rounded bg-gray-100 text-xs font-bold text-gray-700">
                      {plano.rev}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-gray-700">{plano.dibujante}</td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${planoStatusStyles[plano.estado]}`}>
                      {plano.estado}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <button className="w-7 h-7 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">BOM / Lista de Materiales</h3>
            <span className="text-xs text-gray-400">({bom.length} ítems)</span>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Agregar Ítem
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Código</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Descripción</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Cant.</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Unidad</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Peso (kg)</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bom.map((item) => (
                <tr key={item.codigo} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-2.5">
                    <span className="font-mono text-[13px] font-semibold text-gray-800">{item.codigo}</span>
                  </td>
                  <td className="px-5 py-2.5 text-gray-900 font-medium">{item.descripcion}</td>
                  <td className="px-5 py-2.5 text-right text-gray-700 tabular-nums">{item.cantidad}</td>
                  <td className="px-5 py-2.5 text-gray-500">{item.unidad}</td>
                  <td className="px-5 py-2.5 text-right text-gray-700 tabular-nums">{item.pesoKg.toLocaleString('es-CL')}</td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bomStatusStyles[item.estado]}`}>
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50/60 border-t-2 border-gray-200">
                <td colSpan={4} className="px-5 py-2.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Peso total estimado:
                </td>
                <td className="px-5 py-2.5 text-right font-bold text-gray-900 tabular-nums">
                  {bom.reduce((s, i) => s + i.pesoKg * i.cantidad, 0).toLocaleString('es-CL')} kg
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
