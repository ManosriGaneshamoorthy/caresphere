import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, FormControl, FormGroup, TextField, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import backgroundImage from '../../Assets/BACKGROUND1.jpg.jpeg'; // Adjust the path as necessary

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [role] = useState('user'); // Default role is 'user'

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

    const handleSignup = async () => {
        if (!name || !email || !password || password !== confirmPassword) {
            setSnackbarMessage('Invalid or incomplete form data');
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: email, 
                    password: password,
                    phoneNumber: phoneNumber,
                    role: role, // Include the role in the request
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('username', name);
                
                setSnackbarMessage('Signup successful! Redirecting...');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/userdetails');
                }, 2000);
            } else {
                setSnackbarMessage(data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Error during registration. Please try again.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                    padding: '14px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    marginRight: '130px',
                    borderRadius: '15px',
                    boxShadow: 10, 
                    border: '2px solid blue', 
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
                    Caresphere
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#555', textAlign: 'center', marginBottom: '16px' }}>
                    Register
                </Typography>
                
                <FormGroup>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            variant="outlined"
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
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
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
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

                    <FormControl fullWidth margin="normal">
                        <TextField
                            variant="outlined"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
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
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSignup}
                        sx={{
                            marginTop: '16px',
                            backgroundColor: '#007bff', 
                            borderRadius: '5px',
                            padding: '10px',
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <RouterLink to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
                            Already have an account? Sign In
                        </RouterLink>
                    </Box>
                </FormGroup>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}

export default Register;
