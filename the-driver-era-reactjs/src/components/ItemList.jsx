import React from 'react'

// Componente de las cartas de los productos
import Item from './Item'

// Hoja de estilos
import "../styles/itemlist.scss"

// Acá se hace el método map para renderizar cada elemento del array de productos

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