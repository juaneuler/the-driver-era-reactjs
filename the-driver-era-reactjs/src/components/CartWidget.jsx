import React from 'react'
import cart from '../assets/cart.svg'
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