import React, { useContext, useMemo, useEffect, useState } from 'react'
import { Cart as ContextoCarrito } from '../context/CartProvider'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import CartItem from './CartItem'

// Loader global
import { useLoader } from '../context/LoaderProvider'
import PantallaNegra from './PantallaNegra'

// Hoja de estilos
import "../styles/cart.scss"

const Cart = () => {

    const { carrito, vaciarCarrito, eliminarProducto } = useContext(ContextoCarrito)
    const { showLoader, hideLoader } = useLoader()
    const [cargando, setCargando] = useState(true)

    const precioTotal = useMemo(() => {
        return carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0)
    }, [carrito])

    // Efecto para simular carga inicial y disparar loader
    useEffect(() => {
        showLoader()
        setCargando(true)

        const timer = setTimeout(() => {
            setCargando(false)
            hideLoader()
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    // Mientras carga, mostramos PantallaNegra
    if (cargando) return <PantallaNegra />

    return (
        <>
            <Helmet>
                <title>Carrito | THE DRIVER ERA SHOP</title>
            </Helmet>
            <div className={`contenedorCarrito ${carrito.length === 0 ? 'vacio' : ''}`}>
                <h1 className="tituloCarrito">PRODUCTOS</h1>
                {carrito.length ? (
                    <>
                        {carrito.map((itemCarrito) => (
                            <CartItem item={itemCarrito} key={itemCarrito.id} eliminarProducto={eliminarProducto} />
                        ))}
                        <button onClick={vaciarCarrito} className="boton">Vaciar carrito</button>
                        <h2>TOTAL: U$D {precioTotal.toFixed(2)}</h2>
                        <NavLink to={"/checkout"} className="boton">FINALIZAR COMPRA</NavLink>
                    </>
                ) : (
                    <>
                        <h2>Tu carrito está vacío</h2>
                        <h2>Por qué no agregamos algo?</h2>
                        <NavLink to={"/"} className="boton">Ir a home</NavLink>
                    </>
                )}
            </div>
        </>
    )
}

export default Cart