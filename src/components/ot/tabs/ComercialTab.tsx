import { Upload, FileText, Check, Calendar, Scale, DollarSign, FileCheck } from 'lucide-react';

export default function ComercialTab() {
  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600" />
            Datos Comerciales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">N° de Presupuesto</label>
              <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                PRE-2026-048
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Fecha de Creación</label>
              <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                12 Jun, 2026
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Peso Total (Toneladas)</label>
              <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 gap-2">
                <Scale className="w-3.5 h-3.5 text-gray-400" />
                48 T
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Valor Cotizado</label>
              <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 gap-2">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                $ 38.450.000 CLP
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Condiciones de Pago</label>
              <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                30% anticipo, 60% contra entrega, 10% retención (90 días)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-brand-600" />
            Documentos Comerciales
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Presupuesto PRE-2026-048.pdf', size: '248 KB', date: '12 Jun 2026', uploaded: true },
              { name: 'Orden de Compra Cliente - MLA-OC-3391.pdf', size: '512 KB', date: '18 Jun 2026', uploaded: true },
            ].map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{doc.name}</div>
                  <div className="text-xs text-gray-500">{doc.size} - {doc.date}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Subido
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5 sticky top-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Orden de Compra Cliente</h3>
          <p className="text-xs text-gray-500 mb-4">Arrastra el PDF firmado o haz clic para subir.</p>
          <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-400 hover:bg-brand-50/40 hover:text-brand-600 transition-all group">
            <div className="w-11 h-11 rounded-full bg-gray-100 group-hover:bg-brand-100 flex items-center justify-center transition-colors">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Haz clic o arrastra aquí</span>
            <span className="text-xs text-gray-400">PDF, JPG, PNG hasta 10MB</span>
          </button>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Estado OC</span>
              <span className="font-semibold text-emerald-700">Recibida</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Aprobada por</span>
              <span className="font-semibold text-gray-700">M. Herrera</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Fecha aprobación</span>
              <span className="font-semibold text-gray-700">18 Jun 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
