import React from 'react'
import '../styles/navbar.scss'
import brandIcon from '../assets/brandIcon.jpg'
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