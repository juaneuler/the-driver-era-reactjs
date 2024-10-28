import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore";

import ItemDetail from './ItemDetail'

// Hoja de estilos
import "../styles/itemdetailcontainer.scss"


const ItemDetailContainer = () => {

  // Estado para productos y useParams

  const { id } = useParams()
  console.log("El ID es", id);
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  //Efecto para encontrar cada producto

  useEffect(() => {
      (async () => {

        setCargando(true)

        try {
          const docRef = doc(db, "productos", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Data del documento:", docSnap.data());
            setProducto({...docSnap.data(), id})
          } else {
            console.log("No se encontró el documento");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setCargando(false)
        }
      })();
  }, [id])

  // Retorno el producto seleccionado

  return (
    <> {cargando ? (
      <h1>Aguarde mientras se carga la vista del producto...</h1>
    ) : (
      <div className='contenedorDeTarjeta'>
        {producto ? <ItemDetail producto={producto} /> : <h1>Producto no encontrado</h1>}
      </div>
    )}
    </>
  )
}

export default ItemDetailContainer