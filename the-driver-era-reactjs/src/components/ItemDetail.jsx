import React, { useContext, useState } from 'react'
import ItemCount from "../components/ItemCount"
import { NavLink } from 'react-router-dom'
import { Cart } from '../context/CartProvider'

// Importación de la librería de Sweet Alert
import Swal from 'sweetalert2';

// Hoja de estilos
import "../styles/itemdetail.scss"


const ItemDetail = ({ producto }) => {

    if (!producto) {
        return <h1>Producto no encontrado</h1>
    }

    const { addToCart } = useContext(Cart)

    const stock = producto.stock

    const [visibilidadItemCount, setVisibilidadItemCount] = useState(true)

    const handleCart = (cantidad) => {

        setVisibilidadItemCount(false)
        addToCart(producto, cantidad)

        // Muestro una alerta para confirmar que el producto se agregó al carrito
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito!',
            text: `Agregaste ${producto.nombre} - Unidades: ${cantidad}`,
            confirmButtonText: 'Aceptar',
        })
    }


    return (
        <div className='contenedorCartaProductoIndividual'>
            <img src={producto.imagen} alt={`Foto de ${producto.nombre}`} />
            <div className='contenedorDescripcion'>
                <h2>{producto.nombre}</h2>
                <h2>Unidades disponibles: {producto.stock}</h2>
                <h3>Precio: U$D {producto.precio}</h3>
                <h4>Descripción: {producto.descripcion}</h4>
                {producto.descripcionExtra && (
                    <div className='tracklist'>
                        <h4>Tracklist</h4>
                        <ol>
                            {producto.descripcionExtra.map((track, index) => (
                                <li key={index}>{track}</li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>

            {stock === 0 ? (
                <h3>No hay unidades disponibles en este momento. Por favor, vuelva a consultar más tarde.</h3>
            ) : (
                visibilidadItemCount ? (
                    <ItemCount inicial={1} stock={stock} onAdd={(cantidad) => { handleCart(cantidad) }} />
                ) : (
                    <>
                        <NavLink to="/cart" className='botonIrAlCarrito'>IR AL CARRITO</NavLink>
                        <NavLink to="/" className="botonVolverHome">VOLVER A HOME</NavLink>
                    </>
                )
            )}
        </div>
    )
}

export default ItemDetail