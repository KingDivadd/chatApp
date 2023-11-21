import React, {useState, useEffect} from 'react'
import {Box, Grid, Avatar, Item, Typography, useTheme, Badge} from '@mui/material'
import axios from 'axios';
import { ChatState } from 'context/chatContext';

const ChatBar = () => {
    const theme = useTheme()
    const [chatList, setChatList] = useState([])
    const [time, setTime] =useState([])
    const {persistData, setPersistData, chat, setChat, setActiveChat, setChatMssg, user} = ChatState()

    const fetchChat = async()=>{
        try {
            let token = localStorage.getItem('token')
            if(token !== null){
                const chat = await axios.get("http://localhost:5500/api/chat", {
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                let chats = chat.data.chat
                chats.forEach(elem => {
                    let times =new Date(elem.updatedAt) 
                    setTime([...time, times.toLocaleTimeString()])
                });
                setChatList(chat.data.chat)
            }else{
                console.log('No token provided')
            }
        } catch (err) {
            console.log('Something went wrong');
        }
    }
    useEffect(() => {
    fetchChat()
    }, [])

    const handleClick = async(data)=>{
        setChat(data)
        setActiveChat(true)
        try {
            const mssg = await axios.get(`http://localhost:5500/api/mssg/allmessages/${data._id}`)
            setChatMssg(mssg.data.allmessages)

        } catch (err) {
            console.log('something went wrong')
        }

    }
    return (
        <>

        {chatList.map((data, ind)=>{
            const {latestMessage, updatedAt} = data
            return(
            <Box className='chat-bar' key={ind} display={'grid'} gridTemplateColumns={'repeat(10, 1fr)'} height={'3.5rem'} backgroundColor={'steelblue'} p={'0 .5rem'} gap={2} onClick={()=>handleClick(data)} >
            <Box gridColumn={'span 1'} display={'flex'}  alignItems={'center'} justifyContent={'center'}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Box>
            <Box gridColumn={'span 9'} >
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} height={'100%'}>
                    <Box gridColumn="span 8" display={'flex'} p={'.22rem 0'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                        <Box height={'50%'} display={'flex'} alignItems={'center'}> 
                            <Typography variant='h5' fontFamily={theme.typography.fontFamily2}>Chat Names</Typography>  
                        </Box>
                        <Box  height={'50%'} display={'flex'} alignItems={'center'}> 
                            <Typography fontSize={theme.typography.h7} fontFamily={theme.typography.fontFamily2}> {latestMessage ? `Sender: ${latestMessage.content}`: ""}</Typography>  
                        </Box>
                    </Box>

                    <Box gridColumn="span 4" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-end'}>
                        <Box  height={'50%'} display={'flex'} alignItems={'center'}> 
                            {time.map((data, ind)=>{
                                return(
                                    <Typography key={ind} fontSize={theme.typography.h7} fontFamily={theme.typography.fontFamily2}>{data}</Typography>  
                                )
                            })}
                        </Box>
                        <Box  height={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'} > 
                            <Badge badgeContent={500} max={99} color="primary" sx={{right:'1rem', bottom: '.15rem'}}/>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
            )
        })}
        </>
    )
}

export default ChatBar