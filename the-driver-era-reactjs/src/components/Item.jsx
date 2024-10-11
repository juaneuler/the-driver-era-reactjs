// Componente que establece lo que contiene cada tarjeta de producto en su interior

import React from 'react'

// Hoja de estilos
import "../styles/item.scss"
import { NavLink } from 'react-router-dom'


const Item = ({item}) => {
  return (
    <div className='contenedorCartaProducto'>
        <img src={item.imagen} alt={item.nombre}/>
        <h2>{item.nombre}</h2>
        <h3>U$D {item.precio}</h3>
        <NavLink to={`/detail/${item.ID}`}>
        <button className='botonInformacion'>Más información</button>
        </NavLink>
    </div>
  )
}

export default Item