import React, { useContext, useEffect, useState } from "react";
import { Cart as ContextoCarrito } from "../context/CartProvider";
import { db } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import "../styles/checkout.scss";
import InputFormulario from "./InputFormulario";
import { useForm } from "react-hook-form";
import PantallaNegra from "./PantallaNegra";
import { useLoader } from "../context/LoaderProvider";
import DetalleOrden from "./DetalleOrden";
import { enviarMailCliente, enviarMailAdmin } from "../services/emailService";

const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(ContextoCarrito);
    const [ordenId, setOrdenId] = useState(null);
    const [estadoOrden] = useState("generada");
    const [cargando, setCargando] = useState(true); // loader inicial activado
    const [ordenItems, setOrdenItems] = useState([]);
    const [ordenTotal, setOrdenTotal] = useState(0);
    const [buyer, setBuyer] = useState(null);
    const { showLoader, hideLoader } = useLoader();

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email = watch("email");

    // Loader inicial
    useEffect(() => {
        showLoader();
        const timer = setTimeout(() => {
            setCargando(false);
            hideLoader();
        }, 500); // Duración inicial
        return () => clearTimeout(timer);
    }, []);

    const manejarSubmit = async (data) => {
        const { nombre, apellido, email, telefono, domicilio, emailConfirmacion } = data;

        if (email !== emailConfirmacion) {
            Swal.fire({
                title: "Error!",
                text: "Los emails ingresados no coinciden",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        const buyerData = { nombre, apellido, email, telefono, domicilio };
        setBuyer(buyerData);

        // Loader para submit
        setCargando(true);
        showLoader();

        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setOrdenItems(carrito);
        setOrdenTotal(total);

        const nuevaOrden = {
            buyer: buyerData,
            items: carrito,
            total,
            timestamp: serverTimestamp(),
            estado: estadoOrden,
        };

        try {
            const ordenRef = await addDoc(collection(db, "ordenes"), nuevaOrden);
            setOrdenId(ordenRef.id);

            // Enviar mails al cliente y admin
            await Promise.all([
                enviarMailCliente({ ordenId: ordenRef.id, buyer: buyerData, items: carrito, total }),
                enviarMailAdmin({ ordenId: ordenRef.id, buyer: buyerData, items: carrito, total }),
            ]);

            // Actualizar stock
            for (const producto of carrito) {
                const productoRef = doc(db, "productos", producto.id);
                if (typeof producto.stock === "object" && producto.talle) {
                    const nuevoStock = { ...producto.stock };
                    nuevoStock[producto.talle] = Math.max(0, (nuevoStock[producto.talle] || 0) - producto.cantidad);
                    await updateDoc(productoRef, { stock: nuevoStock });
                } else if (typeof producto.stock === "number") {
                    await updateDoc(productoRef, { stock: Math.max(0, producto.stock - producto.cantidad) });
                }
            }

            vaciarCarrito(false);

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Ocurrió un error al crear la orden: " + error.message,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } finally {
            setCargando(false);
            hideLoader();
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout | THE DRIVER ERA SHOP</title>
            </Helmet>

            {/* Loader */}
            {cargando && <PantallaNegra />}

            <div className="contenedorCheckout">
                {!ordenId && <h1>FINALIZAR COMPRA</h1>}

                {/* Detalle de la orden */}
                {ordenId && <DetalleOrden ordenId={ordenId} buyer={buyer} items={ordenItems} total={ordenTotal} />}

                {/* Formulario */}
                {!ordenId && !cargando && (
                    <div className="contenedorFormulario">
                        <h2>Ingrese sus datos de facturación</h2>
                        <form onSubmit={handleSubmit(manejarSubmit)}>
                            <InputFormulario
                                label="Nombre"
                                name="nombre"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "El nombre es obligatorio",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 40, message: "Máximo 40 caracteres" },
                                }}
                            />
                            <InputFormulario
                                label="Apellido"
                                name="apellido"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "El apellido es obligatorio",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 40, message: "Máximo 40 caracteres" },
                                }}
                            />
                            <InputFormulario
                                label="Email"
                                name="email"
                                type="email"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "El email es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Formato de email inválido",
                                    },
                                }}
                            />
                            <InputFormulario
                                label="Confirmar Email"
                                name="emailConfirmacion"
                                type="email"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "Confirmar email es obligatorio",
                                    validate: (value) => value === email || "Los mails ingresados no coinciden",
                                }}
                            />
                            <InputFormulario
                                label="Teléfono"
                                name="telefono"
                                type="tel"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "El teléfono es obligatorio",
                                    pattern: { value: /^[0-9]+$/, message: "Solo números" },
                                    minLength: { value: 10, message: "Debe tener 10 dígitos" },
                                    maxLength: { value: 10, message: "Debe tener 10 dígitos" },
                                }}
                            />
                            <InputFormulario
                                label="Domicilio"
                                name="domicilio"
                                register={register}
                                errors={errors}
                                validation={{
                                    required: "El domicilio es obligatorio",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 50, message: "Máximo 50 caracteres" },
                                }}
                            />
                            <button className="botonSubmitFormulario" type="submit">
                                Confirmar Compra
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;