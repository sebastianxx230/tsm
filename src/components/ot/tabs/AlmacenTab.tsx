import { Warehouse, CheckCircle, AlertCircle, BarChart2 } from 'lucide-react';

export default function AlmacenTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Warehouse className="w-5 h-5 text-orange-600" />
          Cobertura de Materiales (BOM vs Stock)
        </h3>
        <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-md transition-colors">
          Registrar Consumo Extra
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { material: 'Tubo red 1/2 x 3.00 mm x 6400', req: 96, stock: 120, cover: 100 },
          { material: 'Perfil W10x49', req: 24, stock: 10, cover: 41 },
          { material: 'Plancha ASTM A36 1/2"', req: 18, stock: 18, cover: 100 },
        ].map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{item.material}</span>
              <span className="text-sm text-gray-500">Req: {item.req} | Stock: {item.stock}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${item.cover === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.cover}%` }}></div>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              {item.cover === 100 ? (
                <><CheckCircle className="w-3 h-3 text-emerald-500" /> Cobertura completa</>
              ) : (
                <><AlertCircle className="w-3 h-3 text-amber-500" /> Faltan {item.req - item.stock} unidades para esta OT</>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
