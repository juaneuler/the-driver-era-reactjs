import React, { useEffect, useState } from 'react'

// Array de productos
import arrayDeProductosParaMostrar1 from "../assets/productos.json"
import ItemDetail from './ItemDetail'

// Hoja de estilos
import "../styles/itemdetailcontainer.scss"

const ItemDetailContainer = () => {

  const [producto, setProducto] = useState([])

  const obtenerProducto = (ID) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(arrayDeProductosParaMostrar1.find(producto => producto.ID === ID))
      }, 2000);
    })
  }

  useEffect(() => {
    obtenerProducto(1).then(response => {
      setProducto(response)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <div className='contenedorDeTarjeta'>
      <ItemDetail producto={producto} />
    </div>
  )
}

export default ItemDetailContainer