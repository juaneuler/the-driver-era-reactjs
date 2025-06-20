import React, { useState, useContext } from 'react';
import { Cart as ContextoCarrito } from '../context/CartProvider';
import { db } from "../firebase/config"
import { collection, addDoc, updateDoc,doc, serverTimestamp } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'

// Hoja de estilos
import "../styles/checkout.scss"

// Componente para los inputs
import InputFormulario from './InputFormulario';


const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(ContextoCarrito);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState('');
    const [telefono, setTelefono] = useState('')
    const [domicilio, setDomicilio] = useState('');
    const [ordenId, setOrdenId] = useState(null);
    const [estadoOrden, setEstadoOrden] = useState('generada')
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (evento) => {
        evento.preventDefault();

        // Verificamos que los emails coincidan antes de generar la orden
        if (email !== confirmarEmail) {
            Swal.fire({
                title: "Error!",
                text: "Los emails ingresados no coinciden",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return
        }

        // Verificamos que en el campo "Teléfono" se ingresen solamente números antes de generar la orden
        if (!telefono || telefono.length < 10 || isNaN(telefono)) {
            Swal.fire({
                title: "Error!",
                text: "Por favor, ingrese un número de teléfono válido (solo números y los 10 dígitos sin el 0 al principio)",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        setCargando(true)

        // Genero la orden para después mandarla a Firestore
        const nuevaOrden = {
            buyer: { nombre, apellido, email, telefono, domicilio },
            items: carrito,
            total: carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0),
            timestamp: serverTimestamp(),
            estado: estadoOrden
        };

        try {
            const ordenRef = await addDoc(collection(db, 'ordenes'), nuevaOrden);
            setOrdenId(ordenRef.id);

            // Actualizo el stock
            for (const producto of carrito) {
                const productoRef = doc(db, 'productos', producto.id);

                // Si el stock es un producto que tiene talle
                if (typeof producto.stock === "object" && producto.talle) {
                    // Copio el stock actual
                    const nuevoStock = { ...producto.stock };
                    // Restamos la cantidad solo al talle que se haya comprado
                    nuevoStock[producto.talle] = Math.max(0, (nuevoStock[producto.talle] || 0) - producto.cantidad);

                    await updateDoc(productoRef, { stock: nuevoStock });
                } else if (typeof producto.stock === "number") {
                    // Actualizamos el stock si el producto es simple
                    await updateDoc(productoRef, { stock: Math.max(0, producto.stock - producto.cantidad) });
                }
            }

            vaciarCarrito(false);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Ocurrió un error al crear la orden: " + error.message,
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        } finally {
            setCargando(false)
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout | THE DRIVER ERA SHOP</title>
            </Helmet>
            <div className='contenedorCheckout'>
                <h1>FINALIZAR COMPRA</h1>
                {cargando ? (
                    <div>
                        <h2>Aguarde mientras se genera su orden...</h2>
                    </div>
                ) : ordenId ? (
                    <div>
                        <h2>Gracias por tu compra! La orden es número: {ordenId}</h2>
                        <h3>Una vez que tus productos estén listos para ser despachados, recibirás el número de seguimiento</h3>
                    </div>
                ) : (
                    <div className='contenedorFormulario'>
                        <h2>Ingrese sus datos de facturación</h2>
                        <form onSubmit={manejarSubmit}>
                            <InputFormulario
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(evento) => setNombre(evento.target.value)}
                                required
                            />
                            <InputFormulario
                                type="text"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(evento) => setApellido(evento.target.value)}
                                required
                            />
                            <InputFormulario
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(evento) => setEmail(evento.target.value)}
                                required
                            />
                            <InputFormulario
                                type="email"
                                placeholder="Confirmar Email"
                                value={confirmarEmail}
                                onChange={(evento) => setConfirmarEmail(evento.target.value)}
                                required
                            />
                            <InputFormulario
                                type="tel"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(evento) => setTelefono(evento.target.value)}
                                required
                            />
                            <InputFormulario
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
        </>
    );
};

export default Checkout;