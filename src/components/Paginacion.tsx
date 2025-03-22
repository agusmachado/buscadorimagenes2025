import { useMemo } from "react"
import { useStore } from "../store/store"



export default function Paginacion() {
    
  const pagina =  useStore((state) => state.pagina)  
  const totalPaginas = useStore((state) => state.totalPaginas) 
  const establecerPagina = useStore((state) => state.establecerPagina)
 
  const grupoImagenes = 5
                    
  const grupoActual = Math.floor((pagina - 1) / grupoImagenes)
  console.log("El grupo actual es el número ", grupoActual)
        
  const paginaInicio = grupoActual * grupoImagenes + 1
  console.log('La página de inicio de este grupo es la ', paginaInicio)

  const paginaFin = Math.min(totalPaginas, paginaInicio + grupoImagenes - 1)
  console.log("La página final es ", paginaFin)

  const numerosPaginas = useMemo(() => {
            const arregloNumerosPaginas: number[] = []

        for (let i = paginaInicio; i <= paginaFin; i++){
            arregloNumerosPaginas.push(i)   
        }
        return arregloNumerosPaginas
  }, [paginaInicio, paginaFin])
  

  return (
    <div
        className="flex justify-center items-center space-x-2 mt-4"
    >
        {/* Botón para lo anterior */}
        <button
            onClick={() => {
                if (pagina > 1) {
                   establecerPagina(pagina - 1) 
                   window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }}
            disabled={pagina <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
            Anterior
        </button>

        {paginaInicio > 1 && (
            <button
                onClick={() =>{
                    const nuevaPagina = paginaInicio - 1
                    establecerPagina(nuevaPagina)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-2 py-1 bg-gray-300 text-black rounded cursor-pointer"
            >
                &laquo;
            </button>
        )}


        {numerosPaginas.map((num) => (
            <button
                key={num}
                onClick={() => { 
                    establecerPagina(num)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`px-3 py-1 rounded cursor-pointer ${ num === pagina ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
                {num}
            </button>
        ))}

        {paginaFin < totalPaginas && (
            <button
                onClick={() => {
                    const nuevaPagina = paginaFin + 1 
                    establecerPagina(nuevaPagina)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-2 py-1 bg-gray-300 text-black rounded cursor-pointer"
            >
                &raquo;
            </button>
        )}

        {/* Botón para el siguiente */}
        <button
            onClick={() => {
                if (pagina < totalPaginas) {
                    establecerPagina(pagina + 1)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }}
            disabled={pagina >= totalPaginas}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
            Siguiente
        </button>
    </div>
  )
}
