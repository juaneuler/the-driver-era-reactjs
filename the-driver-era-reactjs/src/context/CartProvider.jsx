import { createContext, useState } from "react";

export const Cart = createContext()

const CartProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [cantidad, setCantidad] = useState(0)

    const addToCart = (producto, cantidadProducto) => {
        const productoEnElCarrito = existeEnElCarrito(producto.ID)
        console.log(productoEnElCarrito);
        console.log(cantidadProducto);
        

        let carritoActualizado = [...carrito]

        if(productoEnElCarrito){
            carritoActualizado = carrito.map(productoCarrito => {
                if(productoCarrito.ID === producto.ID){
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
        return carrito.some(productoCarrito => productoCarrito.ID === productoID)
    }

    const eliminarProducto = (productoID) => {
        const carritoActualizado = carrito.filter(producto => producto.ID !== productoID)
        setCarrito(carritoActualizado)
    }

    const vaciarCarrito = () => {
        setCarrito([])
    }

    return (
        <Cart.Provider value={{carrito, addToCart, eliminarProducto, vaciarCarrito, cantidad}}>{children}</Cart.Provider>

    )
}

export default CartProvider