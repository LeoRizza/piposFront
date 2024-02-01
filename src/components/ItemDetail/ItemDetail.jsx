import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link, useParams } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { getCookiesByName } from "../Utils/FormsUtils.js";
import './ItemDetail.css';

const ItemDetail = () => {
    const [product, setProduct] = useState({});
    const [agregarCant, setAgregarCantidad] = useState(0);
    const [cartId, setCartId] = useState(null);
    const { idItem } = useParams();
    const token = getCookiesByName('jwtCookie');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://backendtiendapipos.onrender.com/api/products/${idItem}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener el detalle del producto:', error);
            }
        };

        const fetchCartId = async () => {
            try {
                const response = await fetch('https://backendtiendapipos.onrender.com/api/sessions/current', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                });
                const userData = await response.json();
                const userCartId = userData.user.cart;
                setCartId(userCartId);
            } catch (error) {
                console.error('Error al obtener el ID del carrito:', error);
            }
        };

        fetchProduct();
        fetchCartId();
    }, [idItem]);

    const handlerCant = (cantidad) => {
        setAgregarCantidad(cantidad);
    };

    const addToCart = (cantidad) => {
        // Aquí puedes realizar la solicitud POST para agregar el producto al carrito
        if (cartId && idItem) {
            const url = `https://backendtiendapipos.onrender.com/api/carts/${cartId}/products/${idItem}`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: cantidad, 
                }),
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Producto agregado al carrito:', data);
                    // Puedes redirigir al usuario a la página del carrito u otra página aquí
                })
                .catch(error => {
                    console.error('Error al agregar el producto al carrito:', error);
                });
        } else {
            console.error('ID del carrito o del producto no encontrado');
        }
    };

    return (
        <div>
            {Object.keys(product).length > 0 ? (
                <Card style={{ background: "rgb(240, 241, 222)" }}>
                    <Image className="imgDetalle" src={product.thumbnails[0]} fluid />
                    <Card.Body className="cardDetalle2">
                        <Card.Title style={{ fontSize: '2em' }}>{product.title}</Card.Title>
                        Código: {product.code}
                        <br />
                        {product.description}
                        <br />
                        <strong>Precio: $ {product.price} </strong>
                        <br />
                        <strong>Stock: {product.stock} unidades</strong>
                    </Card.Body>
                </Card>
            ) : (
                <p>Cargando...</p>
            )}
            <div className="itemDetailDiv">
                {
                    agregarCant > 0 ? (
                        <Link to="/cart" className="terminarCompra">Terminar</Link>
                    ) : (
                        <ItemCount inicial={1} stock={product.stock} funcionAgregar={handlerCant} addToCart={addToCart} />
                    )
                }
                <Link to="/" className="continuarCompra">Continuar Compra</Link>
            </div>
        </div>
    );
};

export default ItemDetail;
