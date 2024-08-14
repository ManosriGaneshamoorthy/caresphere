import React, { useState } from 'react';
import { Box, Typography, Button, Container, CssBaseline, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './emer1.png'; // Adjust the path as necessary
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function EmergencyPage() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [nearestHospital, setNearestHospital] = useState(null);

    const hospitalPhoneNumber = '+1234567890';
    const ambulancePhoneNumber = '+0987654321';

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleSendSOS = async () => {
        const username = localStorage.getItem('username');
        if (username) {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/userdetails/user?username=${username}`);
                if (response.ok) {
                    const userDetails = await response.json();
                    setUserDetails(userDetails);

                    // Fetch live location
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            setLocation({ latitude, longitude });

                            try {
                                // Get nearest hospital after location is set
                                await getNearestHospital(latitude, longitude);

                                // Send SOS alert to the nearest hospital
                                await sendSOSAlertToHospital(username, latitude, longitude);

                                alert('SOS alert sent successfully!');
                            } catch (error) {
                                setError('Error processing SOS request.');
                            } finally {
                                setLoading(false);
                            }
                        },
                        (error) => {
                            setError('Unable to retrieve location.');
                            setLoading(false);
                        }
                    );
                } else {
                    console.error('Failed to fetch user details');
                    setError('Failed to fetch user details');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Error fetching user details');
                setLoading(false);
            }
        } else {
            console.error('Username not found in localStorage');
            setError('Username not found in localStorage');
            setLoading(false);
        }
    };

    const getNearestHospital = async (latitude, longitude) => {
        try {
            const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apiKey}`);
            const data = await response.json();

            console.log('API Response:', JSON.stringify(data, null, 2)); // Log the API response

            if (data.status === 'OK' && data.results && data.results.length > 0) {
                setNearestHospital(data.results[0].name);
                console.log('Nearest Hospital:', data.results[0].name);
            } else {
                console.error('No hospitals found or API error:', data.status, data.error_message);
                setNearestHospital('No nearby hospitals found');
            }
        } catch (error) {
            console.error('Error fetching nearest hospital:', error);
            setNearestHospital('Error fetching nearest hospital');
        }
    };

    const sendSOSAlertToHospital = async (username, latitude, longitude) => {
        try {
            await fetch(`http://localhost:8080/sos/alert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    latitude,
                    longitude,
                    hospitalPhoneNumber,
                }),
            });
        } catch (error) {
            console.error('Error sending SOS alert:', error);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f2f2f2',
                padding: 3,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '600px',
                }}
            >
                <Container maxWidth="xs">
                    <img
                        src={logo}
                        alt="Emergency Alert Logo"
                        style={{
                            width: '200px',
                            height: 'auto',
                            marginBottom: '30px',
                        }}
                    />
                    <Typography variant="h3" gutterBottom sx={{ color: '#c62828', fontWeight: 'bold', marginBottom: 2 }}>
                        Emergency Alert
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', marginBottom: 4 }}>
                        Immediate Action Required
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: 'black', marginBottom: 4 }}>
                        Please follow the instructions below carefully. This is an important notification regarding an emergency situation. 
                        Make sure to take the necessary actions immediately and stay safe.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2, mr: 2, borderRadius: 20, padding: '10px 20px', textTransform: 'none' }}
                        onClick={handleSendSOS}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Send SOS'}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2, borderRadius: 20, padding: '10px 20px', textTransform: 'none' }}
                        onClick={handleBackToHome}
                    >
                        Back to Home
                    </Button>

                    {userDetails && (
                        <Card sx={{ mt: 4, padding: 2, boxShadow: 2, backgroundColor: '#fff' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#d32f2f', marginBottom: 1 }}>User Details</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1">Name: {userDetails.username}</Typography>
                                <Typography variant="body1">Emergency Number: {userDetails.emergencyContact}</Typography>
                                <Typography variant="body1">Consulting Doctor: {userDetails.consultingDoctor}</Typography>
                            </CardContent>
                        </Card>
                    )}

                    {nearestHospital && (
                        <Card sx={{ mt: 4, padding: 2, boxShadow: 2, backgroundColor: '#fff' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#d32f2f', marginBottom: 1 }}>Nearest Hospital</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1">{nearestHospital}</Typography>
                            </CardContent>
                        </Card>
                    )}

                    {error && (
                        <Typography variant="body1" sx={{ color: 'red', marginTop: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Container>
            </Box>

            {location && (
                <Box
                    sx={{
                        flex: 1,
                        width: '50%',
                        height: '100%',
                        borderRadius: 2,
                        boxShadow: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#d32f2f', marginBottom: 1 }}>Live Location</Typography>
                    <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>
                                Your current location.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            )}

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    zIndex: 0,
                }}
            />
        </Box>
    );
}

export default EmergencyPage;
