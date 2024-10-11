import React from 'react'

// Hoja de estilos
import "../styles/notfound.scss"

const NotFound = () => {
    return (
        <div className='notFound'>
            <h2>Error 404: ruta no encontrada</h2>
            <h3>Seguro que ingresaste bien la URL?</h3>
        </div>
    )
}

export default NotFound