import React, { useState } from 'react'
import ItemCount from "../components/ItemCount"
import { NavLink } from 'react-router-dom'

// Hoja de estilos
import "../styles/itemdetail.scss"

const ItemDetail = ({ producto }) => {

    const stock = producto.stock

    const [visibilidadItemCount, setVisibilidadItemCount] = useState(true)

    const handleCart = (cantidad) => {
        console.log(cantidad);
        setVisibilidadItemCount(false)
    }


    return (
        <div className='contenedorCartaProductoIndividual'>
            <img src={producto.imagen} />
            <h2>{producto.nombre}</h2>
            <h2>Unidades disponibles: {producto.stock}</h2>
            <h3>Precio: U$D {producto.precio}</h3>
            <h4>Descripción: {producto.descripcion}</h4>
            {visibilidadItemCount ? 
            (<ItemCount inicial={1} stock={stock} onAdd={(cantidad) => 
            {handleCart(cantidad); console.log("La cantidad agregada es ", cantidad)}}/>) 
            : (<NavLink to="/cart" className='botonIrAlCarrito'>IR AL CARRITO</NavLink>)}
        </div>
    )
}

export default ItemDetail