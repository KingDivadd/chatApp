import React, {useState, useEffect} from 'react'
import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography, Button } from '@mui/material';
import SearchBar, { InputBar, MidInputBar } from './small-component/search-bar';
import {MdClose} from 'react-icons/md'
import {FiSearch} from 'react-icons/fi'
import {ChatState} from "context/chatContext"
import axios from 'axios'

const AddAcct = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const {backdrop, setBackdrop} = ChatState()

    const clearField = ()=>{
        setEmail("")
        setPassword("")
    }
    
    const addAccount = async()=>{
        if(email.trim() !== "" || password.trim() !== ""){
            console.log("email", email, "password",password)
            // try {
            //     let user = await axios.post('http://localhost:5500/api/auth/login', {email, password}, {
            //         headers:{
            //             "Content-Type":"application/json"
            //         }
            //     })
            // } catch (err) {
            //     console.log('Something went wrong')
            // }
        }else{
            console.log('field cannot be empty')
        }
    }

    const handleClose = ()=>{
        setBackdrop({...backdrop, before:false, addAcct: false})
    }

    return (
        <Box component='form' backgroundColor={'coral'} borderRadius={'.3rem'} p={'1rem'} onSubmit={addAccount} display='grid' gridTemplateRows={'repeat(15, 1fr)'} height='15rem' width={'400px'} gap={2} >
            <Box gridRow={'span 2'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Typography variant={'h4'}>Add Account</Typography>
                <MdClose onClick={handleClose} style={{height: '1.75rem', width: '1.75rem', cursor: 'pointer'}} />
            </Box>
            <Box gridRow={'span 5'} gap={'.5rem'}>
                <Typography variant='h4'>Email</Typography>
                <InputBar text={email} setText={setEmail} type={'text'} />
            </Box>
            <Box gridRow={'span 5'}  gap={'.5rem'}>
                <Typography variant='h4'>Password</Typography>
                <InputBar text={password} setText={setPassword} type={'password'} />
            </Box>
            <Box gridRow={'span 3'} display={'flex'}  justifyContent={'space-between'} alignItems={'flex-end'}>
                <Button onClick={clearField}>
                    <Typography variant='h4'>Clear</Typography>
                </Button>
                <Button onClick={addAccount}>
                    <Typography variant='h4'>Submit</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default AddAcct