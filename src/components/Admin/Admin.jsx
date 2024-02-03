import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCookiesByName } from '../Utils/FormsUtils.js';
import './Admin.css';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({
        _id: null,
        title: '',
        description: '',
        price: 0,
        stock: 0,
        code: '',
        category: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        const token = getCookiesByName('jwtCookie')

        try {
            const response = await fetch('https://backendtiendapipos.onrender.com/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });

            const usuarios = await response.json();
            const data = usuarios.mensaje;
            console.log(data)

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('La respuesta no tiene la estructura esperada');
            }
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
        }
    };


    const handleShowUsers = () => {
        fetchUsers();
    };

    const fetchProduct = async (page) => {
        try {
            const response = await fetch(`https://backendtiendapipos.onrender.com/api/products?limit=100&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data && Array.isArray(data.products)) {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } else {
                console.error('La respuesta no tiene la estructura esperada');
            }

        } catch (error) {
            console.error('Error al obtener el detalle del producto:', error);
        }
    };

    useEffect(() => {
        fetchProduct(currentPage);
    }, [currentPage]);

    const handleProductChange = (productId) => {
        const selected = products.find(product => product._id === productId);
        setSelectedProduct(selected || {
            _id: null,
            title: '',
            description: '',
            price: 0,
            stock: 0,
            code: '',
            category: ''
        });
    };

    const handleDeleteProduct = async () => {
        const token = getCookiesByName('jwtCookie')

        if (!selectedProduct._id) {
            console.error('No se ha seleccionado ningún producto para eliminar');
            return;
        }

        try {
            const response = await fetch(`https://backendtiendapipos.onrender.com/api/products/${selectedProduct._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(`Producto con ID ${selectedProduct._id} eliminado exitosamente`);
                // Actualizar la lista de productos después de eliminar
                fetchProduct(currentPage);
                setSelectedProduct({
                    _id: null,
                    title: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    code: '',
                    category: ''
                });
            } else {
                console.error('Error al eliminar el producto:', response.status);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Administrador</h2>
            <div className='adminMenu'>

                <div className='optionAdmin'>
                    <h3>Ingresar Productos</h3>
                    <NavLink className='adminBtn' to="/newProducts">Nuevo Producto</NavLink>
                </div>
                <br />
                <div className='optionAdmin'>
                    <div>
                        <h3>Borrar Productos</h3>
                        <div>
                            <select onChange={(e) => handleProductChange(e.target.value)}>
                                <option value="" disabled defaultValue>Seleccione un producto</option>
                                {products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        {/* <div className="pagination">
                            {[...Array(totalPages).keys()].map((number) => (
                                <span key={number + 1} className={currentPage === number + 1 ? 'active' : ''} onClick={() => handlePageChange(number + 1)}>
                                    {number + 1}
                                </span>
                            ))}
                        </div> */}
                    </div>
                    {selectedProduct._id && (
                        <div className='divBorrar'>
                            <h3>Detalles del Producto</h3>
                            <p>Title: {selectedProduct.title}</p>
                            <p>Description: {selectedProduct.description}</p>
                            <p>Price: {selectedProduct.price}</p>
                            <p>Stock: {selectedProduct.stock}</p>
                            <p>Code: {selectedProduct.code}</p>
                            <p>Category: {selectedProduct.category}</p>
                            <button className='adminBtn' onClick={handleDeleteProduct}>Eliminar Producto</button>
                        </div>
                    )}
                </div>
                <div className='optionAdmin'>
                    <h3>Usuarios</h3>
                    <button className='adminBtn' onClick={handleShowUsers}>Mostrar usuarios</button>
                    {users.length > 0 && (
                        <ul>
                            {users.length > 0 && (
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
