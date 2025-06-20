// Componente que establece lo que contiene cada tarjeta de producto en su interior

import React from 'react'
import { NavLink } from 'react-router-dom'

// Hoja de estilos
import "../styles/item.scss"


const Item = ({ item }) => {
  return (
    <NavLink to={`/detail/${item.slug}`} className="navlink-item" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='contenedorCartaProducto'>
        <img src={item.imagenes[0]} alt={`Foto de ${item.nombre}`} />
        <h2>{item.nombre}</h2>
        <h3>U$D {item.precio}</h3>
      </div>
    </NavLink>
  )
}

export default Item