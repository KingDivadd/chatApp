import { useMediaQuery, useTheme, Box, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatState } from 'context/chatContext';
import {RiMenuFoldFill} from 'react-icons/ri'
import SearchBar from './small-component/search-bar';
import ChatBar from './chat-bar';
import axios from 'axios';
import UserPage from './userPage';
// import {HiOutlineMenu} from 'react-cions/hi'

const ChatListArea = () => {
    const {mode, setMode, menu, setMenu} = ChatState()
    const [width, setWidth] = useState(window.innerWidth)
    const theme = useTheme();

    const handleMenu = ()=>{
        if(!menu){
            setMenu(true)
        }
    }


    return (
        
            <Box display={'grid'} gridTemplateRows={'repeat(15, 1fr)'} height={'100%'} position={'relative'} >
                <UserPage />
                <Box  gridRow='span 1' backgroundColor={'steelblue'} height={'100%'} borderBottom={'1px solid white'}>
                    <Box display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} width={'100%'} height={'100%'} p={'0 .5rem'} >
                        <Box gridColumn='span 1' maxHeight={'100%'} display={'flex'} alignItems={'center'} color={theme.palette.neutral.dark}>
                            <RiMenuFoldFill onClick={handleMenu} style={{height: '1.55rem', width: '1.5rem', cursor: 'pointer'}} />
                        </Box>
                        <Box gridColumn='span 11' display={'flex'} alignItems={'center'} maxHeight={'100'} padding={'0'}>
                            <SearchBar />
                        </Box>
                    </Box>
                </Box>
                <Box  gridRow='span 14' backgroundColor={'cornflowerblue'} overflow={'auto'} maxHeight={'88.75vh'}>
                    <ChatBar />
                </Box>
            </Box>

    )
}

export default ChatListArea