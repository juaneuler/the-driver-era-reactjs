// Componentes: barra de navegación, footer, React Router DOM, carrito y contenedores

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import Footer from "./components/Footer"
import NotFound from './components/NotFound'
import CartProvider from './context/CartProvider'
import Cart from './components/Cart'

function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />}></Route>
            <Route path='/category/:categoryId' element={<ItemListContainer />}></Route>
            <Route path='/detail/:id' element={<ItemDetailContainer />}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App