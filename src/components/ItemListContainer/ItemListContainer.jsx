import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import './ItemListContainer.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const { category } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let apiUrl = 'https://backendtiendapipos.onrender.com/api/products';

                const queryParams = {
                    category: category || '',
                    limit: 12,
                    page: currentPage,
                    ...queryString.parse(location.search),
                };

                const response = await fetch(`${apiUrl}?${queryString.stringify(queryParams)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();

                if (data && data.products) {
                    setProductos(data.products);
                    setTotalPages(Math.ceil(data.totalProducts / 12));
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
    }, [category, location.search, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)}>
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div>
            <div className="divTitle">
                <img className="logoSabroso" src="../img/logo2.png" alt="logo sabroson" />
            </div>
            {productos && productos.length > 0 ? (
                <div>
                    <ItemList productos={productos} loading={loading} />
                    <div className="paginationButtons">
                        <button className="pageButton" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        <h4 className="pageNumber">{currentPage}</h4>
                        {renderPaginationButtons()}
                        <button className="pageButton" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Siguiente
                        </button>
                    </div>
                </div>
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
}

export default ItemListContainer;
