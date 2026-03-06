# THE DRIVER ERA - React Js & Professional Analytics Showcase

Proyecto E-commerce basado en los productos de la banda **The Driver Era**. Una plataforma completa donde los fans pueden explorar productos oficiales, gestionar su carrito y completar compras en tiempo real.

Este repositorio ha sido evolucionado para demostrar habilidades avanzadas de **Arquitectura de Datos y Tagging**, implementando una capa de datos (Data Layer) robusta para Google Tag Manager.

![Vite](https://img.shields.io/badge/Vite-4.4.9-brightgreen)
![React](https://img.shields.io/badge/React-18.3.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![GTM](https://img.shields.io/badge/GTM-DataLayer-blueviolet)

## Arquitectura de Analytics y Tagging

Para asegurar la integridad de los datos y la performance de la aplicación, apliqué las siguientes estrategias:

### 1. Integración Asíncrona de Conversiones (Context API)

En lugar de inyectar el código de tracking en los botones de la interfaz (JSX), centralicé los eventos de E-commerce (`add_to_cart`, `remove_from_cart`) dentro de la **Context API** de React, más precisamente en el `CartProvider.jsx`. Esto mantiene el código de UI limpio y asegura que el tracking ocurra en paralelo con la lógica de negocio.

### 2. Solución para Single Page Applications (Virtual Page Views)

Al usar React Router, las rutas cambian sin recargar la página, lo que deja a GTM "ciego". Implementé un listener en `App.jsx` que escucha `useLocation()`.

**Manejo de Race Condition (Timing Fix):**
Incluí un *delay* controlado de 100ms para asegurar que `react-helmet-async` haya actualizado el `document.title` en el DOM antes de que GTM capture el evento, garantizando que el título y el path coincidan en los reportes.

### 3. Validación de la Conversión (Purchase with Firebase Sync)

El evento `purchase` es el punto más crítico. Se dispara en el componente `<Checkout />` **únicamente tras la confirmación exitosa** de la orden en Firestore, capturando el `transaction_id` real generado por la base de datos para una reconciliación de datos 1:1.

---

## 🛠️ Características Principales

- **Navegación SPA:** Fluidez total con React Router DOM.
- **Filtros Dinámicos:** Búsqueda por categoría de productos en tiempo real.
- **Carrito Progresivo:** Persistencia de datos y cálculo de stock actualizado.
- **Comunicación Automatizada:** Integración con **EmailJS** para confirmaciones automáticas al cliente y administrador.
- **Validación de Datos:** Formularios de checkout gestionados con **React Hook Form**.
- **UX/UI:** Sistema de Loader global, alertas con **SweetAlert2** y diseño responsive con **SASS**.

## 💻 Tecnologías

- **React 18 & Vite**
- **Firebase Firestore**: Base de datos NoSQL para productos y órdenes.
- **Google Tag Manager**: Gestión profesional de eventos y DataLayer.
- **SASS / SCSS**: Estilos modulables y mantenibles.
- **Bootstrap Icons**: Mejoras visuales y estética moderna.

---

## Para testear la implementación de GTM localmente:

# Clonar repositorio
git clone https://github.com/juaneuler/the-driver-era-reactjs

# Entrar al proyecto
cd the-driver-era-reactjs

# Instalar dependencias
npm install

# Configurar GTM Preview
Abre tu contenedor de Tag Manager, activa el Preview Mode apuntando a http://localhost:5173.

# Ejecutar aplicación
npm run dev

## Despliegue

Se puede ver el sitio web desde este link

https://thedrivererashop.netlify.app/

Servidor utilizado: Netlify

## Autor

- [@Juan Euler](https://github.com/juaneuler)
