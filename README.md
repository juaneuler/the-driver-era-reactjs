
# THE DRIVER ERA - React Js

Proyecto E-commerce basado en los productos de la banda **The Driver Era**, donde los fans pueden explorar productos oficiales, agregarlos al carrito y completar compras en línea!

![Vite](https://img.shields.io/badge/Vite-4.4.9-brightgreen)
![React](https://img.shields.io/badge/React-18.3.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)


## Autor

- [@Juan Euler](https://github.com/juaneuler)


## Uso

Los usuarios pueden navegar y ver productos, filtrar por categoría, agregarlos al carrito, y realizar compras. El método de confirmación es mediante SweetAlert2.

Los productos se renderizan desde el array almacenado en Firestore. La colección es "productos".

Cuando se genere una orden, se enviará a la colección de Firestore llamada "órdenes".


### Características Principales

- Navegación SPA con React Router DOM.
- Filtros dinámicos por categoría de productos.
- Carrito de compras con cantidad y precio actualizado en tiempo real.
- Confirmación de órdenes mediante SweetAlert2.
- Integración con Firestore para persistencia de productos y órdenes.
- Sistema de Loader global para mejorar la percepción de carga.
- Responsive design con SASS y CSS moderno.


### Tecnologías

- **React 18**: Librería para construir interfaces de usuario.
- **Vite**: Entorno de desarrollo rápido y ligero.
- **React Router DOM**: Navegación SPA sin recargar páginas.
- **SASS / SCSS**: Para estilos modulables y mantenibles.
- **Firebase Firestore**: Base de datos NoSQL para productos y órdenes.
- **SweetAlert2**: Alertas y confirmaciones personalizadas.
- **Animate.css**: Animaciones para mejorar UX.
- **Bootstrap Icons**: Íconos para redes sociales en el footer.


## Despliegue

Se puede ver el sitio web desde este link

https://thedrivererashop.netlify.app/

Servidor utilizado: Netlify


## Para ver el proyecto localmente (se necesita tener Node Js instalado para ejecutar los comandos de NPM)

# Clonar repositorio
git clone https://github.com/juaneuler/the-driver-era-reactjs

# Entrar al proyecto
cd the-driver-era-reactjs

# Instalar dependencias
npm install

# Ejecutar aplicación
npm run dev