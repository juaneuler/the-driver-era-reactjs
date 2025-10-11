import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/detalleorden.scss"

const DetalleOrden = ({ ordenId, buyer, items = [], total = 0 }) => {
    return (
        <div className="contenedorDetalleOrden">
            <h1 className="tituloDetalleOrden">DETALLE DE TU COMPRA</h1>

            <div className="detalleOrden">
                <p className="detalleOrden__agradecimiento">
                    ¡Gracias por tu compra, {buyer?.nombre || "cliente"}!
                </p>

                <p className="detalleOrden__texto">
                    Tu número de orden es: <span className="detalleOrden__id">{ordenId}</span>
                </p>

                <p className="detalleOrden__texto">
                    En breve recibirás un mail a <strong>{buyer?.email || "tu correo"}</strong> con los detalles del envío.
                </p>

                <div className="detalleOrden__resumen">
                    <h2 className="detalleOrden__subtitulo">Resumen de tu compra</h2>
                    {items.length > 0 ? (
                        <ul className="detalleOrden__lista">
                            {items.map(item => (
                                <li key={item.id} className="detalleOrden__item">
                                    <div className="detalleOrden__producto">{item.nombre}</div>
                                    <div className="detalleOrden__cantidad">
                                        Cantidad: {item.cantidad} x ${item.precio} USD
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron artículos en la orden.</p>
                    )}
                    <h3 className="detalleOrden__total">TOTAL: U$D {total}</h3>
                </div>

                <p className="detalleOrden__mensaje">
                    Una vez que tus productos estén listos para ser despachados, recibirás el número de seguimiento.
                </p>

                <div className="detalleOrden__botones">
                    <NavLink to="/" className="boton">Volver a Home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default DetalleOrden