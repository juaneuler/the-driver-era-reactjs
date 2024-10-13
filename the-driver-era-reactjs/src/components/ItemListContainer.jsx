// Componente contenedor

import React, { useState, useEffect } from 'react'

// Array de productos
import arrayDeProductos from "../assets/productos.json"

// Foto portada
import fotoPortada from "../assets/fotoPortada.jpg"

// Importación del componente Item List
import ItemList from './ItemList'

// Hoja de estilos
import "../styles/itemlistcontainer.scss"
import { useParams } from 'react-router-dom'


const ItemListContainer = () => {

  // Estado para productos y para la "pantalla" de carga

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true)

  // Parámetros
  const { categoryId } = useParams()

  // Emulo la carga de productos con setTimeOut

  const fetchProductos = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(arrayDeProductos)
      }, 2000);
    })
  }

  // Resolución de la promesa y filtrado por categorías. También hago uso de la pantalla de carga

  useEffect(() => {

    setCargando(true)

    fetchProductos().then((productosCargados) => {

      let productosFiltrados = [];

      if (categoryId) {
        productosFiltrados = productosCargados.filter(producto => producto.category === categoryId);
        setProductos(productosFiltrados);
      } else {
        productosFiltrados = productosCargados;
      }

      setProductos(productosFiltrados)
      setCargando(false)
    });
  }, [categoryId])


  // Retorno el contenido de la tienda
  return (
    <>
      {cargando ? (
        <h1>Aguarde mientras se carga el sitio web...</h1>
      ) : (
        <div>
          <div className='contenedorEncabezados'>
          <h1>THE DRIVER ERA - OBSESSION TOUR 2025</h1>
          <h2>Tickets a la venta!!!</h2>
          </div>
          <a href="https://www.thedriverera.com/tour/" target='_blank'>
            <img src={fotoPortada} alt="Foto Obession Tour 2025" className='fotoPortada animate__animated animate__fadeInUp' />
          </a>
          <h1>THE DRIVER ERA - SHOP</h1>
          <ItemList productos={productos} />
        </div>
      )}
    </>
  );
};

export default ItemListContainer