// Componente que establece lo que contiene cada tarjeta de producto en su interior

import React from 'react'
import { NavLink } from 'react-router-dom'

// Hoja de estilos
import "../styles/item.scss"


const Item = ({item}) => {
  return (
    <div className='contenedorCartaProducto'>
        <img src={item.imagen} alt={`Foto de ${item.nombre}`}/>
        <h2>{item.nombre}</h2>
        <h3>U$D {item.precio}</h3>
        <NavLink to={`/detail/${item.id}`}>
        <button className='botonInformacion'>Más información</button>
        </NavLink>
    </div>
  )
}

export default Item