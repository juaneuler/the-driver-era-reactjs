import React from 'react'

// Hoja de estilos
import "../styles/cartitem.scss"

const CartItem = ({ item, eliminarProducto }) => {
  return (
    <div className='contenedorCartItem'>
        <img src={item.imagen} alt={item.nombre}/>
        <h2>{item.nombre}</h2>
        <h3>Descripción del producto: {item.descripcion}</h3>
        <h3>Precio: U$D {item.precio}</h3>
        <h3>Unidades: {item.cantidad}</h3>
        <button className='botonEliminar' onClick={() => eliminarProducto(item.id)}>Eliminar del carrito</button>
    </div>
  )
}

export default CartItem