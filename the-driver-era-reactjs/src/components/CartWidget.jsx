import React, { useContext } from 'react'

// Imagen del carrito
import carritoImagen from '../assets/cart.svg'

//Hoja de estilos
import '../styles/cartwidget.scss'

// Contexto
import { Cart } from '../context/CartProvider'
import { NavLink } from 'react-router-dom'


const CartWidget = () => {

    const {carrito} = useContext(Cart)

    const cantidadTotal = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)

    return (
        <>
        {cantidadTotal > 0 ? (
        <NavLink to="/cart" className="cartWidget">
            <img src={carritoImagen} alt="carrito" style={{width: 40}} />
            <span>({cantidadTotal})</span>
        </NavLink>
        ) : null}
        </>
    )
}

export default CartWidget