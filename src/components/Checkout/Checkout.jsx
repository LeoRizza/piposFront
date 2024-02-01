import { useState, useEffect } from "react";
import { getCookiesByName } from "../Utils/FormsUtils.js";
import './Checkout.css';

const Checkout = () => {
    const [checkoutResponse, setCheckoutResponse] = useState({});
    const [cartId, setCartId] = useState(null);
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
            console.error('Error al obtener el ID de cart:', error);
        }
    };

    useEffect(() => {
        fetchCartId();
    }, []);

    useEffect(() => {
        if (cartId) {
            const fetchCheckoutResponse = async () => {
                try {
                    const response = await fetch(`https://backendtiendapipos.onrender.com/api/carts/${cartId}/purchase`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json'
                        },
                    });
                    console.log(response)
                    const responseData = await response.json();
                    setCheckoutResponse(responseData);
                } catch (error) {
                    console.error('Error al obtener la respuesta del checkout:', error);
                }
            };

            fetchCheckoutResponse();
        }
    }, [cartId, token]);

    return (
        <div className="checkoutContainer">
            <h1>Informacion de compra</h1>
            <div>
                <p>{checkoutResponse.respuesta}</p>
                <p>{checkoutResponse.mensaje}</p>
            </div>
        </div>
    );
};

export default Checkout;
