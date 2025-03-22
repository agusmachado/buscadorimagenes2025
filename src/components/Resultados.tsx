import { useStore } from "../store/store"
import { Foto } from "../types"
import Paginacion from "./Paginacion"


export default function Resultados() {
  
  const resultados = useStore((state) => state.resultados)
  const entrada = useStore((state) => state.entrada)

  return (
    <div className='mt-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4'>
        {resultados && resultados.length > 0 ? (
          resultados.map((foto: Foto) => (
          <div
            key={foto.id}
            className="rounded overflow-hidden shadow-lg bg-white"
          >
            <img 
              src={foto.urls.small}
              alt={foto.alt_description} 
              className="w-full h-150 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{foto.user.name}</div>
              <p className="text-gray-700 text-base">{foto.description || foto.alt_description || "Sin descripción"}</p>
            </div>
          </div>
          ))
        ) : (
          entrada ? (<p className="text-center col-span-3 text-gray-600">No se encontraron resultados</p>) : (null)         
        )}
        
      </div>
        {resultados && resultados.length > 0 && <Paginacion/>}      
    </div>
  )
}
