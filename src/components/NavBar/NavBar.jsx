import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCookiesByName } from '../Utils/FormsUtils.js';
import './NavBar.css';

const NavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [userRol, setRol] = useState(null);

    const cerrarMenu = () => {
        setMenuVisible(false);
    };

    const abrirMenu = () => {
        setMenuVisible(true);
    };

    const userInfo = async () => {
        const token = getCookiesByName('jwtCookie')

        if (token) {
            try {
                const response = await fetch('https://backendtiendapipos.onrender.com/api/sessions/current', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                });
                const userData = await response.json();
                const userRol = userData.user.rol;
                setRol(userRol);
            } catch (error) {
                console.error('Error', error);
            }
        }
    };

    useEffect(() => {
        userInfo();
    }, []);

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
                    <NavLink className={`session ${!getCookiesByName('jwtCookie') ? '' : 'visibilityNone'}`} to="/login"><img className='icono' src="../img/account.svg" alt="session" />iniciar session</NavLink>
                    <NavLink className={`logout ${getCookiesByName('jwtCookie') ? '' : 'visibilityNone'}`} to="/" onClick={logoutRoute}><img className='icono' src="../img/logout.svg" alt="session" />cerrar session</NavLink>
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
            {userRol === 'admin' && (
                    <NavLink className={`admin ${!getCookiesByName('jwtCookie') ? 'visibilityNone' : ''}`} to="/admin">
                        Admin<img className='icono' src="../img/admins.svg" alt="admin logo" />
                    </NavLink>
                )}
            <div className='divCartBurger'>
                <NavLink className={`cartIcon ${!getCookiesByName('jwtCookie') ? 'visibilityNone' : ''}`} to="/cart"><img className='icono' src="../img/carrito.svg" alt="cart" /></NavLink>
                <button className='abrirMenu' onClick={abrirMenu}><img className='icono' src="../img/burger.png" alt="cuenta" /></button>
            </div>
        </header>
    );
};

export default NavBar;