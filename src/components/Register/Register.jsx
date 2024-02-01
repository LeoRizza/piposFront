import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import './Register.css';

const Register = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm)

        const response = await fetch('https://backendtiendapipos.onrender.com/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
        } else {
            console.log(response)
        }
    }
    return (
        <div className="RegisterContainer">
            <h3>Registrarse</h3>
            <Form onSubmit={handleRegister} ref={formRef}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Ingresa email" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Ingresa Password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" name="age" placeholder="Ingresa Edad" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="first_name" placeholder="Ingresa Nombre" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="last_name" placeholder="Ingresa Apellido" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Registrarme
                </Button>
            </Form>
        </div>
    )
}

export default Register