import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../Utils/FormsUtils.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './NewProducts.css';

export default function NewProducts() {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleNewProducts = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')

        const response = await fetch('https://backendtiendapipos.onrender.com/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status == 200) {
            const datos = await response.json()
            document.cookie = `jwtCookie=${datos.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
            navigate('/products')
        } else {
            console.log(response)
        }
    }

    return (
        <div className="NewProductsContainer">
            <h3>Ingresar Nuevo Producto</h3>
            <br />
            <Form onSubmit={handleNewProducts} ref={formRef}>
                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Titulo</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Nombre del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Descripcion</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Descripcion del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Precio</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Ingresa precio del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Stock</Form.Label>
                    <Form.Control type="number" name="stock" placeholder="Ingresa Stock" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Categoria</Form.Label>
                    <Form.Control type="text" name="category" placeholder="Ingresa categoria del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Codigo</Form.Label>
                    <Form.Control type="text" name="code" placeholder="Ingresa codigo del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="productoLabel">Thumbnails</Form.Label>
                    <Form.Control type="text" name="thumbnails" placeholder="Ingresa Url de la imagen del producto" />
                </Form.Group>

                <button className="adminBtn" variant="success" type="submit">
                    Crear producto
                </button>
            </Form>
        </div>
    )
}
