import { useState } from 'react';
import { ChevronRight, Printer, MoreHorizontal, MessageSquare, Paperclip, Activity, Lock } from 'lucide-react';
import { ordenes, type PipelineStage, type ModuleId } from '../data/mockData';
import { usePermissions } from '../context/PermissionsContext';
import Pipeline from './ot/Pipeline';
import ComercialTab from './ot/tabs/ComercialTab';
import IngenieriaTab from './ot/tabs/IngenieriaTab';
import LogisticaTab from './ot/tabs/LogisticaTab';
import PlaneamientoTab from './ot/tabs/PlaneamientoTab';
import ProduccionTab from './ot/tabs/ProduccionTab';
import CalidadTab from './ot/tabs/CalidadTab';

interface OTWorkspaceProps {
  otCode: string;
  onBack: () => void;
}

type TabId = 'comercial' | 'ingenieria' | 'logistica' | 'planeamiento' | 'produccion' | 'calidad';

interface TabDef {
  id: TabId;
  label: string;
  module: ModuleId;
}

const tabs: TabDef[] = [
  { id: 'comercial', label: 'Comercial', module: 'compras' },
  { id: 'ingenieria', label: 'Ingeniería', module: 'planeamiento' },
  { id: 'logistica', label: 'Logística', module: 'logistica' },
  { id: 'planeamiento', label: 'Planeamiento', module: 'planeamiento' },
  { id: 'produccion', label: 'Producción', module: 'produccion' },
  { id: 'calidad', label: 'Calidad & Despacho', module: 'produccion' },
];

export default function OTWorkspace({ otCode, onBack }: OTWorkspaceProps) {
  const { can } = usePermissions();
  const [activeTab, setActiveTab] = useState<TabId>('produccion');
  const [currentStage, setCurrentStage] = useState<PipelineStage>('Producción');

  const ot = ordenes.find((o) => o.code === otCode) ?? ordenes[0];

  const visibleTabs = tabs.filter((t) => can(t.module, 'view'));

  const handleStageClick = (stage: PipelineStage) => {
    setCurrentStage(stage);
    const tabMap: Partial<Record<PipelineStage, TabId>> = {
      Comercial: 'comercial',
      Ingeniería: 'ingenieria',
      Logística: 'logistica',
      Planeamiento: 'planeamiento',
      Producción: 'produccion',
      Calidad: 'calidad',
      Despachado: 'calidad',
    };
    const tab = tabMap[stage];
    if (tab && visibleTabs.some((t) => t.id === tab)) setActiveTab(tab);
  };

  const activeTabDef = visibleTabs.find((t) => t.id === activeTab) ?? visibleTabs[0];
  const canEditActive = activeTabDef ? can(activeTabDef.module, 'edit') : false;

  return (
    <div className="animate-fadeIn">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-brand-700 font-medium transition-colors">
          Dashboard
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-400">Órdenes de Trabajo</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-brand-700 font-semibold font-mono">{ot.code}</span>
      </nav>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0 shadow-sm">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 font-mono tracking-tight">{ot.code}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {ot.estado}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  ot.prioridad === 'Alta' ? 'bg-rose-100 text-rose-800' : ot.prioridad === 'Media' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  Prioridad {ot.prioridad}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">
                {ot.proyecto} - <span className="text-gray-500">{ot.cliente}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{ot.site} - {ot.pesoTon} T - {ot.descripcion}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <Printer className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-5 pb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pipeline</span>
            <span className="text-xs text-gray-400">- Etapa actual: <span className="font-semibold text-brand-700">{currentStage}</span></span>
            {!canEditActive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full ml-auto">
                <Lock className="w-3 h-3" />
                Solo lectura en esta etapa
              </span>
            )}
          </div>
          <Pipeline current={currentStage} onStageClick={handleStageClick} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center gap-1 px-3 border-b border-gray-200 overflow-x-auto scrollbar-thin">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-brand-700' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'comercial' && <ComercialTab />}
          {activeTab === 'ingenieria' && <IngenieriaTab />}
          {activeTab === 'logistica' && <LogisticaTab />}
          {activeTab === 'planeamiento' && <PlaneamientoTab />}
          {activeTab === 'produccion' && <ProduccionTab />}
          {activeTab === 'calidad' && <CalidadTab />}
        </div>
      </div>
    </div>
  );
}
