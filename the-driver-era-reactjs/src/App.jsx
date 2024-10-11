// Componentes: barra de navegación, footer, React Router DOM y contenedores

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import Footer from "./components/Footer"
import NotFound from './components/NotFound'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element= {<ItemListContainer />}></Route>
          <Route path='/category/:categoryId' element= {<ItemListContainer />}></Route>
          <Route path='/detail/:id' element= {<ItemDetailContainer />}></Route>
          <Route path='*' element= {<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App