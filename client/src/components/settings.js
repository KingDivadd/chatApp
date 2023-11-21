import React, {useState, useEffect} from 'react'
import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography, Button } from '@mui/material';
import SearchBar, { InputBar, MidInputBar } from './small-component/search-bar';
import {MdClose} from 'react-icons/md'
import {FiSearch} from 'react-icons/fi'
import {ChatState} from "context/chatContext"
import axios from 'axios'


const Settings = () => {
    const {backdrop, setBackdrop} = ChatState()

    const handleClose = ()=>{
        setBackdrop({...backdrop, before: false, settings: false})
    }
    return (
        <Box backgroundColor={'coral'} display={'grid'} gridTemplateRows={'repeat(13, 1fr)'} width={'400px'} height={'70vh'} p={'1rem'} borderRadius={'.3rem'}> 
            <Box gridRow={'span 1'} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Typography variant='h4'>Settings</Typography>
                <MdClose onClick={handleClose} style={{height: '1.5rem', width: "1.5rem", cursor: 'pointer'}} />
            </Box>
            <Box gridRow={'span 3'} display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'}>
                <Box gridColumn={'span 4'}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   sx={{height: '6rem',width: '6rem', borderRadius: '.2rem'}} />
                </Box>
                <Box gridColumn={'span 7'} display={'grid'} gridTemplateRows={'repeat(4, 1fr)'}>
                    <Box gridRow={'span 1'}> <Typography variant='h4'>Iroegbu David</Typography> </Box>
                    <Box gridRow={'span 1'}> <Typography variant='h5'>iroegbu.david@gmail.com</Typography> </Box>
                    <Box gridRow={'span 1'}> <Typography variant='h5'>userName</Typography> </Box>

                </Box>
            </Box>
            <Box gridRow={'span 9'}>
                <Box height={'2rem'}> <Typography variant={'h4'}>Update userName</Typography> </Box>
                <Box height={'2rem'}> <Typography variant={'h4'}>Update email</Typography> </Box>
                <Box height={'2rem'}> <Typography variant={'h4'}>Theme</Typography> </Box>
            </Box>
        </Box>
    )
}

export default Settings