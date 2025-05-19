// Componente para colocar el contador de unidades y los botones para subir o bajar dicha cantidad. También agrega al carrito

import React from 'react'
import { useState } from 'react'

// Hoja de estilos
import "../styles/itemcount.scss"

const ItemCount = ({ stock, inicial, onAdd }) => {
    const [cantidad, setCantidad] = useState(inicial)

    const handleSelect = (e) => {
        setCantidad(Number(e.target.value))
    }

    return (
        <div className='contenedorDelContador'>
            <div className='contenedorDeBotones'>
                <label htmlFor="selector-cantidad" style={{ marginRight: "10px" }}>
                    Cantidad:
                </label>
                <select
                    id="selector-cantidad"
                    className="selectorCantidad"
                    value={cantidad}
                    onChange={handleSelect}
                >
                    {Array.from({ length: stock }, (_, i) => (
                        <option
                            key={i + 1}
                            value={i + 1}
                            className={cantidad === i + 1 ? "opcion-activa" : ""}
                        >
                            {i + 1} unidades
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button className='boton' onClick={() => onAdd(cantidad)} disabled={!stock}>
                    AGREGAR AL CARRITO
                </button>
            </div>
        </div>
    )
}

export default ItemCount