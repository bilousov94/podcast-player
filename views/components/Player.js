import React, { useState, useEffect, useRef, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));
  
const CoverImage = styled('div')({
    objectFit: 'cover',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
});
  
const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

import { AppContext } from '../App'

export default function Player() {
    const {state } = useContext(AppContext);

    // Refs
    const audioRef = useRef(new Audio(state.selectedPodcastSource));
    const intervalRef = useRef();

    // player statuses
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { duration } = audioRef.current;

    const [currentAd, setCurrentAd] = useState(null);

    // list of keys for markers hash table;
    const [markersRanges, setMarkersRanges] = useState(null);

    // Update audio source if current podcast changed
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(state.selectedPodcastSource);
        audioRef.current.currentTime = 0;
        if (state.selectedPodcastMarks) {
            setMarkersRanges(Object.keys(state.selectedPodcastMarks));
        }
        setIsPlaying(false)
    }, [state]);

    // Update state if track playing or stoped
    useEffect(() => {
        if (!state.selectedPodcastSource) {
            setIsPlaying(false);
            return;
        }
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
        } else {
          audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        calculateCurrentAd(trackProgress)
        console.log(currentAd)
    }, [trackProgress]);
    
    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
    
        intervalRef.current = setInterval(() => {
          if (!audioRef.current.ended) {
            setTrackProgress(audioRef.current.currentTime);
          }
        }, [1000]);
    };

    // Move slider to change time
    const onMove = (value) => {
        // allow to move just if no add playing
        if (!disableSkipButtons()) {
            audioRef.current.currentTime = value;
            setTrackProgress(audioRef.current.currentTime);
        }
    };

    // Skip or add 5 seconds for track current time
    const skipFiveSeconds = (type) => {
        if (state.selectedPodcastSource && !disableSkipButtons()) {
            if (type === 'add') {
                audioRef.current.currentTime += 5;
            } else {
                audioRef.current.currentTime -= 5;
            }
            setTrackProgress(audioRef.current.currentTime);
        }
    }

    // format duration to display hom much time left and listened
    const formatDuration = (value) => {
        
        // return default value if no duration
        if (!duration) return '00:00';

        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value - minute * 60);
        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
    }

    const calculateCurrentAd = (currentTime) => {
        if (!markersRanges) return;

        // find marker key
        const markerKey = markersRanges.find(marker => {
            let current = marker.split('-');
            return currentTime <= current[1] && currentTime >= current[0];
        });

        // This can be improved. We can just update add in case if is changed
        if (markerKey) setCurrentAd(state.selectedPodcastMarks[markerKey])
        else setCurrentAd(null)
    }

    // function for rendering correct ad
    const renderAd = () => {
        if (currentAd){
            switch (currentAd.type) {
                case 'ad':
                   return <Typography variant="h4" align='center'><Link target="_blank" color="#191fd2" href={currentAd.link}>{currentAd.content}</Link></Typography>
                case 'text':
                   return <Typography variant="h4" align='center'>{currentAd.content}</Typography>
                case 'image':
                    return <CoverImage><img src={currentAd.content} /></CoverImage>
                default:
                    return null;    
            }
        }
    }

    // disable skip buttons if currently ad playing
    const disableSkipButtons = () => {
        return !!(currentAd && currentAd.type === 'ad');
    }

    return(
        <Box sx={{ 
            overflow: 'hidden', 
            margin: 'auto', 
            width: 375,  
            borderRadius: '14px',  
            background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
            transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s' }}>
        <Widget>

            {/* Ad box */}
            <Box sx={{ alignItems: 'center' }}>
                {renderAd()}
            </Box>

            {/* podcast name */}
            <Typography align='center'>
                {state.selectedPodcastName}
            </Typography>

            {/* duration progress bar */}
            <Slider
                aria-label="time-indicator"
                size="small"
                value={trackProgress}
                min={0}
                step={1}
                max={duration ? duration : 0}
                onChange={(e) => onMove(e.target.value)}
                sx={{
                    color: 'rgba(0,0,0,0.87)',
                    height: 4,
                    '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&.Mui-active': {
                    width: 20,
                    height: 20,
                }},
                '& .MuiSlider-rail': {
                    opacity: 0.28,
                },
            }}/>

            {/* box to display remaining time */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2 }}>
                <TinyText>{formatDuration(trackProgress)}</TinyText>
                <TinyText>{formatDuration(duration - trackProgress)}</TinyText>
            </Box>

            {/* control buttons*/}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>

                <IconButton onClick={() => skipFiveSeconds('remove')}>
                    <FastRewindRounded fontSize="large" htmlColor={disableSkipButtons() ? 'rgba(159,124,124,1)' : 'rgba(0,0,0,0.87)'} />
                </IconButton>
    
                { isPlaying ? <IconButton onClick={() => setIsPlaying(false)}><PauseRounded sx={{ fontSize: '3rem' }}  htmlColor='rgba(0,0,0,0.87)' /></IconButton> :
                    <IconButton onClick={() => setIsPlaying(true)}><PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor='rgba(0,0,0,0.87)' /></IconButton>
                }
    
                <IconButton onClick={() => skipFiveSeconds('add')}>
                    <FastForwardRounded fontSize="large" htmlColor={disableSkipButtons() ? 'rgba(159,124,124,1)' : 'rgba(0,0,0,0.87)'} />
                </IconButton>
            </Box>
        </Widget>
      </Box>
    )
}

