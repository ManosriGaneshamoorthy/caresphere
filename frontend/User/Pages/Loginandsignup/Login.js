import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, FormControl, FormGroup, TextField, Box, Typography, Container, Radio, RadioGroup, FormControlLabel, FormLabel, Link } from '@mui/material';
import backgroundImage from '../../Assets/BACKGROUND2.jpeg'; // Adjust the path as necessary
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showBox, setShowBox] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setShowBox(true);
            setErrorMessage('Both fields are required');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/login/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                localStorage.setItem('username', username);
    
                switch (data.role) {
                    case 'admin':
                        navigate('/admin/home');
                        break;
                    case 'doctor':
                        navigate('/doctor/home');
                        break;
                    case 'user':
                        navigate('/');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setShowBox(true);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setShowBox(true);
            setErrorMessage('Error during login. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    boxShadow: 10,
                    marginLeft:'170px',
                    textAlign: 'center',
                    border: '2px solid blue',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                        borderColor: '#0056b3',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    },
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: '16px' }}>
                    Caresphere
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#555', marginBottom: '16px' }}>
                    Please Sign In
                </Typography>

                <FormGroup>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#333',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#007bff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#0056b3',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0056b3',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#333',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#007bff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#0056b3',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0056b3',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup row value={role} onChange={handleRoleChange}>
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        sx={{
                            marginTop: '16px',
                            backgroundColor: '#007bff',
                            borderRadius: '5px',
                            padding: '7px',
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Login
                    </Button>

                    <Link
                        component={RouterLink}
                        to="/register"
                        variant="body2"
                        sx={{
                            marginTop: '16px',
                            display: 'block',
                            textAlign: 'center',
                            textDecoration: 'none',
                            color: '#007bff',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: '#0056b3',
                            },
                        }}
                    >
                        Don't have an account? Register here.
                    </Link>

                    {showBox && (
                        <Box
                            sx={{
                                marginTop: '20px',
                                backgroundColor: '#f8d7da',
                                padding: '12px',
                                border: '2px solid black',
                                borderRadius: '8px',
                                color: '#721c24',
                                textAlign: 'center',
                                fontSize: '0.875rem',
                            }}
                        >
                            <Typography color="error">
                                {errorMessage}
                            </Typography>
                        </Box>
                    )}
                </FormGroup>
            </Container>
        </Box>
    );
}

export default Login;
