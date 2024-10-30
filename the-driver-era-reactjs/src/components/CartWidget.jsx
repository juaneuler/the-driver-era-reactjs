import React, { useContext, useMemo } from 'react'

// Imagen del carrito
import carritoImagen from '../assets/cart.svg'

//Hoja de estilos
import '../styles/cartwidget.scss'

// Contexto
import { Cart } from '../context/CartProvider'
import { NavLink } from 'react-router-dom'


const CartWidget = () => {

    const {carrito} = useContext(Cart)

    const cantidadTotal = useMemo(() => {
        return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)
    }, [carrito])
     
    return (
        <NavLink to="/cart" className="cartWidget">
            <img src={carritoImagen} alt="Ícono del carrito de compras"/>
            <span>({cantidadTotal})</span>
        </NavLink>
    );
};

export default CartWidget