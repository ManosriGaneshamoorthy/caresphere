import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Snackbar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import backgroundImage from '../Assets/adminnn.jpg'; // Ensure this path is correct
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'Admin' && password === '123') {
      setShowSuccess(true);
      setTimeout(() => {
        console.log('Login successful as Admin!');
        // window.location.href = '/admin-dashboard';
      }, 2000);
    } else {
      setError('Invalid username or password');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Align to the right
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // Apply the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 2,
      }}
    >
      <Box sx={{ marginRight: '25%', maxWidth: 500, width: '100%' }}> {/* Add margin to the right */}
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
            border: '2px solid #333', // Darker border color
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hello Admin !
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Admin name"
              variant="filled"
              fullWidth
              margin="normal"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  color: '#555',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{
                marginBottom: 3,
                '& .MuiInputLabel-root': {
                  color: '#555',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            />
            <Link to="/admin/home">
            <Button
              type="submit"
              variant="standard"
              color="info"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'blue',
                '&:hover': {
                  backgroundColor: 'green',
                },
              }}
            >
              Login as Admin
            </Button>
            </Link>
          </form>

          {/* Additional login options */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
            <Link to="/doctor" style={{ textDecoration: 'none', marginBottom: 10 }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                  mb: 2,
                  backgroundColor: 'orange',
                  '&:hover': {
                    backgroundColor: 'darkorange',
                  },
                }}
              >
                Login as Doctor
              </Button>
            </Link>
            <Link to="/userlogin" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: 'teal',
                  '&:hover': {
                    backgroundColor: 'darkcyan',
                  },
                }}
              >
                Login as User
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseError}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{ bottom: 20 }}
      />
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        message="Login successful as admin!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSuccess}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{ bottom: 20 }}
      />
    </Box>
  );
};

export default AdminLogin;
