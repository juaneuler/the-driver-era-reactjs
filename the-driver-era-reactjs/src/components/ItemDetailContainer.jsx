import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from 'sweetalert2';

import ItemDetail from './ItemDetail'

// Hoja de estilos
import "../styles/itemdetailcontainer.scss"


const ItemDetailContainer = () => {

  // Estado para productos y useParams

  const { slug } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  //Efecto para encontrar cada producto

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        const q = query(collection(db, "productos"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Comprobamos que solo haya un producto por slug
          const doc = querySnapshot.docs[0];
          setProducto({ id: doc.id, ...doc.data() });
        } else {
          Swal.fire({
            title: "Producto no encontrado",
            text: "No se encontró el producto solicitado",
            icon: "warning",
            confirmButtonText: "Aceptar"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un error al cargar el producto: " + error.message,
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      } finally {
        setCargando(false);
      }
    })();
  }, [slug]);

  // Retorno el producto seleccionado

  return (
    <>
      {cargando ? (
        <h1 className='tituloLoader'>Cargando información del producto...</h1>
      ) : (
        <div className='contenedorDeTarjeta'>
          {producto ? <ItemDetail producto={producto} /> : <h1>Producto no encontrado</h1>}
        </div>
      )}
    </>
  );
};

export default ItemDetailContainer