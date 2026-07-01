import { ArrowRight, Activity } from 'lucide-react';
import { ordenes } from '../data/mockData';

interface DashboardProps {
  onSelectOT: (code: string) => void;
  onCreateOT: () => void;
}

export default function Dashboard({ onSelectOT, onCreateOT }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Trazabilidad de Órdenes de Trabajo</h1>
            <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-200 shadow-sm flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Seguimiento unitario por OT
            </span>
          </div>
          <p className="text-gray-500 mt-1 text-sm">Monitoreo en 8 etapas: Comercial {'>'} Ingeniería {'>'} Logística {'>'} Planeamiento {'>'} Producción {'>'} Calidad {'>'} Almacén {'>'} Despacho</p>
        </div>
        <button onClick={onCreateOT} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          + Nueva OT
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Código OT</th>
                <th className="p-4 font-semibold">Proyecto / Cliente</th>
                <th className="p-4 font-semibold">Etapa Actual</th>
                <th className="p-4 font-semibold text-center">Avance</th>
                <th className="p-4 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {ordenes.map((ot) => (
                <tr key={ot.code} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onSelectOT(ot.code)}>
                  <td className="p-4 font-mono font-medium text-brand-700">{ot.code}</td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{ot.proyecto}</p>
                    <p className="text-gray-500 text-xs">{ot.cliente}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {ot.estado}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${ot.avance}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium w-8">{ot.avance}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-brand-600 transition-colors">
                      <ArrowRight className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
