import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f2f2f2', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
            <Container>
                <Typography variant="body2" color="textSecondary">
                    Your Footer Content Here
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} Your Company Name
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;
