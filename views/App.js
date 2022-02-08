import React, { useReducer } from 'react';
import update from 'immutability-helper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PodcastsList from './components/PodcastsList';
import Player from './components/Player';

export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
    selectedPodcastName: undefined,
    selectedPodcastSource: undefined,
    selectedPodcastMarks: undefined
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_PODCAST':
            return update(state, { 
                selectedPodcastMarks: {$set: action.markers}, 
                selectedPodcastSource: {$set: action.source},
                selectedPodcastName: {$set: action.name}
            });
        default:
            return initialState;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align='center'> Valentyn Bilousov Podcast Player </Typography>
            <Typography variant="body1" align='center'> For start, please click on one podcast </Typography>
            <AppContext.Provider value={{ state, dispatch }}>
                <PodcastsList />
                <Player />
            </AppContext.Provider>
        </Container>
    );
}

export default App;