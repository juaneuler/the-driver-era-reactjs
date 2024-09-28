// Componentes: barra de navegación y contenedor

import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="SHOP"/>
    </div>
  )
}

export default App