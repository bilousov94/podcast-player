import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// const useStyles = makeStyles(theme => ({
//     mainFeaturedPost: {
//         position: 'relative',
//         backgroundColor: theme.palette.grey[800],
//         color: theme.palette.common.white,
//         marginBottom: theme.spacing(4),
//         backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//     },
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         right: 0,
//         left: 0,
//         backgroundColor: 'rgba(0,0,0,.3)',
//     },
//     mainFeaturedPostContent: {
//         position: 'relative',
//         padding: theme.spacing(3),
//         [theme.breakpoints.up('md')]: {
//             padding: theme.spacing(6),
//             paddingRight: 0,
//         },
//     },
// }));
export default function PodcastsList() {
    // const classes = useStyles();
    // try {
    //     listOfPodcasts = axios('/episodes');
    // } catch (err) {
    //     console.log('error')
    // }

    const [podcasts, setPodcasts] = useState([]);
    useEffect(() => {
        async function getPodcasts() {
            const data = await axios.get('/episodes');
            setPodcasts(data.data)
        }
        getPodcasts();
    }, [])
    return(
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            {podcasts.map(podcast => (
                <Paper key={podcast.id} sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <PlayCircleOutlineIcon fontSize="medium" color="primary" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography>{podcast.name}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    )
}

