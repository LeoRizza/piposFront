import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import './Login.css';

export const Login = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm)

        const response = await fetch('https://backendtiendapipos.onrender.com/api/sessions/login', {
            method: 'POST',
            headers: {
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
        <div className="loginContainer">
            <h3>Login</h3>
            <Form onSubmit={handleSumbit} ref={formRef}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Ingresa email" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Ingresa password" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Iniciar Sesion
                </Button>

            </Form>
            <NavLink className="registerBtn" to="/register"><Button variant="success" type="submit">
                    Register
                </Button></NavLink>
        </div>
    )
}

export default Login