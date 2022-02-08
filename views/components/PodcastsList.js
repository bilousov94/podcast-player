import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AppContext } from '../App'

export default function PodcastsList() {
    const { dispatch } = useContext(AppContext);

    // list of podcasts
    const [podcasts, setPodcasts] = useState([]);
    useEffect(() => {
        async function getPodcasts() {
            let data = await axios.get('/episodes');
            setPodcasts(data.data)
        }
        getPodcasts();
    }, [])

    const loadPodcastData = async (id) => {

        // Although in current project we don't need to load the data for
        // specific podcast, since endpoint /episodes already returned all data
        // for every podcast with markers, but let's assume that in real world
        // we need to load data for every podcast separately with all markers
        try {
            let podcastData = await axios.get(`/episodes/${id}`);

            // modify podcast markers array into hash table
            // where marker start and market finish would be the key
            const markersHashTable = {};
            podcastData.data.markers.forEach(marker => {
                let key = `${marker.start}-${marker.start+marker.duration}`
                markersHashTable[key] = marker
            });

            // Update initial state
            dispatch({ 
                type: 'UPDATE_CURRENT_PODCAST', 
                markers: markersHashTable, 
                name: podcastData.data.name, 
                source: podcastData.data.audio
            });
        } catch (err) {
            // here we can show message that something went wrong
            console.log('ERROR FETCHING EPISODE DATA')
            console.log(err);
        }
    }
    return(
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            {podcasts.map(podcast => (
                <Paper key={podcast.id} sx={{ maxWidth: 340, my: 1, mx: 'auto', p: 2 }}>
                    <Grid onClick={() => loadPodcastData(podcast.id)} container wrap="nowrap" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Typography>{podcast.name}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    )
}

