// Componentes: barra de navegación y contenedores

import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="SHOP"/>
      <ItemDetailContainer/>
    </div>
  )
}

export default App