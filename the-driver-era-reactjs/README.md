
# THE DRIVER ERA - React Js

Este proyecto es un E-commerce basado en los productos de la banda The Driver Era.


## Autor

- [@Juan Euler](https://github.com/juaneuler)


## Uso

Los usuarios pueden navegar y ver productos, filtar por categoría, agregarlos al carrito, y realizar compras. El método de confirmación es mediante SweetAlert2.

Los productos se renderizan desde el array almacenaro en Firestore. La colección es "productos".

Cuando se genere una orden, se enviará a la colección de Firestore llamada "órdenes".


## Tecnologías usadas

- **VITE**: Se creó la aplicación usando este entorno de desarrollo. Es la mejor elección porque es un entorno más rápido, y a la vez, sólo instala las dependencias necesarias (a diferencia de Create React App, que las instala todas). Además, Vite realiza empaquetado por módulos (otra diferencia respecto a CRA), lo que también contribuye a hacer el proyecto más ligero.
- **React Router DOM**: Se usó para la navegación entre páginas. Esta herramienta permite generar URLs más limpias. Además, permite usar el botón "atrás" del navegador y no resetear los estados de la aplicación.
- **Bootstrap Icons**: Íconos para redes sociales en el componente Footer. Elegí esta herramienta porque permite hacer una experiencia de usuario más amena que simples links con texto plano.
- **Animate Style CSS**: Librería para animaciones. Las usé para dar un poco más de vida a los componentes "Portada" y "WebOficial" que se muestran en home. Ayuda a que el sitio no se vea tan estático. (Se pegó el link de CSS en el documento index.html)
- **SweetAlert2**: Librería para mostrar alertas y confirmaciones de acciones. Es una opción simple para mejorar la experiencia del usuario en lugar de las alertas clásicas de navegador. Permite que la información dada no pase desapercibida.
- **Firestore**: Se usó el servicio incluido en Firebase para almacenar el array de productos y ver las órdenes de compra generadas.
- **SASS**: Instalado para utilizar SCSS (no modular). Es la mejor opción para tener un código más limpio y no comprimir todo en un solo archivo CSS.


## Despliegue

Se puede ver el sitio web desde este link



Servidor utilizado: Netlify


## Para ver el proyecto localmente

1) Clonar el repositorio
git clone https://github.com/juaneuler/the-driver-era-reactjs

2) Navegar al directorio del proyecto
cd the-driver-era-reactjs

3) Instalar las dependencias
npm install

4) Ejecutar la aplicación (Vite)
npm run dev