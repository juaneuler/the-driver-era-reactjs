// Componente de la barra de navegación

import React from 'react'

// Hoja de estilos
import '../styles/navbar.scss'

// Ícono de la tienda
import brandIcon from '../assets/brandIcon.jpg'

// Importación del componente carrito
import CartWidget from './CartWidget'

const NavBar = () => {
    return (
        <div className="navbar">
            <img src={brandIcon} alt='logo' style={{ width: 80 }} />
            <ul>
                <li>Merch Tour 2024</li>
                <li>Musica</li>
                <CartWidget />
            </ul>
        </div>
    )
}

export default NavBar