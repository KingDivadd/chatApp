import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { ChatState } from 'context/chatContext';
import {BsPeopleFill, BsArchiveFill} from "react-icons/bs"
import {MdAddBox, MdPersonAdd, MdClose} from "react-icons/md"
import {TbBadgeFilled} from 'react-icons/tb'
import {FaVolumeMute} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {PiCaretDownBold} from 'react-icons/pi'

// import {HiOutlineMenu} from 'react-cions/hi'

const UserPage = () => {
    const {mode, setMode, persistData, menu, setMenu, setBackdrop, backdrop} = ChatState()
    const theme = useTheme();
    
    const handleMenu =()=>{
        if(menu){
            setMenu(false)
        }
    }

    const addAccount = ()=>{
            setBackdrop({...backdrop, before: true, addAcct: true})
            setMenu(false)
    }

    const newGroup =()=>{
            setBackdrop({...backdrop, before:true, newGrp: true})
            setMenu(false)
    }

    const createChat = ()=>{
        setBackdrop({...backdrop, before: true, createChat: true})
        setMenu(false)
    }
    const handleSettings = ()=>{
        setBackdrop({...backdrop, before: true, settings: true})
        setMenu(false)
    }

    return (
        <Box  onBlur={handleMenu} className={menu? 'user-page' : 'inactive-user-page'} display={'grid'} gridTemplateRows={'repeat(15, 1fr)'} backgroundColor={'coral'} height={'calc(100% + 0.5rem)'} width={'350px '} zIndex={'2'} >
            <Box gridRow={'span 3'} display={'grid'} gridTemplateRows={'repeat(12, 1fr)'}  >
                <Box gridRow={'span 7'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={'0 1rem'}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   sx={{height: '4rem',width: '4.5rem', borderRadius: '.2rem'}} />
                    <MdClose onClick={handleMenu} style={{height: '1.55rem', width: '1.55rem', cursor: 'pointer'}} />
                </Box>
                <Box gridRow={'span 5'} display={'flex'}  borderBottom={'1px solid grey'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} p={'0 1rem'}>
                        <Typography variant={'h5'}>userName</Typography>
                        <Typography variant={'h5'}>email</Typography>
                    </Box>
                    <Box pr={'1rem'}> <PiCaretDownBold /></Box>
                </Box>
            </Box>
            <Box gridRow={'span 1'} onClick={addAccount} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} p={'0 1rem'} gap={2}>
                <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><MdAddBox  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                    <Typography variant={'h5'}>Add Account</Typography>
                </Box>
            </Box>
            <Box gridRow={'span 11'}  display={'flex'} flexDirection={'column'} >
                <Box onClick={newGroup} pl={'1rem'} gridRow={'span 1'} className='profile-list-bar'  width={'100%'} height={'2.75rem'} display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'}  gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><BsPeopleFill  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>New Group</Typography>
                    </Box>
                </Box>
                <Box pl={'1rem'} onClick={createChat} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} height={'2.75rem'} gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><MdPersonAdd  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Create Chat</Typography>
                    </Box>
                </Box>
                <Box pl={'1rem'} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} height={'2.75rem'} gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><BsArchiveFill  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Archived Chat</Typography>
                    </Box>
                </Box>
                <Box pl={'1rem'} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'}height={'2.75rem'}  gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><TbBadgeFilled  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Saved Messages</Typography>
                    </Box>
                </Box>
                <Box pl={'1rem'} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} height={'2.75rem'}  gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><FaVolumeMute  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Muted Chats</Typography>
                    </Box>
                </Box>
                <Box pl={'1rem'} onClick={handleSettings} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} height={'2.75rem'} gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}><AiFillSetting  style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                    <Box gridColumn={'span 11'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Settings</Typography>
                    </Box>
                </Box>    
                <Box pl={'1rem'} className='profile-list-bar' display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'} height={'2.75rem'} gap={2}>
                    <Box gridColumn={'span 1'} display={'flex'} alignItems={'center'}> </Box>
                    <Box gridColumn={'span 10'} display={'flex'} alignItems={'center'}>
                        <Typography variant={'h5'}>Night Mode </Typography>
                    </Box>
                    <Box gridColumn={'span 1'}></Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserPage