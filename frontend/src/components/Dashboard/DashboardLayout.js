import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import ProductSection from './ProductSection';

function DashboardLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        isAuthorised();
    }, []);

    const isAuthorised = async () => {
        try {
            const response = await apiService.get('/api/user');
            if (response.data.user) {
                setUser(response.data.user);
            } else {
                navigate('/register');
            }
        } catch (error) {
            navigate('/register');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
            <Navbar bg="white" className="shadow-sm px-4 py-3">
                <Navbar.Brand href="javascript:void(0)" onClick={() => navigate('/')} style={{ cursor: 'pointer', fontWeight: '600' }}>
                    Dashboard
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-3">
                        Hello, <span style={{ fontWeight: 'bold' }}>{user.name}</span>
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid className="px-4 py-4">
                <ProductSection />
            </Container>
        </div>
    )
}

export default DashboardLayout
