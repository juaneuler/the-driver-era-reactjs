// Componente contenedor

import React, { useState, useEffect } from 'react'
import { db } from "../firebase/config"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useParams } from 'react-router-dom'

// Importación del componente Portada
import Portada from './Portada';

// Importación del componente para mostrar mi otro sitio web
import WebOficial from './WebOficial';

// Importación del componente Item List
import ItemList from './ItemList'

// Hoja de estilos
import "../styles/itemlistcontainer.scss"



const ItemListContainer = () => {

  // Estado para productos y para la "pantalla" de carga

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true)

  // Parámetros
  const { categoryId } = useParams()

  // Filtrado por categorías. También hago uso de la pantalla de carga

  useEffect(() => {

    setCargando(true)

      ; (async () => {
        try {
          let productosFiltrados = [];

          if (categoryId) {
            const q = query(collection(db, "productos"), where("category", "==", categoryId), orderBy("orden"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              productosFiltrados.push({ id: doc.id, ...doc.data() })
            });
          } else {
            const querySnapshot = await getDocs(collection(db, "productos"), orderBy("orden"));
            querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data()}`);
              productosFiltrados.push({ id: doc.id, ...doc.data() })
            });
          }
          setProductos(productosFiltrados)

        } catch (error) {
          console.log(error);
        } finally {
          setCargando(false)
        }
      })();
  }, [categoryId])


  // Retorno el contenido de la tienda
  return (
    <>
      {cargando ? (
        <h1>Aguarde mientras se carga el sitio web...</h1>
      ) : (
        <div>
          {!categoryId && <Portada />}
          <h1>THE DRIVER ERA - SHOP</h1>
          <ItemList productos={productos} />
          {!categoryId && <WebOficial/>}
        </div>
      )}
    </>
  );
};

export default ItemListContainer