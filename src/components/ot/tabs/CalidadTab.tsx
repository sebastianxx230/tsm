import { ClipboardCheck, FileCheck2, Camera } from 'lucide-react';
import { checklistCalidad } from '../../../data/mockData';

export default function CalidadTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <ClipboardCheck className="w-5 h-5 text-emerald-600" />
        Control de Calidad y END (Ensayos No Destructivos)
      </h3>

      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">Ítem de Inspección</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Responsable</th>
              <th className="px-4 py-3 font-semibold text-gray-700 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {checklistCalidad.map((item, i) => (
              <tr key={i} className="hover:bg-white transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{item.label}</td>
                <td className="px-4 py-3 text-gray-600">{item.responsable || '-'}</td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <Camera className="w-4 h-4" /> Adjuntar Registro Fotográfico
        </button>
        <button className="flex-1 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <FileCheck2 className="w-4 h-4" /> Generar Dossier Técnico
        </button>
      </div>
    </div>
  );
}
