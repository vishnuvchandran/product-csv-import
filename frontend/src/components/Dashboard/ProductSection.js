import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Alert } from 'react-bootstrap';
import apiService from '../../services/api';


function ProductSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [importSuccess, setImportSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await apiService.get('api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            await apiService.post('api/products/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImportSuccess('Products imported successfully!');
            fetchProducts();
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
            event.target.value = '';
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Products</h2>
                <div>
                    <input type="file" accept=".csv" id="csvInput" className="d-none" onChange={handleFileUpload} />
                    <Button variant="primary" onClick={() => document.getElementById('csvInput').click()} disabled={loading} >
                        {loading ? 'Importing...' : 'Import CSV'}
                    </Button>
                </div>
            </div>

            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}

            {importSuccess && (
                <Alert variant="success" onClose={() => setImportSuccess('')} dismissible>
                    {importSuccess}
                </Alert>
            )}

            {loading && !error && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Row className="g-4">
                {products.map(product => (
                    <Col key={product.id} xs={12} md={6} lg={4} xl={3}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title className="mb-3">{product.name}</Card.Title>
                                <div className="mb-2">
                                    <small className="text-muted">SKU: {product.sku}</small>
                                </div>
                                <Card.Text className="text-truncate mb-3" title={product.description}>
                                    {product.description}
                                </Card.Text>
                                <div className="mt-auto">
                                    <h5 className="text-primary mb-0">
                                        ₹ {Number(product.price).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </h5>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {!loading && products.length === 0 && (
                <div className="text-center py-5">
                    <h5 className="text-muted">No products available</h5>
                    <p className="text-muted">Import a CSV file to add products</p>
                </div>
            )}
        </div>
    )
}

export default ProductSection
