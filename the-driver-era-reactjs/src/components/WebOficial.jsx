import React from 'react'
import fotoWeb from "../assets/FotoWebOficial.jpg"

const WebOficial = () => {
    return (
        <div className='contenedorWeb'>
            <h1>THE DRIVER ERA - SITIO OFICIAL</h1>
            <h2>Conocé más de la banda</h2>
            <a href="https://juaneuler-thedriverera.netlify.app/" target="_blank" rel="noopener noreferrer">
                <img src={fotoWeb} alt="Foto de Ross y Rocky" className='fotoWeb animate__animated animate__fadeInUp'/>
            </a>
        </div>
    )
}

export default WebOficial