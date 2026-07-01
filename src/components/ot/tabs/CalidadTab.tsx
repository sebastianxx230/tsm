import { Check, FileText, ClipboardCheck, FlaskConical, FileCheck, Download, Lock } from 'lucide-react';
import { useState } from 'react';
import { checklistCalidad } from '../../../data/mockData';
import { usePermissions } from '../../../context/PermissionsContext';

export default function CalidadTab() {
  const { can } = usePermissions();
  const canEdit = can('produccion', 'edit');
  const [items, setItems] = useState(checklistCalidad);
  const completed = items.filter((i) => i.checked).length;

  const toggle = (idx: number) => {
    if (!canEdit) return;
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, checked: !it.checked } : it)));
  };

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-brand-600" />
              <h3 className="text-sm font-semibold text-gray-900">Checklist de Calidad</h3>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {completed}/{items.length} completados
            </span>
          </div>

          <div className="mb-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(completed / items.length) * 100}%` }}
            />
          </div>

          <div className="space-y-1.5">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggle(idx)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    item.checked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300 group-hover:border-brand-400'
                  }`}
                >
                  {item.checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${item.checked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {item.label}
                  </div>
                  {item.responsable && (
                    <div className="text-xs text-gray-400">Responsable: {item.responsable}</div>
                  )}
                </div>
                {item.checked && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    Aprobado
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-brand-600" />
            Ensayos No Destructivos (END)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Tintes Penetrantes</span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">En Curso</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">12 de 20 soldaduras inspeccionadas</div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-3/5 rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Inspección Dimensional</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Aprobado</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">Tolerancia ±2mm - 100% conforme</div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5 sticky top-4">
          <div className="flex items-center gap-2 mb-1">
            <FileCheck className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Documentación de Despacho</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">Genera el dossier final y la guía de remisión para el cliente.</p>

          <div className="space-y-2 mb-4">
            {[
              { name: 'Certificado de Calidad', icon: FileText, ready: true },
              { name: 'Registro Fotográfico', icon: FileText, ready: true },
              { name: 'Protocolo de Galvanizado', icon: FileText, ready: false },
              { name: 'Guía de Remisión', icon: FileText, ready: false },
            ].map((doc) => {
              const Icon = doc.icon;
              return (
                <div key={doc.name} className="flex items-center gap-2.5 p-2.5 border border-gray-200 rounded-lg">
                  <Icon className={`w-4 h-4 ${doc.ready ? 'text-emerald-600' : 'text-gray-300'}`} />
                  <span className={`text-xs font-medium flex-1 ${doc.ready ? 'text-gray-900' : 'text-gray-400'}`}>
                    {doc.name}
                  </span>
                  {doc.ready ? (
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium">Pendiente</span>
                  )}
                </div>
              );
            })}
          </div>

          {canEdit ? (
            <button className="w-full flex items-center justify-center gap-2 h-10 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Generar Dossier y Guía de Remisión
            </button>
          ) : (
            <button disabled className="w-full flex items-center justify-center gap-2 h-10 bg-gray-100 text-gray-400 text-sm font-semibold rounded-lg cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Sin permisos de edición
            </button>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progreso de Liberación</span>
              <span className="font-semibold text-gray-700">{Math.round((completed / items.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-500 transition-all duration-500"
                style={{ width: `${(completed / items.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
