import React from 'react';
import Container from '@mui/material/Container';
import PodcastsList from './components/PodcastsList';

function App() {
    return (
        <Container maxWidth="lg">
            <h3>Valentyn Bilousov Podcast Player</h3>
            <PodcastsList />
        </Container>
    );
}

export default App;