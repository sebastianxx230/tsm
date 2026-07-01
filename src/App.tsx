import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './components/Dashboard';
import OTWorkspace from './components/OTWorkspace';
import ClientPortal from './components/ClientPortal';
import ModuleView from './components/ModuleView';
import { PermissionsProvider, usePermissions } from './context/PermissionsContext';
import { modules, type ModuleId } from './data/mockData';

type View =
  | { name: 'module'; module: ModuleId }
  | { name: 'workspace'; otCode: string }
  | { name: 'client' };

function AppInner() {
  const { can, currentUser } = usePermissions();
  const [view, setView] = useState<View>({ name: 'module', module: 'produccion' });

  // Si el rol actual no puede ver el módulo activo, redirige al primer módulo visible
  useEffect(() => {
    if (view.name === 'module' && !can(view.module, 'view')) {
      const firstVisible = modules.find((m) => can(m.id, 'view'));
      if (firstVisible) setView({ name: 'module', module: firstVisible.id });
    }
  }, [currentUser, view, can]);

  const handleNavigate = (module: ModuleId) => {
    if (!can(module, 'view')) return;
    setView({ name: 'module', module });
  };

  const handleSelectOT = (code: string) => {
    setView({ name: 'workspace', otCode: code });
  };

  const handleBackToModule = () => {
    setView({ name: 'module', module: 'produccion' });
  };

  const handleClientPortal = () => {
    setView({ name: 'client' });
  };

  if (view.name === 'client') {
    return <ClientPortal onBack={() => setView({ name: 'module', module: 'clientes' })} />;
  }

  const activeModule = view.name === 'module' ? view.module : 'produccion';
  const moduleDef = modules.find((m) => m.id === activeModule)!;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={activeModule} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar moduleLabel={moduleDef.label} />
        <main className="flex-1 p-6 overflow-x-hidden">
          {view.name === 'module' && activeModule === 'produccion' && (
            <Dashboard onSelectOT={handleSelectOT} onCreateOT={() => handleSelectOT('OT-2026-071')} />
          )}
          {view.name === 'module' && activeModule !== 'produccion' && (
            <ModuleView
              module={activeModule}
              onSelectOT={handleSelectOT}
              onOpenClientPortal={handleClientPortal}
            />
          )}
          {view.name === 'workspace' && (
            <OTWorkspace otCode={view.otCode} onBack={handleBackToModule} />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PermissionsProvider>
      <AppInner />
    </PermissionsProvider>
  );
}
