import React from 'react'
import fotoPortada from "../assets/fotoPortada.jpg";

const Portada = () => {
    return (
        <div className='contenedorEncabezados'>
            <h1>THE DRIVER ERA - OBSESSION TOUR 2025</h1>
            <h2>Tickets a la venta!!!</h2>
            <a href="https://www.thedriverera.com/tour/" target='_blank' rel="noopener noreferrer">
                <img src={fotoPortada} alt="Foto Obsession Tour 2025" className='fotoPortada animate__animated animate__fadeInUp' />
            </a>
        </div>
    );
};
export default Portada