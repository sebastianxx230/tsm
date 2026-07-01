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
