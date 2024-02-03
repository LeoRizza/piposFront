import { useState, useEffect } from "react";
import { getCookiesByName } from "../Utils/FormsUtils.js";
import './Checkout.css';

const Checkout = () => {
    const [checkoutResponse, setCheckoutResponse] = useState({});
    const [cartId, setCartId] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
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
            const userName = userData.user.first_name;
            const userApellido = userData.user.last_name;
            setCartId(userCartId);
            setNombre(userName);
            setApellido(userApellido);
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
                    const responseData = await response.json();
                    console.log(responseData)
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
                {checkoutResponse.payload && checkoutResponse.payload.ticket && (
                    <div className="ticket">
                        Muchas gracias por confiar en nosotros {nombre} {apellido}
                        <h5><b>Monto Total</b>: ${checkoutResponse.payload.ticket.amount}</h5>
                        <h5><b>Codigo</b>: {checkoutResponse.payload.ticket.code}</h5>
                        <h5><b>Fecha de compra</b>: {checkoutResponse.payload.ticket.purchase_datetime}</h5>
                        <h6>Se ha enviado un mail con esta informacion a {checkoutResponse.payload.ticket.purchaser}</h6>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
