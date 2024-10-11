import React, { useEffect, useState } from 'react'

// Array de productos
import arrayDeProductos from "../assets/productos.json"

import ItemDetail from './ItemDetail'

// Hoja de estilos
import "../styles/itemdetailcontainer.scss"

import { useParams } from 'react-router-dom'

const ItemDetailContainer = () => {

  // Estado para productos y useParams

  const { id } = useParams()
  const [producto, setProducto] = useState([null])
  const [cargando, setCargando] = useState(true)


  // Promesa para obtener el producto

  const obtenerProducto = (ID) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(arrayDeProductos.find(producto => producto.ID === parseInt(ID)));
      }, 2000);
    });
  }

  //Efecto para encontrar cada producto

  useEffect(() => {

    setCargando(true)

    if (id) {
      obtenerProducto(id).then(response => {
        setProducto(response)
        setCargando(false)
      }).catch(error => {
        console.log(error);
        setCargando(false)
      })
    } else {
      setCargando(false)
    }
  }, [id])

  // Retorno el producto seleccionado

  return (
    <> {cargando ? (
      <h1>Aguarde mientras se carga la vista del producto...</h1>
    ) : (
      <div className='contenedorDeTarjeta'>
        <ItemDetail producto={producto} />
      </div>
    )}
    </>
  )
}

export default ItemDetailContainer