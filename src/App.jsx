import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import NewProducts from './components/Products/NewProducts'
import NavBar from "./components/NavBar/NavBar"
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import './App.css'


const App = () => {
  return (
    <>
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/products" element={<ItemListContainer />} />
            <Route path="/products/:category" element={<ItemListContainer />} />
            <Route path="/item/:idItem" element={<ItemDetailContainer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/newproducts" element={<NewProducts />} />
            <Route path="*" element={<h2>Sitio en Construccion</h2>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
