// Componente que establece lo que contiene cada tarjeta de producto en su interior

import React from 'react'

// Hoja de estilos
import "../styles/item.scss"


const Item = ({item}) => {
  return (
    <div className='contenedorCartaProducto'>
        <img src={item.imagen}/>
        <h2>{item.nombre}</h2>
        <h3>U$D {item.precio}</h3>
    </div>
  )
}

export default Item