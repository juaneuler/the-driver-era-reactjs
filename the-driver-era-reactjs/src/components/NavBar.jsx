// Componente de la barra de navegación

import React from 'react'

// Hoja de estilos
import '../styles/navbar.scss'

// Ícono de la tienda
import brandIcon from '../assets/brandIcon.png'

// Importación del componente carrito
import CartWidget from './CartWidget'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbar">
            <NavLink to={"/"}>
                <img src={brandIcon} className='logo' alt='logo' style={{ width: 140 }} />
            </NavLink>
            <ul>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? 'isActive' : 'notActive')}
                        to={"/"}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? 'isActive' : 'notActive')}
                        to={"/category/merch"}
                    >
                        Merch Tour 2024
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? 'isActive' : 'notActive')}
                        to={"/category/musica"}
                    >
                        Música
                    </NavLink>
                </li>
                <CartWidget />
            </ul>
        </div>
    )
}

export default NavBar