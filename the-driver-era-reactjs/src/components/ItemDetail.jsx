import React from 'react'

// Hoja de estilos
import "../styles/itemdetail.scss"

const ItemDetail = ({ producto }) => {
    return (
        <div className='contenedorCartaProductoIndividual'>
            <img src={producto.imagen} />
            <h2>{producto.nombre}</h2>
            <h2>Unidades disponibles: {producto.stock}</h2>
            <h3>U$D {producto.precio}</h3>
            <h4>{producto.descripcion}</h4>
        </div>
    )
}

export default ItemDetail