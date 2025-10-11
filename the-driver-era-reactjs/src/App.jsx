import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Componentes principales

import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

// Contextos

import CartProvider from './context/CartProvider'
import { LoaderProvider, useLoader } from './context/LoaderProvider'

// Subcomponente que reacciona al cambio de ruta

function AppRoutes() {
  const location = useLocation()
  const { showLoader } = useLoader()

  useEffect(() => {
    showLoader()
  }, [location])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/detail/:slug" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

// App principal

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <LoaderProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LoaderProvider>
      </CartProvider>
    </HelmetProvider>
  )
}

export default App