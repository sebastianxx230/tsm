// ============================================================================
// TSM - Plataforma modular a medida
// Arquitectura de módulos, roles y permisos definida por el negocio
// ============================================================================

// ---------------------------------------------------------------------------
// Módulos del sistema (navegación principal - representan el negocio real)
// ---------------------------------------------------------------------------
export type ModuleId =
  | 'planeamiento'
  | 'produccion'
  | 'logistica'
  | 'almacen'
  | 'compras'
  | 'clientes'
  | 'reportes'
  | 'configuracion';

export interface ModuleDef {
  id: ModuleId;
  label: string;
  icon: string; // lucide icon name
  description: string;
  restricted?: boolean; // zona restringida
}

export const modules: ModuleDef[] = [
  {
    id: 'planeamiento',
    label: 'Planeamiento',
    icon: 'CalendarClock',
    description: 'Programación de OT, secuencia de fabricación y carga de planta.',
  },
  {
    id: 'produccion',
    label: 'Producción',
    icon: 'Factory',
    description: 'Ejecución de procesos en planta y avance de planos.',
  },
  {
    id: 'logistica',
    label: 'Logística',
    icon: 'Truck',
    description: 'Tránsito de materiales, despachos y transporte a obra.',
  },
  {
    id: 'almacen',
    label: 'Almacén',
    icon: 'Warehouse',
    description: 'Stock, recepciones y consumo de materiales.',
  },
  {
    id: 'compras',
    label: 'Compras',
    icon: 'ShoppingCart',
    description: 'Órdenes de compra a proveedores y abastecimiento.',
  },
  {
    id: 'clientes',
    label: 'Portal Clientes',
    icon: 'ExternalLink',
    description: 'Seguimiento externo de OT para clientes.',
  },
  {
    id: 'reportes',
    label: 'Reportes Operativos',
    icon: 'BarChart3',
    description: 'Indicadores de planta, tonelaje y productividad.',
  },
  {
    id: 'configuracion',
    label: 'Configuración y Seguridad',
    icon: 'ShieldCheck',
    description: 'Usuarios, roles, permisos y parámetros globales.',
    restricted: true,
  },
];

// ---------------------------------------------------------------------------
// Roles y permisos
// ---------------------------------------------------------------------------
export type RoleId = 'admin' | 'jefe_produccion' | 'operador' | 'lector' | 'cliente';

export interface RoleDef {
  id: RoleId;
  label: string;
  description: string;
  color: string; // tailwind classes for badge
}

export const roles: RoleDef[] = [
  {
    id: 'admin',
    label: 'Administrador',
    description: 'Acceso total. Gestiona usuarios, permisos y configuración global.',
    color: 'bg-brand-100 text-brand-800',
  },
  {
    id: 'jefe_produccion',
    label: 'Jefe de Producción',
    description: 'Responsable de área. Controla Planeamiento y Producción.',
    color: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'operador',
    label: 'Operador',
    description: 'Ejecuta y consulta avances en su proceso asignado.',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'lector',
    label: 'Solo Lectura',
    description: 'Visualiza módulos sin permisos de edición.',
    color: 'bg-gray-100 text-gray-700',
  },
  {
    id: 'cliente',
    label: 'Cliente',
    description: 'Acceso únicamente al portal de seguimiento externo.',
    color: 'bg-amber-100 text-amber-800',
  },
];

// Permisos por módulo y acción: can(moduleId, action)
export type Action = 'view' | 'edit' | 'manage';

// Matriz de permisos: roleId -> moduleId -> acciones permitidas
export const permissions: Record<RoleId, Partial<Record<ModuleId, Action[]>>> = {
  admin: Object.fromEntries(
    modules.map((m) => [m.id, ['view', 'edit', 'manage'] as Action[]])
  ) as Partial<Record<ModuleId, Action[]>>,
  jefe_produccion: {
    planeamiento: ['view', 'edit', 'manage'],
    produccion: ['view', 'edit', 'manage'],
    logistica: ['view', 'edit'],
    almacen: ['view'],
    compras: ['view'],
    reportes: ['view', 'edit'],
    configuracion: ['view'],
    clientes: ['view'],
  },
  operador: {
    planeamiento: ['view'],
    produccion: ['view', 'edit'],
    logistica: ['view'],
    almacen: ['view'],
    compras: [],
    reportes: ['view'],
    configuracion: [],
    clientes: [],
  },
  lector: {
    planeamiento: ['view'],
    produccion: ['view'],
    logistica: ['view'],
    almacen: ['view'],
    compras: ['view'],
    reportes: ['view'],
    configuracion: [],
    clientes: ['view'],
  },
  cliente: {
    clientes: ['view'],
    planeamiento: [],
    produccion: [],
    logistica: [],
    almacen: [],
    compras: [],
    reportes: [],
    configuracion: [],
  },
};

export function can(role: RoleId, module: ModuleId, action: Action): boolean {
  const actions = permissions[role]?.[module] ?? [];
  return actions.includes(action);
}

// Usuarios del sistema
export interface User {
  id: string;
  name: string;
  area: string;
  role: RoleId;
  avatarColor: string;
}

export const users: User[] = [
  { id: 'u1', name: 'Sebastián Herrera', area: 'Gerencia', role: 'admin', avatarColor: 'from-brand-500 to-brand-700' },
  { id: 'u2', name: 'Marcela Rojas', area: 'Producción', role: 'jefe_produccion', avatarColor: 'from-teal-500 to-teal-700' },
  { id: 'u3', name: 'Carlos Muñoz', area: 'Producción', role: 'operador', avatarColor: 'from-blue-500 to-blue-700' },
  { id: 'u4', name: 'Rocío Fuentes', area: 'Producción', role: 'operador', avatarColor: 'from-amber-500 to-amber-700' },
  { id: 'u5', name: 'Diego Sanhueza', area: 'Logística', role: 'operador', avatarColor: 'from-rose-500 to-rose-700' },
  { id: 'u6', name: 'Andrea Pizarro', area: 'Calidad', role: 'lector', avatarColor: 'from-emerald-500 to-emerald-700' },
];

// ---------------------------------------------------------------------------
// Pipeline de OT - etapas separadas (Logística y Planeamiento son distintos)
// ---------------------------------------------------------------------------
export const pipelineStages = [
  'Comercial',
  'Ingeniería',
  'Logística',
  'Planeamiento',
  'Producción',
  'Calidad',
  'Despachado',
] as const;

export type PipelineStage = (typeof pipelineStages)[number];

// Etapa responsable por módulo (qué módulo opera cada etapa)
export const stageOwner: Record<PipelineStage, ModuleId> = {
  Comercial: 'compras',
  Ingeniería: 'planeamiento',
  Logística: 'logistica',
  Planeamiento: 'planeamiento',
  Producción: 'produccion',
  Calidad: 'produccion',
  Despachado: 'logistica',
};

// ---------------------------------------------------------------------------
// Órdenes de Trabajo
// ---------------------------------------------------------------------------
export type OTStatus = PipelineStage;

export interface OT {
  code: string;
  cliente: string;
  proyecto: string;
  site: string;
  estado: OTStatus;
  avance: number;
  fechaEstimada: string;
  pesoTon: number;
  prioridad: 'Alta' | 'Media' | 'Baja';
  descripcion: string;
}

export const ordenes: OT[] = [
  {
    code: 'OT-2026-071',
    cliente: 'Minera Los Andes',
    proyecto: 'Torre de Enfriamiento',
    site: 'Sitio Norte - Antofagasta',
    estado: 'Producción',
    avance: 60,
    fechaEstimada: '2026-07-18',
    pesoTon: 48,
    prioridad: 'Alta',
    descripcion: 'Estructura modular para torre de enfriamiento de 12m de altura.',
  },
  {
    code: 'OT-2026-072',
    cliente: 'Constructora Vial S.A.',
    proyecto: 'Viaducto Ruta 5',
    site: 'Km 642 - Coquimbo',
    estado: 'Ingeniería',
    avance: 25,
    fechaEstimada: '2026-08-05',
    pesoTon: 72,
    prioridad: 'Media',
    descripcion: 'Vigas y columnas para viaducto de 240m.',
  },
  {
    code: 'OT-2026-073',
    cliente: 'Aceros del Pacífico',
    proyecto: 'Soportería Cinta Transportadora',
    site: 'Planta Puerto - San Antonio',
    estado: 'Producción',
    avance: 85,
    fechaEstimada: '2026-07-10',
    pesoTon: 34,
    prioridad: 'Alta',
    descripcion: 'Estructura de soporte para cinta transportadora de mineral.',
  },
  {
    code: 'OT-2026-074',
    cliente: 'Pesquera Altamar',
    proyecto: 'Plataforma Procesamiento',
    site: 'Caleta - Caldera',
    estado: 'Calidad',
    avance: 95,
    fechaEstimada: '2026-07-08',
    pesoTon: 28,
    prioridad: 'Media',
    descripcion: 'Plataforma de acero inoxidable para línea de proceso.',
  },
  {
    code: 'OT-2026-075',
    cliente: 'Constructora Vial S.A.',
    proyecto: 'Pasarela Peatonal',
    site: 'Av. Costanera - La Serena',
    estado: 'Logística',
    avance: 40,
    fechaEstimada: '2026-07-22',
    pesoTon: 12,
    prioridad: 'Baja',
    descripcion: 'Pasarela metálica arquitectónica de 38m.',
  },
  {
    code: 'OT-2026-076',
    cliente: 'Minera Los Andes',
    proyecto: 'Ducto de Ventilación',
    site: 'Nivel 4 - Mina',
    estado: 'Planeamiento',
    avance: 10,
    fechaEstimada: '2026-08-15',
    pesoTon: 10,
    prioridad: 'Media',
    descripcion: 'Ductos de ventilación para galería subterránea.',
  },
];

// ---------------------------------------------------------------------------
// Planos (Ingeniería)
// ---------------------------------------------------------------------------
export interface Plano {
  id: string;
  rev: string;
  dibujante: string;
  estado: 'Aprobado' | 'En Revisión' | 'Pendiente' | 'Obsoleto';
}

export const planos: Plano[] = [
  { id: 'PL-071-001', rev: 'B', dibujante: 'M. Rojas', estado: 'Aprobado' },
  { id: 'PL-071-002', rev: 'A', dibujante: 'C. Díaz', estado: 'Aprobado' },
  { id: 'PL-071-003', rev: 'C', dibujante: 'M. Rojas', estado: 'En Revisión' },
  { id: 'PL-071-004', rev: 'A', dibujante: 'J. Pérez', estado: 'Pendiente' },
  { id: 'PL-071-005', rev: 'B', dibujante: 'C. Díaz', estado: 'Aprobado' },
  { id: 'PL-071-006', rev: 'A', dibujante: 'J. Pérez', estado: 'Obsoleto' },
];

// ---------------------------------------------------------------------------
// BOM / Materiales
// ---------------------------------------------------------------------------
export interface BOMItem {
  codigo: string;
  descripcion: string;
  cantidad: number;
  unidad: string;
  pesoKg: number;
  estado: 'Disponible' | 'En Tránsito' | 'Por Solicitar';
}

export const bom: BOMItem[] = [
  { codigo: 'P-W10x49', descripcion: 'Perfil W10x49', cantidad: 24, unidad: 'und', pesoKg: 294, estado: 'Disponible' },
  { codigo: 'PL-A36-12', descripcion: 'Plancha ASTM A36 1/2"', cantidad: 18, unidad: 'plancha', pesoKg: 480, estado: 'Disponible' },
  { codigo: 'TR-12-3-6400', descripcion: 'Tubo red 1/2 x 3.00 mm x 6400', cantidad: 96, unidad: 'und', pesoKg: 8.4, estado: 'En Tránsito' },
  { codigo: 'L-50x50x5', descripcion: 'Angulo L 50x50x5mm L=6000', cantidad: 40, unidad: 'und', pesoKg: 22.4, estado: 'Disponible' },
  { codigo: 'PL-A36-38', descripcion: 'Plancha ASTM A36 3/8"', cantidad: 12, unidad: 'plancha', pesoKg: 360, estado: 'Por Solicitar' },
];

// ---------------------------------------------------------------------------
// Órdenes de Compra (Compras / Abastecimiento)
// ---------------------------------------------------------------------------
export interface OrdenCompra {
  oc: string;
  material: string;
  proveedor: string;
  fechaLlegada: string;
  estado: 'En Tránsito' | 'Recibido' | 'Por Confirmar';
  monto: number;
}

export const ordenesCompra: OrdenCompra[] = [
  { oc: 'OC-2026-118', material: 'Tubo red 1/2 x 3.00 mm x 6400', proveedor: 'Comercial Acero Ltda.', fechaLlegada: '2026-07-04', estado: 'En Tránsito', monto: 2840000 },
  { oc: 'OC-2026-119', material: 'Plancha ASTM A36 3/8"', proveedor: 'Aceros Nacionales', fechaLlegada: '2026-07-09', estado: 'Por Confirmar', monto: 4120000 },
  { oc: 'OC-2026-120', material: 'Electrodos E7018', proveedor: 'Soldaduras del Sur', fechaLlegada: '2026-07-03', estado: 'En Tránsito', monto: 680000 },
  { oc: 'OC-2026-115', material: 'Perfil W10x49', proveedor: 'Aceros Nacionales', fechaLlegada: '2026-06-28', estado: 'Recibido', monto: 8950000 },
];

// ---------------------------------------------------------------------------
// Despachos (Logística - transporte a obra)
// ---------------------------------------------------------------------------
export interface Despacho {
  id: string;
  ot: string;
  destino: string;
  transporte: 'Camión' | 'Plataforma' | 'Container';
  fecha: string;
  estado: 'Programado' | 'En Ruta' | 'Entregado';
  pesoTon: number;
}

export const despachos: Despacho[] = [
  { id: 'DES-014', ot: 'OT-2026-073', destino: 'Planta Puerto - San Antonio', transporte: 'Camión', fecha: '2026-07-10', estado: 'Programado', pesoTon: 34 },
  { id: 'DES-015', ot: 'OT-2026-074', destino: 'Caleta - Caldera', transporte: 'Plataforma', fecha: '2026-07-08', estado: 'Programado', pesoTon: 28 },
  { id: 'DES-016', ot: 'OT-2026-071', destino: 'Sitio Norte - Antofagasta', transporte: 'Camión', fecha: '2026-07-18', estado: 'Programado', pesoTon: 48 },
];

// ---------------------------------------------------------------------------
// Stock de almacén
// ---------------------------------------------------------------------------
export interface StockItem {
  codigo: string;
  descripcion: string;
  stock: number;
  unidad: string;
  minimo: number;
  ubicacion: string;
}

export const stock: StockItem[] = [
  { codigo: 'P-W10x49', descripcion: 'Perfil W10x49', stock: 24, unidad: 'und', minimo: 10, ubicacion: 'A-12' },
  { codigo: 'PL-A36-12', descripcion: 'Plancha ASTM A36 1/2"', stock: 18, unidad: 'plancha', minimo: 8, ubicacion: 'B-04' },
  { codigo: 'L-50x50x5', descripcion: 'Angulo L 50x50x5mm', stock: 40, unidad: 'und', minimo: 20, ubicacion: 'A-08' },
  { codigo: 'E-7018', descripcion: 'Electrodos E7018', stock: 6, unidad: 'caja', minimo: 12, ubicacion: 'C-02' },
  { codigo: 'PINT-EPOXY', descripcion: 'Pintura Epóxica Gris', stock: 14, unidad: 'gal', minimo: 8, ubicacion: 'D-01' },
];

// ---------------------------------------------------------------------------
// Producción
// ---------------------------------------------------------------------------
export interface ProcesoProduccion {
  nombre: string;
  avance: number;
  estado: 'Completado' | 'En Progreso' | 'Pendiente';
  responsable: string;
  inicio?: string;
  fin?: string;
}

export const procesosProduccion: ProcesoProduccion[] = [
  { nombre: 'Habilitado', avance: 100, estado: 'Completado', responsable: 'C. Muñoz', inicio: '2026-06-20', fin: '2026-06-25' },
  { nombre: 'Armado', avance: 60, estado: 'En Progreso', responsable: 'R. Fuentes', inicio: '2026-06-26' },
  { nombre: 'Soldado', avance: 0, estado: 'Pendiente', responsable: 'Por asignar' },
  { nombre: 'Limpieza', avance: 0, estado: 'Pendiente', responsable: 'Por asignar' },
  { nombre: 'Galvanizado / Pintado', avance: 0, estado: 'Pendiente', responsable: 'Por asignar' },
];

export interface AvancePlano {
  plano: string;
  descripcion: string;
  avance: number;
  trabajador: string;
  avatarColor: string;
}

export const avancesPlanos: AvancePlano[] = [
  { plano: 'PL-071-001', descripcion: 'Estructura principal - Módulo A', avance: 100, trabajador: 'C. Muñoz', avatarColor: 'bg-brand-500' },
  { plano: 'PL-071-002', descripcion: 'Estructura principal - Módulo B', avance: 80, trabajador: 'R. Fuentes', avatarColor: 'bg-teal-600' },
  { plano: 'PL-071-003', descripcion: 'Plataforma de servicio', avance: 45, trabajador: 'J. Aravena', avatarColor: 'bg-amber-500' },
  { plano: 'PL-071-005', descripcion: 'Escalera de acceso', avance: 20, trabajador: 'L. Soto', avatarColor: 'bg-rose-500' },
];

// ---------------------------------------------------------------------------
// Calidad
// ---------------------------------------------------------------------------
export interface ChecklistItem {
  label: string;
  checked: boolean;
  responsable?: string;
}

export const checklistCalidad: ChecklistItem[] = [
  { label: 'Liberación Dimensional - Plano 001', checked: true, responsable: 'C. Muñoz' },
  { label: 'Liberación Dimensional - Plano 002', checked: true, responsable: 'C. Muñoz' },
  { label: 'Liberación Dimensional - Plano 003', checked: false, responsable: 'C. Muñoz' },
  { label: 'Tintes Penetrantes - Soldaduras Mod. A', checked: true, responsable: 'R. Fuentes' },
  { label: 'Tintes Penetrantes - Soldaduras Mod. B', checked: false, responsable: 'R. Fuentes' },
  { label: 'Inspección Visual General', checked: false, responsable: 'C. Muñoz' },
  { label: 'Registro Fotográfico Final', checked: false, responsable: 'J. Aravena' },
];

// ---------------------------------------------------------------------------
// Registro fotográfico (portal cliente)
// ---------------------------------------------------------------------------
export const fotosRegistro = [
  { url: 'https://images.unsplash.com/photo-1565043666747-697d4965bc1c?w=600&q=80', caption: 'Armado de estructura - Módulo A' },
  { url: 'https://images.unsplash.com/photo-1504917595217-4d826443d7c2?w=600&q=80', caption: 'Soldadura de unión principal' },
  { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af45?w=600&q=80', caption: 'Detalle de soldadura MIG' },
];

// ---------------------------------------------------------------------------
// Reportes operativos
// ---------------------------------------------------------------------------
export const reportesKPIs = [
  { label: 'Productividad semanal', valor: '87%', tendencia: '+4% vs semana previa', positiva: true },
  { label: 'Horas-hombre / Tonelada', valor: '12.4 h/T', tendencia: '-0.8 h/T vs mes previo', positiva: true },
  { label: 'OTs a tiempo', valor: '92%', tendencia: '3 OTs en plazo este mes', positiva: true },
  { label: 'Rechazos de calidad', valor: '1.2%', tendencia: '+0.3% vs objetivo 1%', positiva: false },
  { label: 'Ocupación de planta', valor: '74%', tendencia: '2 OTs activas en piso', positiva: true },
  { label: 'Tonelaje despachado mes', valor: '186 T', tendencia: 'Meta: 220 T', positiva: false },
];
