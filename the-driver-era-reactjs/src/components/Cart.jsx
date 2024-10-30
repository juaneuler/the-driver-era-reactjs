import React, { useContext, useMemo } from 'react'
import { Cart as ContextoCarrito } from '../context/CartProvider'
import { NavLink } from 'react-router-dom'
import CartItem from './CartItem';

// Hoja de estilos
import "../styles/cart.scss"

const Cart = () => {

    const { carrito, vaciarCarrito, eliminarProducto } = useContext(ContextoCarrito)

    const precioTotal = useMemo(() => {
        return carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0)
    }, [carrito]) 
    
    return (
        <div className='contenedorCarrito'>
            <h1>PRODUCTOS</h1>
            {carrito.length ? (
                <>
                    {carrito.map((itemCarrito) => (
                        <CartItem item={itemCarrito} key={itemCarrito.id} eliminarProducto={eliminarProducto} />
                    ))}
                    <button onClick={vaciarCarrito} className="botonVaciar">Vaciar carrito</button>
                    <h2>TOTAL: U$D {precioTotal.toFixed(2)}</h2>
                    <NavLink to={"/checkout"} className="botonCheckout">FINALIZAR COMPRA</NavLink>
                </>
            ) : (
                <>
                    <h2>Tu carrito está vacío</h2>
                    <h2>Por qué no agregamos algo?</h2>
                    <NavLink to={"/"} className="botonIrAHome">Ir a home</NavLink>
                </>
            )}
        </div>
    )
}

export default Cart