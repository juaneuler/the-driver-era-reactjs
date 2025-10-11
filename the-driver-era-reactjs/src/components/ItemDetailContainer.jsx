import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore";
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

import ItemDetail from './ItemDetail'
import PantallaNegra from './PantallaNegra'

// Loader
import { useLoader } from '../context/LoaderProvider'

// Estilos
import "../styles/itemdetailcontainer.scss"

const ItemDetailContainer = () => {
  const { slug } = useParams()
  const [producto, setProducto] = useState(null)
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    showLoader()
    const fetchProducto = async () => {
      try {
        const q = query(collection(db, "productos"), where("slug", "==", slug))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          setProducto({ id: doc.id, ...doc.data() })
        } else {
          Swal.fire({
            title: "Producto no encontrado",
            text: "No se encontró el producto solicitado",
            icon: "warning",
            confirmButtonText: "Aceptar"
          })
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un error al cargar el producto: " + error.message,
          icon: "error",
          confirmButtonText: "Aceptar"
        })
      } finally {
        hideLoader()
      }
    }

    fetchProducto()
  }, [slug])

  return (
    <>
      <Helmet>
        <title>
          {producto ? `${producto.nombre} | THE DRIVER ERA SHOP` : "Producto | THE DRIVER ERA SHOP"}
        </title>
      </Helmet>

      {/* Pantalla negra mientras carga el contenido */}
      {!producto && <PantallaNegra />}

      {producto && (
        <div className='contenedorDeTarjeta'>
          <ItemDetail producto={producto} />
        </div>
      )}
    </>
  )
}

export default ItemDetailContainer