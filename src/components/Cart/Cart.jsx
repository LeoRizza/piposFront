import { useState, useEffect } from "react";
import { getCookiesByName } from "../Utils/FormsUtils.js";
import { Link } from "react-router-dom";
import './Cart.css';

const Cart = () => {
    const [cartId, setCartId] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const token = getCookiesByName('jwtCookie');

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

    const getCart = async () => {
        try {
            const response = await fetch(`https://backendtiendapipos.onrender.com/api/carts/${cartId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            });
            const cartData = await response.json();
            const products = cartData.mensaje.products;
            setCartProducts(products);

            const totalAmount = products.reduce((acc, product) => {
                return acc + (product.id_prod.price * product.quantity);
            }, 0);
            setTotal(totalAmount);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    useEffect(() => {
        fetchCartId();
    }, []);

    useEffect(() => {
        if (cartId) {
            getCart();
        }
    }, [cartId]);

    return (
        <div className="divCart">
            <h1 className="precioTotal">Carrito</h1>
            <div>
                <ul>
                    {cartProducts.map(product => (
                        <div key={product._id} className="itemCart">
                            <img className="imgCart" src={product.id_prod.thumbnails} alt={product.id_prod.title} />
                            <div>
                                <h4> {product.id_prod.title} </h4>
                                <h6> Cantidad: {product.quantity}</h6>
                                <h6> Precio: ${product.id_prod.price} </h6>
                            </div>
                        </div>
                    ))}
                </ul>
                <h3 className="precioTotal">Total: $ {total}</h3>
            </div>
            
            <Link to="/checkout" className="cartButton"> Finalizar Compra </Link>
        </div>
    );
};

export default Cart;
