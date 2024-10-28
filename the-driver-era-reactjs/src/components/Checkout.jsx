import React, { useState, useContext } from 'react';
import { Cart as ContextoCarrito } from '../context/CartProvider';
import { db } from "../firebase/config"
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Hoja de estilos
import "../styles/checkout.scss"

const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(ContextoCarrito);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [ordenId, setOrdenId] = useState(null);
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (evento) => {
        evento.preventDefault();
        setCargando(true)

        // Genero la orden para después mandarla a Firestore
        const nuevaOrden = {
            buyer: { nombre, apellido, email, domicilio },
            items: carrito,
            total: carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0),
            timestamp: serverTimestamp()
        };

        try {
            const ordenRef = await addDoc(collection(db, 'ordenes'), nuevaOrden);
            setOrdenId(ordenRef.id);

            // Actualizo el stock
            carrito.forEach(async (producto) => {
                const productoRef = doc(db, 'productos', producto.id);
                await updateDoc(productoRef, { stock: producto.stock - producto.cantidad });
            });

            vaciarCarrito(false);
        } catch (error) {
            console.error("Error al crear la orden: ", error);
        } finally {
            setCargando(false)
        }
    };

    return (
        <div className='contenedorCheckout'>
            <h1>FINALIZAR COMPRA</h1>
            {cargando ? (
                <div>
                <h2>Aguarde mientras se genera su orden...</h2>
                </div>
            ) : ordenId ? (
                <div>
                    <h2>Gracias por tu compra! La orden es número: {ordenId}</h2>
                    <h3>En tu e-mail recibirás el comprobante de la operación</h3>
                    <h4>Una vez que tus productos estén listos para ser despachados, recibirás el número de seguimiento</h4>
                </div>
            ) : (
                <div className='contenedorFormulario'>
                    <h2>Ingrese sus datos de facturación</h2>
                    <form onSubmit={manejarSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(evento) => setNombre(evento.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(evento) => setApellido(evento.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Domicilio"
                            value={domicilio}
                            onChange={(evento) => setDomicilio(evento.target.value)}
                            required
                        />
                        <button className='botonSubmitFormulario' type="submit">Confirmar Compra</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Checkout;