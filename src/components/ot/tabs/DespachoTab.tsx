import { Package, Truck, FileText, CheckSquare } from 'lucide-react';

export default function DespachoTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-rose-600" />
          Cierre y Despacho de OT
        </h3>
        <button className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
          Completar y Cerrar OT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
            <CheckSquare className="w-4 h-4" /> Checklist de Cierre
          </h4>
          <div className="space-y-3">
            {['Control dimensional validado', 'Dossier de calidad firmado', 'Pesaje verificado', 'Guía de remisión emitida'].map((task, i) => (
              <label key={i} className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-brand-600 rounded border-gray-300" defaultChecked={i < 2} />
                <span className="text-sm text-gray-700">{task}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4" /> Datos de Transporte
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Empresa Transportista</label>
              <input type="text" className="w-full text-sm border-gray-300 rounded-md p-2 border" placeholder="Ej. Transportes del Norte" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Destino Final</label>
              <input type="text" className="w-full text-sm border-gray-300 rounded-md p-2 border" defaultValue="Sitio Norte - Antofagasta" />
            </div>
            <button className="w-full mt-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-50 flex justify-center items-center gap-2">
              <FileText className="w-4 h-4" /> Generar Guía de Remisión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
