import React from 'react'

// Imagen del carrito
import cart from '../assets/cart.svg'

//Hoja de estilos
import '../styles/cartwidget.scss'

const CartWidget = () => {
    return (
        <div className="cartWidget">
            <img src={cart} alt='carrito' style={{ width: 40 }} />
            <span>(4)</span>
        </div>
    )
}

export default CartWidget