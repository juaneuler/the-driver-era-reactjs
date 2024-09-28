import React, { useState, useEffect } from 'react'

// Array de productos
import arrayDeProductos from "../assets/productos.json"

// Componente Item List
import ItemList from './ItemList'

// Hoja de estilos
import "../styles/itemlistcontainer.scss"

const ItemListContainer = ({ greeting }) => {

  // Emulo la carga de productos con setTimeOut
  const [productos, setProductos] = useState([]);

  const fetchProductos = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(arrayDeProductos)
      }, 2000);
    })
  }

  // 
  useEffect(() => {
    fetchProductos().then((productosCargados) => {
      setProductos(productosCargados)
    })
  }, [])

  // Retorno el contenido de la tienda
  return (
    <>
      <div>
        <h1>{greeting}</h1>
      </div>
      <ItemList productos={productos} />
    </>
  )
}

export default ItemListContainer