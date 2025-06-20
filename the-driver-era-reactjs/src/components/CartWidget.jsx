import React, { useContext, useMemo } from 'react'

//Hoja de estilos
import '../styles/cartwidget.scss'

// Contexto
import { Cart } from '../context/CartProvider'
import { NavLink } from 'react-router-dom'


const CartWidget = () => {

    const { carrito } = useContext(Cart)

    const cantidadTotal = useMemo(() => {
        return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)
    }, [carrito])

    return (
        <NavLink to="/cart" className={({ isActive }) => isActive ? "cartWidget isActive" : "cartWidget"}>
            <svg
                className="cart-icon"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span>({cantidadTotal})</span>
        </NavLink>
    );
};

export default CartWidget