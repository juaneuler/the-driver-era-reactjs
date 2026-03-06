import { createContext, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { trackGTMEvents } from "../analytics/trackEvents";

export const Cart = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  const addToCart = (producto, cantidadProducto) => {
    const productoEnElCarrito = existeEnElCarrito(producto.id);
    let carritoActualizado = [...carrito];

    if (productoEnElCarrito) {
      carritoActualizado = carrito.map((productoCarrito) => {
        if (productoCarrito.id === producto.id) {
          return {
            ...productoCarrito,
            cantidad: productoCarrito.cantidad + cantidadProducto,
          };
        }
        return productoCarrito;
      });
    } else {
      carritoActualizado.push({ ...producto, cantidad: cantidadProducto });
    }

    setCarrito(carritoActualizado);

    trackGTMEvents("add_to_cart", {
      item_id: producto.id,
      item_name: producto.nombre || producto.title,
      price: producto.precio || producto.price,
      quantity: cantidadProducto,
    });
  };

  const existeEnElCarrito = (productoID) => {
    return carrito.some((productoCarrito) => productoCarrito.id === productoID);
  };

  const eliminarProducto = (productoID) => {
    const productoAEliminar = carrito.find((p) => p.id === productoID);

    Swal.fire({
      title: "Estás seguro que deseas eliminar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoActualizado = carrito.filter(
          (producto) => producto.id !== productoID,
        );
        setCarrito(carritoActualizado);

        trackGTMEvents("remove_from_cart", {
          item_id: productoID,
          item_name: productoAEliminar?.nombre || "unknown",
        });

        Swal.fire("Eliminado!", "Producto eliminado del carrito", "success");
      }
    });
  };

  const vaciarCarrito = (mostrarAlerta = true) => {
    if (mostrarAlerta) {
      Swal.fire({
        title: "Estás seguro que quieres vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          setCarrito([]);
          setCantidad(0);
          Swal.fire("Se vació el carrito!", "", "success");
        }
      });
    } else {
      setCarrito([]);
      setCantidad(0);
    }
  };

  return (
    <Cart.Provider
      value={{
        carrito,
        addToCart,
        eliminarProducto,
        vaciarCarrito,
        cantidad,
        setCantidad,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
