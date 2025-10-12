import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_CLIENTE = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENTE;
const TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;

/**
 * Envía el email al cliente
 * @param {Object} params - { ordenId, buyer, items, total }
 */
export const enviarMailCliente = async ({ ordenId, buyer, items, total }) => {
    try {
        const templateParams = {
            buyer_email: buyer.email, // se usa para el "To Email"
            buyer_email_text: buyer.email, // se usa para renderizar en el cuerpo del mail
            nombre: buyer.nombre,
            apellido: buyer.apellido,
            orden_id: ordenId,
            total: `$${total}`,
            productos_html: items
                .map(item => `${item.nombre} x${item.cantidad} - U$D ${item.precio}`)
                .join('\n')
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_CLIENTE, templateParams, PUBLIC_KEY);
    } catch (error) {
        console.error('Error enviando email al cliente:', error);
    }
};

/**
 * Envía el email al admin
 * @param {Object} params - { ordenId, buyer, items, total }
 */
export const enviarMailAdmin = async ({ ordenId, buyer, items, total }) => {
    try {
        const templateParams = {
            nombre: buyer.nombre,
            apellido: buyer.apellido,
            email: buyer.email,
            telefono: buyer.telefono,
            domicilio: buyer.domicilio,
            orden_id: ordenId,
            total: `$${total}`,
            productos_html: items
                .map(item => `${item.nombre} x${item.cantidad} - U$D ${item.precio}`)
                .join('\n'),
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, templateParams, PUBLIC_KEY);
    } catch (error) {
        console.error('Error enviando email al admin:', error);
    }
};