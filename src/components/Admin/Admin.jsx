import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    return (
        <div className='adminMenu'>
            <h2>Administrador</h2>
            <NavLink className='adminBtn' to="/newProducts">Ingresar Producto</NavLink>
            <NavLink className='adminBtn'>Eliminar Producto</NavLink>
        </div>
    )
}

export default Admin