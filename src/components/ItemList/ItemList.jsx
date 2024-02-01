import './ItemList.css';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ItemList = ({ productos, loading }) => {
    return (
        <div className='contenedorProductos'>
            {loading ? (
                <p>Cargando productos...</p>
            ) : Array.isArray(productos) && productos.length > 0 ? (
                productos.map(product => (
                    <div key={product._id}>
                        <Card className='cardLoca'>
                            <Card.Img variant="top" className='detalleImg' src={product.thumbnails} />
                            <Card.Body style={{ position: "relative" }}>
                                <div className='dataCard'>
                                    <p>stock: {product.stock} </p>
                                </div>
                                <Card.Title style={{ fontWeight: "900" }}>{product.title}</Card.Title>
                                <Card.Text>
                                    {/* <br /> */}
                                    {product.description}
                                    <br />
                                    <strong>price: $ {product.price}</strong>
                                </Card.Text>
                                <Link className='botonDetalle' to={`/item/${product._id}`} >detalle</Link>
                                <p>codigo: {product.code}</p>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
}

ItemList.propTypes = {
    productos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ItemList;
