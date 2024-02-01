import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import './ItemListContainer.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { category } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let apiUrl = 'https://backendtiendapipos.onrender.com/api/products';

                const queryParams = {
                    category: category || '',
                    ...queryString.parse(location.search),
                };

                const response = await fetch(`${apiUrl}?${queryString.stringify(queryParams)}`);
                const data = await response.json();

                if (data && data.products) {
                    setProductos(data.products);
                } else if (Array.isArray(data)) {
                    setProductos(data);
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "products".', data);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, location.search]);

    return (
        <div>
            <div className="divTitle">
                <img className="logoSabroso" src="../img/logo.png" alt="logo sabroson" />
            </div>
            {productos && productos.length > 0 ? (
                <ItemList productos={productos} loading={loading} />
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
}

export default ItemListContainer;
