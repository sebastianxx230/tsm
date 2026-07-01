import {
  CalendarClock,
  Factory,
  Truck,
  Warehouse,
  ShoppingCart,
  ExternalLink,
  BarChart3,
  ShieldCheck,
  Hexagon,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { modules, type ModuleId, roles, type RoleId } from '../data/mockData';
import { usePermissions } from '../context/PermissionsContext';

const iconMap: Record<string, LucideIcon> = {
  CalendarClock,
  Factory,
  Truck,
  Warehouse,
  ShoppingCart,
  ExternalLink,
  BarChart3,
  ShieldCheck,
};

interface SidebarProps {
  active: ModuleId;
  onNavigate: (module: ModuleId) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  const { currentUser, can } = usePermissions();
  const roleDef = roles.find((r) => r.id === (currentUser.role as RoleId))!;

  const visibleModules = modules.filter((m) => can(m.id, 'view'));

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-gray-200">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
          <Hexagon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-gray-900 text-sm tracking-tight">TSM</div>
          <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Top Solution Metal</div>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-gray-50">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentUser.avatarColor} flex items-center justify-center text-white text-xs font-semibold shadow-sm shrink-0`}>
            {currentUser.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-gray-900 truncate">{currentUser.name}</div>
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${roleDef.color}`}>
                {roleDef.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="px-3 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Módulos del Sistema</p>
        {visibleModules.map((m) => {
          const Icon = iconMap[m.icon] ?? Hexagon;
          const isActive = active === m.id;
          const hasView = can(m.id, 'view');
          if (!hasView) return null;
          return (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'}`}
                strokeWidth={2}
              />
              <span className="flex-1 text-left">{m.label}</span>
              {m.restricted && (
                <Lock className="w-3 h-3 text-amber-500" />
              )}
            </button>
          );
        })}

        {visibleModules.length === 0 && (
          <p className="px-3 py-4 text-xs text-gray-400 text-center">
            No tienes módulos visibles con tu rol actual.
          </p>
        )}
      </nav>

      <div className="p-3 border-t border-gray-200">
        <div className="rounded-lg bg-gradient-to-br from-brand-50 to-teal-50 p-3 border border-brand-100">
          <p className="text-xs font-semibold text-brand-700 mb-0.5">Plataforma Modular TSM</p>
          <p className="text-[11px] text-gray-500 leading-snug">
            {visibleModules.length} módulos habilitados para tu rol. Permisos por área y acción.
          </p>
        </div>
      </div>
    </aside>
  );
}
