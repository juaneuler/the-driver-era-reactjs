// Componente donde uso el método map para renderizar los elementos del array y generar las tarjetas en el DOM

import React from 'react'

// Componente de las cartas de los productos
import Item from './Item'

// Hoja de estilos
import "../styles/itemlist.scss"

const ItemList = ({ productos }) => {

  if (productos.length === 0) {
    return <h1>No se encontraron productos</h1>;
  }

  return (
    <div className='contenedorDeTarjetas'>
      {productos.map((producto => {
        return (
          <Item item={producto} key={producto.id} />
        )
      }))
      }
    </div>
  )
}

export default ItemList