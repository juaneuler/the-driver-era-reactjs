import React from 'react'
import ItemCount from "../components/ItemCount"

// Hoja de estilos
import "../styles/itemdetail.scss"

const ItemDetail = ({ producto }) => {

    const stock = producto.stock

    return (
        <div className='contenedorCartaProductoIndividual'>
            <img src={producto.imagen} />
            <h2>{producto.nombre}</h2>
            <h2>Unidades disponibles: {producto.stock}</h2>
            <h3>Precio: U$D {producto.precio}</h3>
            <h4>Descripción: {producto.descripcion}</h4>
            <ItemCount inicial={1} stock={stock} onAdd={(cantidad) => console.log("La cantidad agregada es ", cantidad)}/>
        </div>
    )
}

export default ItemDetail