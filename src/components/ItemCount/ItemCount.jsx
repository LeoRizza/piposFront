import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ inicial, stock, funcionAgregar, addToCart }) => {
    const [contador, setContador] = useState(inicial)

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }

    const agregarAlCarrito = () => {
        funcionAgregar(contador);
        addToCart(contador); // Llamar a addToCart con la cantidad actual
    };

    return (
        <div className='divAgregar'>
            <div className='contadore'>
                <button onClick={decrementar}>-</button>
                <p> {contador} </p>
                <button onClick={incrementar}>+</button>
            </div>
            <button className='agregarButton' onClick={agregarAlCarrito}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount
