import { useState } from 'react';
import {
  Warehouse,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Plus,
  AlertTriangle,
  Lock,
  Users,
  KeyRound,
  Settings,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  stock,
  ordenesCompra,
  reportesKPIs,
  users,
  roles,
  permissions,
  type ModuleId,
  type RoleId,
  type User,
  type Action,
} from '../data/mockData';
import { usePermissions } from '../context/PermissionsContext';

interface ModuleViewProps {
  module: ModuleId;
  onSelectOT: (code: string) => void;
  onOpenClientPortal: () => void;
}

const moduleMeta: Record<ModuleId, { title: string; subtitle: string }> = {
  planeamiento: { title: 'Planeamiento', subtitle: 'Programación de OT y carga de planta' },
  produccion: { title: 'Producción', subtitle: 'Ejecución de procesos en planta' },
  logistica: { title: 'Logística', subtitle: 'Despachos y transporte a obra' },
  almacen: { title: 'Almacén', subtitle: 'Stock, recepciones y consumo de materiales' },
  compras: { title: 'Compras', subtitle: 'Órdenes de compra y abastecimiento' },
  clientes: { title: 'Portal de Clientes', subtitle: 'Seguimiento externo de OT' },
  reportes: { title: 'Reportes Operativos', subtitle: 'Indicadores de planta y productividad' },
  configuracion: { title: 'Configuración y Seguridad', subtitle: 'Usuarios, roles y permisos' },
};

export default function ModuleView({ module, onSelectOT, onOpenClientPortal }: ModuleViewProps) {
  const { can, currentUser } = usePermissions();
  const meta = moduleMeta[module];

  if (module === 'clientes') {
    return (
      <div className="animate-fadeIn">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <div className="bg-white rounded-xl border border-gray-200 shadow-card p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Portal de Seguimiento de Clientes</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            Vista externa y limpia para que tus clientes sigan el avance de sus OT en tiempo real, sin acceso a datos internos.
          </p>
          <button
            onClick={onOpenClientPortal}
            className="inline-flex items-center gap-2 h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Abrir Portal Cliente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Header title={meta.title} subtitle={meta.subtitle} />
      {module === 'almacen' && <AlmacenContent canEdit={can('almacen', 'edit')} />}
      {module === 'compras' && <ComprasContent canEdit={can('compras', 'edit')} onSelectOT={onSelectOT} />}
      {module === 'reportes' && <ReportesContent />}
      {module === 'configuracion' && <ConfiguracionContent canManage={can('configuracion', 'manage')} currentUser={currentUser} />}
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Almacén
// ---------------------------------------------------------------------------
function AlmacenContent({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Ítems en stock', value: String(stock.length), color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Bajo mínimo', value: String(stock.filter((s) => s.stock < s.minimo).length), color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Ubicaciones activas', value: '12', color: 'text-teal-600', bg: 'bg-teal-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <Warehouse className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Inventario de Almacén</h3>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Recepción
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Código</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Descripción</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Stock</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Mínimo</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Ubicación</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stock.map((s) => {
                const bajo = s.stock < s.minimo;
                return (
                  <tr key={s.codigo} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-2.5 font-mono text-[13px] font-semibold text-gray-800">{s.codigo}</td>
                    <td className="px-5 py-2.5 text-gray-900 font-medium">{s.descripcion}</td>
                    <td className="px-5 py-2.5 text-right text-gray-700 tabular-nums">{s.stock} {s.unidad}</td>
                    <td className="px-5 py-2.5 text-right text-gray-500 tabular-nums">{s.minimo}</td>
                    <td className="px-5 py-2.5 text-gray-600 font-mono text-xs">{s.ubicacion}</td>
                    <td className="px-5 py-2.5">
                      {bajo ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          <AlertTriangle className="w-3 h-3" />
                          Bajo mínimo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Compras
// ---------------------------------------------------------------------------
function ComprasContent({ canEdit, onSelectOT }: { canEdit: boolean; onSelectOT: (c: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'OCs activas', value: String(ordenesCompra.length), color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'En tránsito', value: String(ordenesCompra.filter((o) => o.estado === 'En Tránsito').length), color: 'text-blue-600', bg: 'bg-blue-50' },
          {
            label: 'Monto comprometido',
            value: '$ ' + (ordenesCompra.reduce((s, o) => s + o.monto, 0) / 1_000_000).toFixed(1) + 'M',
            color: 'text-teal-600',
            bg: 'bg-teal-50',
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <ShoppingCart className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-semibold text-gray-900">Órdenes de Compra</h3>
          </div>
          {canEdit && (
            <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Nueva OC
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">OC</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Material</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Proveedor</th>
                <th className="text-right font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Monto</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Llegada</th>
                <th className="text-left font-semibold text-gray-600 px-5 py-2.5 text-xs uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenesCompra.map((o) => (
                <tr key={o.oc} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-2.5 font-mono text-[13px] font-semibold text-brand-700">{o.oc}</td>
                  <td className="px-5 py-2.5 text-gray-900 font-medium">{o.material}</td>
                  <td className="px-5 py-2.5 text-gray-700">{o.proveedor}</td>
                  <td className="px-5 py-2.5 text-right text-gray-700 tabular-nums">$ {o.monto.toLocaleString('es-CL')}</td>
                  <td className="px-5 py-2.5 text-gray-600">{new Date(o.fechaLlegada).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}</td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      o.estado === 'Recibido' ? 'bg-emerald-100 text-emerald-800' : o.estado === 'En Tránsito' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {o.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">OTs que requieren abastecimiento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['OT-2026-071', 'OT-2026-072'].map((code) => (
            <button
              key={code}
              onClick={() => onSelectOT(code)}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50/30 transition-colors text-left"
            >
              <div>
                <div className="font-mono text-sm font-semibold text-brand-700">{code}</div>
                <div className="text-xs text-gray-500">Materiales por confirmar</div>
              </div>
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Pendiente</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reportes
// ---------------------------------------------------------------------------
function ReportesContent() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportesKPIs.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-gray-500">{k.label}</span>
              {k.positiva ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{k.valor}</div>
            <div className={`text-[11px] font-medium mt-1.5 ${k.positiva ? 'text-emerald-600' : 'text-rose-600'}`}>
              {k.tendencia}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-brand-600" />
          <h3 className="text-sm font-semibold text-gray-900">Tonelaje despachado - últimos 6 meses</h3>
        </div>
        <div className="flex items-end gap-3 h-48">
          {[
            { m: 'Feb', v: 142 },
            { m: 'Mar', v: 168 },
            { m: 'Abr', v: 154 },
            { m: 'May', v: 198 },
            { m: 'Jun', v: 176 },
            { m: 'Jul', v: 186 },
          ].map((b) => (
            <div key={b.m} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-teal-400 transition-all duration-500 hover:from-brand-600 hover:to-teal-500"
                  style={{ height: `${(b.v / 200) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-500 font-medium">{b.m}</span>
              <span className="text-[10px] text-gray-400">{b.v}T</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Configuración y Seguridad (zona restringida)
// ---------------------------------------------------------------------------
function ConfiguracionContent({ canManage, currentUser }: { canManage: boolean; currentUser: User }) {
  const [tab, setTab] = useState<'usuarios' | 'roles' | 'parametros'>('usuarios');

  if (!canManage && currentUser.role !== 'admin') {
    return (
      <div className="bg-white rounded-xl border border-amber-200 shadow-card p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Zona Restringida</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Tu rol no tiene permisos de gestión sobre Configuración y Seguridad. Contacta al administrador del sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
        <Lock className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800">
          <span className="font-semibold">Zona restringida:</span> solo administradores pueden gestionar usuarios, roles y permisos.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="flex items-center gap-1 px-3 border-b border-gray-200">
          {[
            { id: 'usuarios' as const, label: 'Usuarios', icon: Users },
            { id: 'roles' as const, label: 'Roles y Permisos', icon: KeyRound },
            { id: 'parametros' as const, label: 'Parámetros', icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id ? 'text-brand-700' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {tab === t.id && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 rounded-full" />}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          {tab === 'usuarios' && (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="text-left font-semibold text-gray-600 px-4 py-2.5 text-xs uppercase tracking-wider">Usuario</th>
                    <th className="text-left font-semibold text-gray-600 px-4 py-2.5 text-xs uppercase tracking-wider">Área</th>
                    <th className="text-left font-semibold text-gray-600 px-4 py-2.5 text-xs uppercase tracking-wider">Rol</th>
                    <th className="text-left font-semibold text-gray-600 px-4 py-2.5 text-xs uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => {
                    const r = roles.find((rl) => rl.id === (u.role as RoleId))!;
                    return (
                      <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white text-xs font-semibold`}>
                              {u.name[0]}
                            </div>
                            <span className="text-gray-900 font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{u.area}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.color}`}>
                            {r.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Activo
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'roles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((r) => (
                <div key={r.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.color}`}>
                      {r.label}
                    </span>
                    <KeyRound className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500 leading-snug mb-3">{r.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {(['view', 'edit', 'manage'] as const).map((a) => {
                      const rolePerms = permissions[r.id as RoleId] ?? {};
                      const count = Object.values(rolePerms).filter((acts: Action[]) => acts.includes(a)).length;
                      return (
                        <span key={a} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {a}: {count} módulos
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'parametros' && (
            <div className="space-y-3">
              {[
                { label: 'Tolerancia dimensional por defecto', value: '± 2 mm' },
                { label: 'Horas de jornada productiva', value: '8 h' },
                { label: 'Días hábiles de planta', value: 'Lun - Vie' },
                { label: 'Alerta de stock bajo automática', value: 'Activada' },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">{p.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{p.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

