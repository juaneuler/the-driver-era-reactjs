// Componente donde uso el método map para renderizar los elementos del array y generar las tarjetas en el DOM

import React from 'react'

// Componente de las cartas de los productos
import Item from './Item'

// Hoja de estilos
import "../styles/itemlist.scss"

const ItemList = ({ productos }) => {
  return (
    <div className='contenedorDeTarjetas'>
      {productos.map((producto => {
        return (
          <Item item={producto} key={producto.ID} />
        )
      }))
      }
    </div>
  )
}

export default ItemList