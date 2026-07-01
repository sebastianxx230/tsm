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
import AlmacenTab from './ot/tabs/AlmacenTab';
import DespachoTab from './ot/tabs/DespachoTab';

interface OTWorkspaceProps { otCode: string; onBack: () => void; }

type TabId = 'comercial' | 'ingenieria' | 'logistica' | 'planeamiento' | 'produccion' | 'calidad' | 'almacen' | 'despacho';
interface TabDef { id: TabId; label: string; module: ModuleId; }

const tabs: TabDef[] = [
  { id: 'comercial', label: 'Comercial', module: 'comercial' },
  { id: 'ingenieria', label: 'Ingeniería', module: 'ingenieria' },
  { id: 'logistica', label: 'Logística', module: 'logistica' },
  { id: 'planeamiento', label: 'Planeamiento', module: 'planeamiento' },
  { id: 'produccion', label: 'Producción', module: 'produccion' },
  { id: 'calidad', label: 'Calidad', module: 'calidad' },
  { id: 'almacen', label: 'Almacén', module: 'almacen' },
  { id: 'despacho', label: 'Despacho', module: 'despacho' },
];

export default function OTWorkspace({ otCode, onBack }: OTWorkspaceProps) {
  const { can } = usePermissions();
  const [activeTab, setActiveTab] = useState<TabId>('produccion');
  const [currentStage, setCurrentStage] = useState<PipelineStage>('Producción');
  const ot = ordenes.find((o) => o.code === otCode) ?? ordenes[0];
  const visibleTabs = tabs.filter((t) => can(t.module, 'view'));

  const handleStageClick = (stage: PipelineStage) => {
    setCurrentStage(stage);
    const tabMap: Record<PipelineStage, TabId> = {
      Comercial: 'comercial', Ingeniería: 'ingenieria', Logística: 'logistica', 
      Planeamiento: 'planeamiento', Producción: 'produccion', Calidad: 'calidad', 
      Almacén: 'almacen', Despachado: 'despacho',
    };
    const tab = tabMap[stage];
    if (visibleTabs.some((t) => t.id === tab)) setActiveTab(tab);
  };

  const activeTabDef = visibleTabs.find((t) => t.id === activeTab) ?? visibleTabs[0];
  const canEditActive = activeTabDef ? can(activeTabDef.module, 'edit') : false;

  return (
    <div className="animate-fadeIn">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-brand-700 font-medium transition-colors">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>Trazabilidad OT</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-700 font-bold font-mono">{ot.code}</span>
      </nav>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card mb-5">
        <div className="flex flex-col lg:flex-row justify-between gap-4 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 font-mono tracking-tight">{ot.code}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">{ot.estado}</span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{ot.proyecto} - {ot.cliente}</p>
            </div>
          </div>
        </div>

        <div className="px-5 pb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">Línea de Trazabilidad OT</span>
            <span className="text-xs text-gray-400">- Etapa: <span className="font-semibold text-brand-700">{currentStage}</span></span>
            {!canEditActive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full ml-auto">
                <Lock className="w-3 h-3" /> Solo lectura
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
              {activeTab === tab.id && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 rounded-full" />}
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
          {activeTab === 'almacen' && <AlmacenTab />}
          {activeTab === 'despacho' && <DespachoTab />}
        </div>
      </div>
    </div>
  );
}
