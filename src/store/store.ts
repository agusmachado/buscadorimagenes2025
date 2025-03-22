import { create } from "zustand";
import { StateStore } from "../types";
import axios from "axios";



export const useStore = create<StateStore>((set, get) => ({
    // Estado inicial - initial State
    entrada: '',
    resultados: [],
    pagina: 1,
    totalPaginas: 0,
    
    obtenerDatos: async () => {
        const { entrada, pagina } = get()

        try {
            const respuesta = await axios.get('https://api.unsplash.com/search/photos', {
                params: {query: entrada, page: pagina, per_page: 12},
                headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API}`}
            })

            console.log("Estamos recibiendo respuesta de la API ", respuesta.data, "Estamos en la página ", pagina)

            set({
                resultados: respuesta.data.results,
                totalPaginas: respuesta.data.total_pages
            })
        } catch (error) {
            console.error('Error al obtener los datos: ', error)
            set({ resultados: [] })
        }
    },


    establecerPagina: (numero: number) => {
        set({ pagina: numero})
        get().obtenerDatos()
    },

    establecerEntrada: (palabraBusqueda: string) =>
        set({
            entrada: palabraBusqueda,
            pagina: 1
        })
}))