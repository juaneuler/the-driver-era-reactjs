// Componente para colocar el contador de unidades y los botones para subir o bajar dicha cantidad. También agrega al carrito

import React from 'react'
import { useState } from 'react'

// Hoja de estilos
import "../styles/itemcount.scss"

const ItemCount = ({stock, inicial, onAdd}) => {

    const [cantidad, setCantidad] = useState(inicial)

    const aumentarCantidad = () => {
        if(cantidad < stock) {
            setCantidad (cantidad + 1)
        }
    }

    const reducirCantidad = () => {
        if(cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

  return (
    <div className='contenedorDelContador'>
        <div className='contenedorDeBotones'>
            <button className='boton' onClick={reducirCantidad}> - </button>
            <h4 className='cantidadDelProducto'>Unidades: {cantidad}</h4>
            <button className='boton' onClick={aumentarCantidad}> + </button>
        </div>
        <div>
            <button className='boton' onClick={() => onAdd(cantidad)} disabled={!stock}>AGREGAR AL CARRITO</button>
        </div>
    </div>
  )
}

export default ItemCount