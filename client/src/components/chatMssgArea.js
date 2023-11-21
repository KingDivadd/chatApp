import React, {useState, useEffect} from 'react'
import {Box,Grid, useMediaQuery, Typography, useTheme, Avatar} from '@mui/material'
import {BsThreeDotsVertical, BsFillInfoSquareFill} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'
import SearchBar, { BigSearchBar } from './small-component/search-bar'
import {RiAttachmentLine, RiSendPlane2Fill} from 'react-icons/ri'
import { ChatState } from 'context/chatContext'
import { LocalDining } from '@mui/icons-material'
import axios from 'axios'

const ChatMssgArea = () => {
    const [groupChat, setGroupChat] = useState({isGroup: false, sameUser: false})
    const isNonMobile = useMediaQuery("(min-width: 1040px)")
    const theme = useTheme()
    const {chat, text, setText, activeChat, user, chatMssg, setChatMssg, persistData, mssg, setMssg} = ChatState()

    const mssgDisplay = ()=>{
        // chatMssg.forEach((data, ind) => {
        //     let user2 = chatMssg.indexOf(data)
        //     if(user2 > 0 && chatMssg[user2].id === chatMssg[user2 - 1].id){
        //         // console.log("same user", data) 
        //         setGroupChat({...groupChat, sameUser: true})
        //     }else{
        //         // console.log("single", data)                      
        //         setGroupChat({...groupChat, sameUser: false})
        //     }
        // });
        
    }
    useEffect(() => {
    mssgDisplay()
    }, [])

    const handleSubmitt = async()=>{

        if (text.trim() !== "") {
            try {
                let token = localStorage.getItem('token')
                if(token !== null){
                    let content = text
                    let chatId = chat._id

                    const message = await axios.post("http://localhost:5500/api/mssg/sendmessage",{content : text, chatId: chat._id}, {
                        headers: {
                            "Content-type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    setChatMssg([...chatMssg, message.data.message])
                }else{
                    console.log("no token provided...")
                }
            } catch (err) {
                console.log("something went wrong, try again with good internet")
            }
            setMssg({id: '20', component: text.trim()})
            setText("")

        }else{
            console.log('field cannot be empty')
        }
    }
    return (
        <>{activeChat ?
        <Box display={'grid'} gridTemplateRows={'repeat(15, 1fr)'} height={'100%'}>
        
            <Box gridRow={"span 1"} backgroundColor={'steelblue'} p={'0 .5rem'} height={'100%'}>
                <Box display={'grid'} gridTemplateColumns={"repeat(12, 1fr)"} height={'100%'}>
                    {chat !== null ? <Box gridColumn={'span 9'} height={'100%'} display={'flex'} p={'.22rem 0'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                        <Box height={'50%'} display={'flex'} alignItems={'center'}> 
                            <Typography variant='h5' fontFamily={theme.typography.fontFamily2}>{chat.chatName}</Typography>  
                        </Box>
                        <Box  height={'50%'} display={'flex'} alignItems={'center'} gap={1}>
                            {chat.users.map((data, ind)=>{
                                return(
                            <Typography key={ind} fontSize={theme.typography.h7} fontFamily={theme.typography.fontFamily2}>{data.name}, </Typography>  

                                )
                            })}
                        </Box>
                    </Box> : "loading..."}
                    <Box gridColumn={'span 3'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} height={'100%'} >
                        <Box display={'grid'} gridTemplateColumns={"repeat(12, 1fr)"} gap={1}>
                            <Box gridColumn={'span 4'}><BsFillInfoSquareFill style={{height: '1.55rem', width: '1.5rem'}}/></Box>
                            <Box gridColumn={'span 4'}><FiSearch style={{height: '1.55rem', width: '1.5rem'}} /></Box>
                            <Box gridColumn={'span 4'}><BsThreeDotsVertical style={{height: '1.55rem', width: '1.5rem'}}/></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* the body */}
            <Box gridRow={"span 14"}  display={'grid'} gridTemplateRows={'repeat(14, 1fr)'}>
                <Box gridRow={"span 13"} backgroundColor={'green'} display={'flex'} alignItems={'flex-end'} justifyContent={'center'} p={'.5rem'}>
                    <Box width={'100%'}  maxHeight={'80vh'} overflow={'auto'}>
                    {chatMssg.map((data, ind)=>{
                        const {content} = data                        
                        return(
                            <Box key={ind}>
                            { data.sender._id !== persistData.user._id ?
                                <Box  className='user-1-message' height={'2.3rem'} mb={'.25rem'} gap={1} >
                                    {groupChat.isGroup ?
                                        <>{groupChat.sameUser ? 
                                            <Avatar className='user-1-pic' alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                            :
                                            <Avatar className='user-1-pic' alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{visibility: 'hidden'}} /> 

                                        }</>
                                    :
                                    <Box width={'.5rem'}></Box>}
                                    <Typography className='message user-1'  variant='h5' width={'fit-content'}   display={'flex'} alignItems={'center'} height={'100%'} >{content}</Typography>
                                </Box>
                                :
                                <>
                                {/* this is for logged in user */}
                                <Box  className='user-2-message' height={'2.3rem'} mb={'.25rem'} mr={'.75rem'}>
                                    <Typography className='message user-2' variant='h5' width={'fit-content'}  display={'flex'} alignItems={'center'} height={'100%'}>{content} </Typography>
                                </Box> 
                                </> }


                            </Box>
                        )
                    })}
                    </Box>
                </Box>

                <Box gridRow={"span 1"} backgroundColor={'steelblue'}  display={'grid'} gridTemplateColumns={'repeat(14, 1fr)'} gap={1}>
                        <Box gridColumn={"span 1"}  display={'flex'} justifyContent={'center'} alignItems={'center'}><RiAttachmentLine style={{height: '1.55rem', width: '1.5rem'}}/></Box>
                        <Box gridColumn={"span 12"} display={'flex'} justifyContent={'center'} alignItems={'center'}
                        ><BigSearchBar /></Box>
                        <Box gridColumn={"span 1"} display={'flex'} justifyContent={'center'} alignItems={'center'}><RiSendPlane2Fill onClick={handleSubmitt} style={{height: '1.55rem', width: '1.5rem', cursor: 'pointer'}} /></Box>
                </Box>
            </Box>
        </Box>
            :
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>Click on the chat to chat</Box>
        }</>
    )
}

export default ChatMssgArea