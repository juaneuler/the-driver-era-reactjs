import { createContext, useState } from "react";

// Importación de la librería de Sweet Alert
import Swal from "sweetalert2";

export const Cart = createContext()

const CartProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [cantidad, setCantidad] = useState(0)

    const addToCart = (producto, cantidadProducto) => {
        const productoEnElCarrito = existeEnElCarrito(producto.id)
        console.log(productoEnElCarrito);
        console.log(cantidadProducto);
        

        let carritoActualizado = [...carrito]

        if(productoEnElCarrito){
            carritoActualizado = carrito.map(productoCarrito => {
                if(productoCarrito.id === producto.id){
                    return {
                        ...productoCarrito, cantidad: productoCarrito.cantidad + cantidadProducto
                    }
                }
                return productoCarrito
            })
        } else {
            carritoActualizado.push({...producto, cantidad: cantidadProducto})
        }
        
        setCarrito(carritoActualizado)
    }

    const existeEnElCarrito = (productoID) => {
        return carrito.some(productoCarrito => productoCarrito.id === productoID)
    }

    const eliminarProducto = (productoID) => {
        console.log("ID del producto a eliminar:", productoID);
        Swal.fire({
            title: "Estás seguro que deseas eliminar este producto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Carrito antes de la eliminación:", carrito);
                const carritoActualizado = carrito.filter(producto => producto.id !== productoID);
                console.log("Carrito después de la eliminación:", carritoActualizado);
                setCarrito(carritoActualizado);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Producto eliminado del carrito",
                    icon: "success",
                });
            }
        });
    };

    const vaciarCarrito = (mostrarAlerta = true) => {
        if (mostrarAlerta) {
            Swal.fire({
                title: "Estás seguro que quieres vaciar el carrito?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    setCarrito([]);
                    Swal.fire({
                        title: "Se vació el carrito!",
                        icon: "success",
                    });
                }
            });
        } else {
            setCarrito([]);
        }
    };

    return (
        <Cart.Provider value={{carrito, addToCart, eliminarProducto, vaciarCarrito, cantidad}}>{children}</Cart.Provider>

    )
}

export default CartProvider