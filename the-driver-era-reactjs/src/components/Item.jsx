import React from 'react'

// Hoja de estilos
import "../styles/item.scss"

// Array de productos


const Item = ({item}) => {
  return (
    <div className='contenedorCartaProducto'>
        <img src={item.imagen}/>
        <h2>{item.nombre}</h2>
        <h3>${item.precio}</h3>
        <h4>{item.descripcion}</h4>
    </div>
  )
}

export default Item