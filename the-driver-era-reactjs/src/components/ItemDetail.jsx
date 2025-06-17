import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Cart } from '../context/CartProvider'
import Swal from 'sweetalert2'
import ItemCount from "../components/ItemCount"
import useMiniaturasPorVista from '../hooks/useMiniaturasPorVista'
import "../styles/itemdetail.scss"

const ItemDetail = ({ producto }) => {
    const { addToCart } = useContext(Cart)
    const stockPorTalle = producto.stock
    const [talleSeleccionado, setTalleSeleccionado] = useState("")
    const [visibilidadItemCount, setVisibilidadItemCount] = useState(true)
    const [imagenSeleccionada, setImagenSeleccionada] = useState(producto.imagenes?.[0] || "")
    const [mostrarErrorTalle, setMostrarErrorTalle] = useState(false)
    const [indiceInicioCarrusel, setIndiceInicioCarrusel] = useState(0)

    const tallesOrdenados = ["S", "M", "L", "XL", "2XL", "3XL"]
    const imagenes = producto.imagenes || []

    const miniaturasPorVista = useMiniaturasPorVista()

    const mostrarBotones = imagenes.length > miniaturasPorVista;

    const avanzar = () => {
        if (indiceInicioCarrusel + miniaturasPorVista < imagenes.length) {
            setIndiceInicioCarrusel(indiceInicioCarrusel + 1)
        }
    }

    const retroceder = () => {
        if (indiceInicioCarrusel > 0) {
            setIndiceInicioCarrusel(indiceInicioCarrusel - 1)
        }
    }

    const handleAgregarAlCarrito = (cantidad) => {
        if (typeof stockPorTalle === 'object' && !talleSeleccionado) {
            setMostrarErrorTalle(true)
            return
        }

        setVisibilidadItemCount(false)
        addToCart(typeof stockPorTalle === 'object'
            ? { ...producto, talle: talleSeleccionado }
            : producto,
            cantidad)

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito!',
            text: typeof stockPorTalle === 'object'
                ? `Agregaste ${producto.nombre} - Talle ${talleSeleccionado} - Unidades: ${cantidad}`
                : `Agregaste ${producto.nombre} - Unidades: ${cantidad}`,
            confirmButtonText: 'Aceptar',
        })
    }

    if (!producto) return <h1>Producto no encontrado</h1>

    return (
        <div className='contenedorCartaProductoIndividual'>
            <div className="galeriaImagenes">
                <img className="imagenPrincipal" src={imagenSeleccionada} alt={producto.nombre} />

                {imagenes.length > 0 && (
                    <div className="carruselMiniaturas">
                        {mostrarBotones && (
                            <button
                                className="botonCarrusel"
                                onClick={retroceder}
                                disabled={indiceInicioCarrusel === 0}
                            >
                                ‹
                            </button>
                        )}

                        <div className="miniaturas">
                            {imagenes.slice(indiceInicioCarrusel, indiceInicioCarrusel + miniaturasPorVista).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${producto.nombre} - ${i}`}
                                    className={`miniatura${img === imagenSeleccionada ? " activa" : ""}`}
                                    onClick={() => setImagenSeleccionada(img)}
                                />
                            ))}
                        </div>

                        {mostrarBotones && (
                            <button
                                className="botonCarrusel"
                                onClick={avanzar}
                                disabled={indiceInicioCarrusel + miniaturasPorVista >= imagenes.length}
                            >
                                ›
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className='contenedorDescripcion'>
                <h2>{producto.nombre}</h2>
                <h3>U$D {producto.precio}</h3>
                <h4>{producto.descripcion}</h4>

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

                {typeof stockPorTalle === 'object' ? (
                    <>
                        <h4>El stock depende del talle</h4>

                        <div className="talles">
                            {tallesOrdenados.map((talle) => {
                                const cantidad = stockPorTalle[talle] || 0
                                const sinStock = cantidad === 0

                                return (
                                    <button
                                        key={talle}
                                        className={`botonTalle ${talle === talleSeleccionado ? "activo" : ""} ${sinStock ? "sinStock" : ""}`}
                                        disabled={sinStock}
                                        onClick={() => {
                                            setTalleSeleccionado(talle)
                                            setMostrarErrorTalle(false)
                                        }}
                                    >
                                        {talle}
                                    </button>
                                )
                            })}
                            {mostrarErrorTalle && <p className="errorTalle">Por favor, debe elegir un talle antes de continuar</p>}
                        </div>

                        <div className="accionesProducto">
                            {visibilidadItemCount ? (
                                <ItemCount
                                    inicial={1}
                                    stock={stockPorTalle[talleSeleccionado] || 0}
                                    onAdd={handleAgregarAlCarrito}
                                    desactivado={!talleSeleccionado}
                                />
                            ) : (
                                <>
                                    <NavLink to="/cart" className='botonIrAlCarrito'>IR AL CARRITO</NavLink>
                                    <NavLink to="/" className="botonVolverHome">VOLVER A HOME</NavLink>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <h4>Stock disponible: {producto.stock} unidades</h4>
                        <div className="accionesProducto">
                            {producto.stock === 0 ? (
                                <h3>No hay unidades disponibles en este momento.</h3>
                            ) : visibilidadItemCount ? (
                                <ItemCount inicial={1} stock={producto.stock} onAdd={handleAgregarAlCarrito} />
                            ) : (
                                <>
                                    <NavLink to="/cart" className='botonIrAlCarrito'>IR AL CARRITO</NavLink>
                                    <NavLink to="/" className="botonVolverHome">VOLVER A HOME</NavLink>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ItemDetail