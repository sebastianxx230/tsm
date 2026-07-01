// ============================================================================
// TSM - Plataforma modular a medida
// Arquitectura de trazabilidad unitaria por OT - 8 Etapas
// ============================================================================



export type ModuleId =

  | 'comercial'

  | 'ingenieria'

  | 'logistica'

  | 'planeamiento'

  | 'produccion'

  | 'calidad'

  | 'almacen'

  | 'despacho'

  | 'clientes'

  | 'reportes'

  | 'configuracion';



export interface ModuleDef {

  id: ModuleId;

  label: string;

  icon: string;

  description: string;

  restricted?: boolean;

}



export const modules: ModuleDef[] = [

  { id: 'comercial', label: 'Comercial', icon: 'ShoppingCart', description: 'Cotizaciones y apertura de OT.' },

  { id: 'ingenieria', label: 'Ingeniería', icon: 'PenTool', description: 'Diseño, despiece y planos.' },

  { id: 'logistica', label: 'Logística', icon: 'Truck', description: 'Tránsito de materiales.' },

  { id: 'planeamiento', label: 'Planeamiento', icon: 'CalendarClock', description: 'Programación de OT y secuencia.' },

  { id: 'produccion', label: 'Producción', icon: 'Factory', description: 'Ejecución en planta y soldadura.' },

  { id: 'calidad', label: 'Calidad', icon: 'CheckCircle', description: 'Inspección dimensional y END.' },

  { id: 'almacen', label: 'Almacén', icon: 'Warehouse', description: 'Cobertura BOM y consumos.' },

  { id: 'despacho', label: 'Despacho', icon: 'Package', description: 'Guías de remisión y cierre de OT.' },

  { id: 'clientes', label: 'Portal Clientes', icon: 'ExternalLink', description: 'Seguimiento externo.' },

  { id: 'reportes', label: 'Reportes Operativos', icon: 'BarChart3', description: 'Indicadores KPI.' },

  { id: 'configuracion', label: 'Configuración', icon: 'ShieldCheck', description: 'Gestión global.', restricted: true },

];



export type RoleId = 'admin' | 'comercial' | 'ingenieria' | 'logistica' | 'planeamiento' | 'produccion' | 'calidad' | 'almacen' | 'despacho' | 'cliente';



export const roles: { id: RoleId; label: string; description: string; color: string }[] = [

  { id: 'admin', label: 'Administrador', description: 'Acceso total a la trazabilidad.', color: 'bg-brand-100 text-brand-800' },

  { id: 'comercial', label: 'Ventas', description: 'Ve etapa Comercial.', color: 'bg-indigo-100 text-indigo-800' },

  { id: 'ingenieria', label: 'Ingeniería', description: 'Ve etapa Ingeniería.', color: 'bg-purple-100 text-purple-800' },

  { id: 'logistica', label: 'Logística', description: 'Ve etapa Logística.', color: 'bg-pink-100 text-pink-800' },

  { id: 'planeamiento', label: 'Planeamiento', description: 'Ve etapa Planeamiento.', color: 'bg-teal-100 text-teal-800' },

  { id: 'produccion', label: 'Producción', description: 'Ve etapa Producción.', color: 'bg-blue-100 text-blue-800' },

  { id: 'calidad', label: 'Calidad', description: 'Ve etapa Calidad.', color: 'bg-emerald-100 text-emerald-800' },

  { id: 'almacen', label: 'Almacén', description: 'Ve etapa Almacén.', color: 'bg-orange-100 text-orange-800' },

  { id: 'despacho', label: 'Despacho', description: 'Ve etapa Despacho.', color: 'bg-rose-100 text-rose-800' },

  { id: 'cliente', label: 'Cliente', description: 'Solo portal de seguimiento.', color: 'bg-amber-100 text-amber-800' },

];



export type Action = 'view' | 'edit' | 'manage';



export const permissions: Record<RoleId, Partial<Record<ModuleId, Action[]>>> = {

  admin: Object.fromEntries(modules.map((m) => [m.id, ['view', 'edit', 'manage'] as Action[]])) as Partial<Record<ModuleId, Action[]>>,

  comercial: { comercial: ['view', 'edit'], reportes: ['view'] },

  ingenieria: { ingenieria: ['view', 'edit'] },

  logistica: { logistica: ['view', 'edit'] },

  planeamiento: { planeamiento: ['view', 'edit'] },

  produccion: { produccion: ['view', 'edit'] },

  calidad: { calidad: ['view', 'edit'] },

  almacen: { almacen: ['view', 'edit'] },

  despacho: { despacho: ['view', 'edit'] },

  cliente: { clientes: ['view'] },

};



export function can(role: RoleId, module: ModuleId, action: Action): boolean {

  const actions = permissions[role]?.[module] ?? [];

  return actions.includes(action);

}



export interface User { id: string; name: string; area: string; role: RoleId; avatarColor: string; }



export const users: User[] = [

  { id: 'u1', name: 'Sebastián Herrera', area: 'Gerencia', role: 'admin', avatarColor: 'from-brand-500 to-brand-700' },

  { id: 'u2', name: 'Marcela Rojas', area: 'Comercial', role: 'comercial', avatarColor: 'from-indigo-500 to-indigo-700' },

  { id: 'u3', name: 'Carlos Muñoz', area: 'Producción', role: 'produccion', avatarColor: 'from-blue-500 to-blue-700' },

  { id: 'u4', name: 'Andrea Pizarro', area: 'Calidad', role: 'calidad', avatarColor: 'from-emerald-500 to-emerald-700' },

  { id: 'u5', name: 'Diego Sanhueza', area: 'Logística', role: 'logistica', avatarColor: 'from-pink-500 to-pink-700' },

  { id: 'u6', name: 'Luis Soto', area: 'Almacén', role: 'almacen', avatarColor: 'from-orange-500 to-orange-700' },

  { id: 'u7', name: 'Rocío Fuentes', area: 'Despacho', role: 'despacho', avatarColor: 'from-rose-500 to-rose-700' },

  { id: 'u8', name: 'Jorge Pérez', area: 'Ingeniería', role: 'ingenieria', avatarColor: 'from-purple-500 to-purple-700' },

];



export const pipelineStages = [

  'Comercial', 'Ingeniería', 'Logística', 'Planeamiento', 'Producción', 'Calidad', 'Almacén', 'Despachado'

] as const;

export type PipelineStage = (typeof pipelineStages)[number];



export const stageOwner: Record<PipelineStage, ModuleId> = {

  Comercial: 'comercial', Ingeniería: 'ingenieria', Logística: 'logistica', Planeamiento: 'planeamiento',

  Producción: 'produccion', Calidad: 'calidad', Almacén: 'almacen', Despachado: 'despacho',

};



export type OTStatus = PipelineStage;

export interface OT { code: string; cliente: string; proyecto: string; site: string; estado: OTStatus; avance: number; fechaEstimada: string; pesoTon: number; prioridad: 'Alta' | 'Media' | 'Baja'; descripcion: string; }



export const ordenes: OT[] = [

  { code: 'OT-2026-071', cliente: 'Minera Los Andes', proyecto: 'Torre Enfriamiento', site: 'Sitio Norte', estado: 'Producción', avance: 60, fechaEstimada: '2026-07-18', pesoTon: 48, prioridad: 'Alta', descripcion: 'Estructura modular' },

  { code: 'OT-2026-072', cliente: 'Constr. Vial S.A.', proyecto: 'Viaducto Ruta 5', site: 'Km 642', estado: 'Ingeniería', avance: 25, fechaEstimada: '2026-08-05', pesoTon: 72, prioridad: 'Media', descripcion: 'Vigas y columnas' },

  { code: 'OT-2026-073', cliente: 'Aceros Pacífico', proyecto: 'Soportería Cinta', site: 'San Antonio', estado: 'Almacén', avance: 90, fechaEstimada: '2026-07-10', pesoTon: 34, prioridad: 'Alta', descripcion: 'Soporte mineral' },

]; 

// ============================================================================
// DATOS COMPLEMENTARIOS PARA LAS PESTAÑAS (BOM, Planos, Calidad)
// ============================================================================

export interface Plano {
  id: string;
  codigo: string;
  descripcion: string;
  version: string;
  estado: 'Aprobado' | 'En Revisión' | 'Rechazado';
  fecha: string;
}

export const planos: Plano[] = [
  { id: 'p1', codigo: 'PL-TSM-001', descripcion: 'Plano General Estructura', version: 'v1.0', estado: 'Aprobado', fecha: '2026-06-15' },
  { id: 'p2', codigo: 'PL-TSM-002', descripcion: 'Detalles de Nodos y Soldadura', version: 'v1.1', estado: 'En Revisión', fecha: '2026-06-18' },
];

export const bom = [
  { id: 'b1', material: 'Tubo red 1/2 x 3.00 mm x 6400', cantidad: 96, unidad: 'pzas', estado: 'Disponible' },
  { id: 'b2', material: 'Perfil W10x49', cantidad: 24, unidad: 'pzas', estado: 'En Tránsito' },
  { id: 'b3', material: 'Plancha ASTM A36 1/2"', cantidad: 18, unidad: 'pzas', estado: 'Disponible' },
];

export const checklistCalidad = [
  { label: 'Inspección visual de soldaduras (VT)', responsable: 'QA/QC', checked: true },
  { label: 'Control dimensional según planos', responsable: 'QA/QC', checked: false },
  { label: 'Ensayo de líquidos penetrantes (PT)', responsable: 'Inspector Nivel II', checked: false },
  { label: 'Medición de espesor de pintura', responsable: 'QA/QC', checked: false },
];
