import React, { useState, useEffect } from 'react'
import { db } from "../firebase/config"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

// Componentes
import WebOficial from './WebOficial';
import ItemList from './ItemList'

// Loader global
import { useLoader } from '../context/LoaderProvider'

// Importamos el componente que deja la pantalla en negro para complementar con el loader
import PantallaNegra from './PantallaNegra';

// Estilos
import "../styles/itemlistcontainer.scss"

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const { categoryId } = useParams()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    showLoader()

    const fetchProductos = async () => {
      try {
        let productosFiltrados = []

        if (categoryId) {
          const q = query(
            collection(db, "productos"),
            where("category", "==", categoryId),
            orderBy("orden")
          )
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            productosFiltrados.push({ id: doc.id, ...doc.data() })
          })
        } else {
          const q = query(collection(db, "productos"), orderBy("orden"))
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            productosFiltrados.push({ id: doc.id, ...doc.data() })
          })
        }

        setProductos(productosFiltrados)

        // Si no hay productos, mostramos una alerta para mejorar la experiencia de usuario
        if (productosFiltrados.length === 0) {
          Swal.fire({
            title: "Ups!",
            text: "No se encontraron productos!",
            icon: "info",
            confirmButtonText: "Aceptar"
          })
        }

      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un error al cargar los productos: " + error.message,
          icon: "error",
          confirmButtonText: "Aceptar"
        })
      } finally {
        hideLoader()
      }
    }

    fetchProductos()
  }, [categoryId])

  return (
    <>
      <Helmet>
        <title>
          {categoryId
            ? `Categoría: ${categoryId.toUpperCase()} | THE DRIVER ERA SHOP`
            : "Tienda | THE DRIVER ERA SHOP"}
        </title>
      </Helmet>

      {/* Si está cargando, mostramos la pantalla negra para mejorar la UI */}
      {productos.length === 0 && <PantallaNegra />}

      <div className='tiendaContenedor'>
        <h1 className='títuloTienda'>THE DRIVER ERA - SHOP</h1>
        <ItemList productos={productos} />
        {!categoryId && <WebOficial />}
      </div>
    </>
  )
}

export default ItemListContainer