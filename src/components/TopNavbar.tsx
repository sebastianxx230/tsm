import { useState } from 'react';
import { Search, Bell, ChevronDown, HelpCircle, Users } from 'lucide-react';
import { users, roles, type RoleId } from '../data/mockData';
import { usePermissions } from '../context/PermissionsContext';

interface TopNavbarProps {
  moduleLabel: string;
}

export default function TopNavbar({ moduleLabel }: TopNavbarProps) {
  const { currentUser, setCurrentUserId } = usePermissions();
  const [open, setOpen] = useState(false);
  const roleDef = roles.find((r) => r.id === (currentUser.role as RoleId))!;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:inline">Módulo:</span>
        <span className="text-sm font-semibold text-brand-700">{moduleLabel}</span>
      </div>

      <div className="relative flex-1 max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar OTs, planos, materiales..."
          className="w-full h-9 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:bg-white transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-1">
        <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <HelpCircle className="w-[18px] h-[18px]" />
        </button>

        <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 h-9 pl-1.5 pr-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${currentUser.avatarColor} flex items-center justify-center text-white text-xs font-semibold shadow-sm`}>
              {currentUser.name[0]}
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-xs font-semibold text-gray-900">{currentUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-gray-500">{roleDef.label}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-11 w-72 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Cambiar de usuario (simular rol)</span>
                </div>
                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {users.map((u) => {
                    const r = roles.find((rl) => rl.id === (u.role as RoleId))!;
                    const isActive = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          setCurrentUserId(u.id);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${isActive ? 'bg-brand-50/50' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                          {u.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{u.name}</div>
                          <div className="text-[11px] text-gray-500">{u.area}</div>
                        </div>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${r.color} shrink-0`}>
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
                  <p className="text-[11px] text-gray-500 leading-snug">
                    La vista y acciones se adaptan al rol seleccionado. Permisos por módulo y acción.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
