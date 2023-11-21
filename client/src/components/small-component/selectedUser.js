import React from 'react'
import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography, Button } from '@mui/material';
import {MdClose} from 'react-icons/md'
import {ChatState} from "context/chatContext"

const SelectedUser = ({name}) => {
    return (
    <Box backgroundColor={'brown'} p={'0 .2rem'} pr={'.3rem'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'.25rem'} flexDirection={'row'} borderRadius={'.3rem'}>
        <MdClose />
        <Typography variant={'h6'}  fontFamily={theme.typography.fontFamily2}>iroegbu_david</Typography>
    </Box>
    )
}

export default SelectedUser