import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import apiService from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [errorInput, setErrorsInput] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorsInput({ ...setErrorsInput, [name]: undefined })
        if (errorInput[name]) {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.post('api/register', formData);
            setSuccess(response.data.message);
            setError('');
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message);
            setErrorsInput(error.response?.data?.errors)
            setSuccess('');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required 
                                    isInvalid={!!errorInput.email} />
                                    {errorInput.email && (<Form.Text className="text-danger">
                                        {errorInput.email.map((error, index) => (
                                            <div key={index}>{error}</div>
                                        ))} </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} 
                                    required minlength="8" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} 
                                    required minlength="8" isInvalid={!!errorInput.password} />
                                    {errorInput.password && (<Form.Text className="text-danger">
                                        {errorInput.password.map((error, index) => (
                                            <div key={index}>{error}</div>
                                        ))} </Form.Text>
                                    )}
                                </Form.Group>
                                
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" size="lg">Register</Button>
                                </div>
                                <div className="text-center mt-3">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-none">Login</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
