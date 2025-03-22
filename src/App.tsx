import FormularioBusqueda from "./components/FormularioBusqueda"
import Resultados from "./components/Resultados"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-200 p-4">
        <h1 className="text-center text-3xl font-bold text-gray-800">Buscador de Imágenes</h1>
      </header>

      <main className="flex flex-col flex-grow">
        <section className="bg-blue-100 p-4">
          <FormularioBusqueda/>
        </section>
        <section className="bg-blue-50 p-4 flex-grow">
          <Resultados/>
        </section>
      </main>

      <footer className="bg-blue-200 p-4 text-center">
        Todos los derechos reservados
      </footer>
      
    </div>
      
  )
}

export default App
