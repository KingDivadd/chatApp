import React, {useState, useEffect} from 'react'
import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography, Button } from '@mui/material';
import SearchBar, { MidInputBar } from './small-component/search-bar';
import {MdClose} from 'react-icons/md'
import {FiSearch} from 'react-icons/fi'
import {ChatState} from "context/chatContext"
import axios from 'axios'

const CreateChat = () => {
    const {backdrop, setBackdrop} = ChatState()
    const [eText, setEText] = useState("")
    const [fetch, setFetch] = useState([{userName: 'iroedavid', id: '123', picture: ''}])
    const [members, setMembers] = useState([])
    const theme = useTheme();


    const fetchUsers = async()=>{
        try {
            let token = localStorage.getItem('token')
            if(token !== null){
                const users = await axios.get("http://localhost:5500/api/auth", {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(users.data.findUsers)
                // setFetch(users.data.findUsers)
            }else{
                console.log("No token provided, log in")
            }
        } catch (err) {
            console.log('something went wrong')
        }
    }
    useEffect(() => {
    fetchUsers()
    }, [])

    const handleCreate = async()=>{
        let token = localStorage.getItem('token')
        try {
            if(token !== null){
                const chat = await axios.post("http://localhost:5500/api/chat/createChat", {users: members},{
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log("success", chat)
            }
        } catch (err) {
            console.log("something went went wrong")
        }
    }

    const handleClear = async()=>{
        setEText("")
    }

    const closeBackdrop = ()=>{
        setBackdrop({...backdrop, before: false, createChat: false})
    }
    return (
                <Box tabIndex="0" display={'grid'} gridTemplateRows={'repeat(14, 1fr)'} backgroundColor={'coral'} height={'75vh'} width={'400px'} p={'1rem'} borderRadius={'.5rem'}>
                    <Box gridRow={'span 1'} display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Typography variant={'h4'} fontFamily={theme.typography.fontFamily2}>Create Chat</Typography>
                        <MdClose onClick={closeBackdrop} style={{height: '1.55rem', width: '1.55rem', cursor: 'pointer'}} />
                    </Box>
                    <Box gridRow={'span 1'} display={'flex'} flexDirection={'row'} gap={1} justifyContent={'flex-start'} alignItems={'center'}><FiSearch style={{height: '1.75rem', width: '1.5rem'}} /> <MidInputBar pH={"Search"} eText={eText} setEText={setEText} /> </Box>
                    <Box gridRow={'span 11'}  overflow={'auto'}>
                        {fetch.map((data, ind, picture)=>{
                            const {userName, _id} = data
                            return(
                                <Box display={'grid'} key={ind} gridTemplateColumns={'repeat(12, 1fr)'} backgroundColor={'green'} borderRadius={'.25rem'} >
                                    <Box gridColumn={'span 2'}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   sx={{height: '3rem',width: '3rem', borderRadius: '.25rem'}} />
                                    </Box>
                                    <Box gridColumn={'span 10'} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                                        <Typography variant='h4' fontFamily={theme.typography.fontFamily2}>{userName}</Typography>
                                    </Box>

                                </Box>
                            )
                        })}
                    </Box>
                    <Box gridRow={'span 1'} display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} pr={'1.5rem'}>
                            <Button onClick={handleClear} >
                                <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>Clear</Typography>
                            </Button>
                            <Button onClick={handleCreate} > <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>Create</Typography> </Button>
                    </Box>

                </Box>
    )
}

export default CreateChat