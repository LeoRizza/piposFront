import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCookiesByName } from '../Utils/FormsUtils.js';
import './NavBar.css';

const NavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const cerrarMenu = () => {
        setMenuVisible(false);
    };

    const abrirMenu = () => {
        setMenuVisible(true);
    };

    const logoutRoute = async () => {
        const token = getCookiesByName('jwtCookie')

        const logoutResponse = await fetch('https://backendtiendapipos.onrender.com/api/sessions/logout', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (logoutResponse.ok) {
            document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            console.log('Logout exitoso');
        } else {
            console.error('Error al cerrar session:', logoutResponse.status);
        }

    };

    return (
        <header>
            <Link className='logo' to="/">
                <img className='logoNav' src="../img/logo2.png" alt="" />
                <h1>Pipos</h1>
            </Link>

            <nav className={`nav ${menuVisible ? 'visible' : ''}`}>
                <button className='cerrarMenu' onClick={cerrarMenu}><img className='icono' src="../img/close.png" alt="close" /></button>
                <ul className='navl'>
                    <NavLink className="session" to="/login"><img className='icono' src="../img/account.svg" alt="session" />iniciar session</NavLink>
                    <NavLink className="logout" to="/" onClick={logoutRoute}><img className='icono' src="../img/logout.svg" alt="session" />cerrar session</NavLink>
                    <li>
                        <NavLink className="estiloCat" to="/products/camisetas">Camisetas</NavLink>
                    </li>
                    <li>
                        <NavLink className="estiloCat" to="/products/pantalones">Pantalones</NavLink>
                    </li>
                    <li>
                        <NavLink className="estiloCat" to="/products/camperas">Camperas</NavLink>
                    </li>
                </ul>
            </nav>

            <button className='abrirMenu' onClick={abrirMenu}><img className='icono' src="../img/burger.png" alt="cuenta" /></button>
        </header>
    );
};

export default NavBar;
