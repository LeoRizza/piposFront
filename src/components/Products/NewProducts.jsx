import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../Utils/FormsUtils.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            <Form onSubmit={handleNewProducts} ref={formRef}>
                <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Nombre del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Descripcion del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Ingresa precio del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" placeholder="Ingresa Stock" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" name="category" placeholder="Ingresa categoria del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control type="text" name="code" placeholder="Ingresa codigo del producto" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Thumbnails</Form.Label>
                    <Form.Control type="text" name="thumbnails" placeholder="Ingresa Url de la imagen del producto" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Crear producto
                </Button>
            </Form>
        </div>
    )
}
