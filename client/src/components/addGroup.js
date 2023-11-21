import React, {useState, useEffect} from 'react'
import { useMediaQuery, useTheme, Box, Grid, Avatar, Typography, Button } from '@mui/material';
import SearchBar, { MidInputBar } from './small-component/search-bar';
import {MdClose} from 'react-icons/md'
import {ChatState} from "context/chatContext"
import axios from 'axios'

const AddGroup = () => {
    const [next, setNext] = useState(true)
    const [fetch, setfetch] = useState([{name: 'emma', _id: '1234'},{name: 'emmasss', _id: '1234'},{name: 'emma', _id: '1234'},{name: 'emmderererea', _id: '1234'},])
    const [eText, setEText] = useState("")
    const [user, setUser] = useState([])
    const [members, setMembers] = useState([])
    const {backdrop, setBackdrop,} = ChatState()
    const theme = useTheme()

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
    const closeBackdrop = ()=>{
        setBackdrop({...backdrop, before: false, newGrp: false})
    }
    const handleNext = ()=>{
        console.log('next', eText)
        if(eText.trim() !== ""){
            setEText("")
            setNext(false)
        }
    }
    const handleCancel = ()=>{
        setEText("")
    }
    const handleBack = ()=>{
        setEText("")
        setNext(true)
    }
    const handleCreate = async()=>{
        // setBackdrop(false)
        if(user.length > 1){
            console.log('Creating grp chat')
            try {
                let token = localStorage.getItem('token')
                if(token !== null){
                    const chat = await axios.post("http://localhost:5500/api/chat/groupchat", {users: members})
                }
            } catch (err) {
                console.log('somethine went wrong')
            }
        }
    }
    const handleChange = (e)=>{
        let member = e.target.value
        let list = user.filter(data=>data === member)
        if(list.length > 0){
            console.log('user already exist')
        }else{
            setUser([...user, e.target.value])
            // setMembers([...members,])   this will take the IDs of the clicked users
            console.log(e.target.value, user)
        }
    }
    return (
        <>
            {next?
                <Box tabIndex="0" display={'grid'} gridTemplateRows={'repeat(12, 1fr)'} backgroundColor={'coral'} borderRadius={'.4rem'} width={'400px'} height={'12rem'}>
                    <Box gridRow={'span 9'}  p={'1.5rem'} display={'grid'} gridTemplateColumns={'repeat(12, 1fr)'}>
                        <Box gridColumn={'span 4'} display={'flex'} alignItems={'flex-end'} justifyContent={'flex-start'}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   sx={{height: '5.5rem',width: '5.5rem', borderRadius: '.2rem'}} />
                        </Box>
                        <Box gridColumn={'span 8'} display={'flex'} flexDirection={'column'} alignItems={'flex-end'} justifyContent={'space-between'} >
                            <MdClose onClick={closeBackdrop} style={{height: '1.55rem', width: '1.55rem', cursor: 'pointer'}} />
                            <MidInputBar pH={"Group name"} eText={eText} setEText={setEText} />
                        </Box>

                    </Box>
                    <Box gridRow={'span 3'} display={'flex'} alignItems={'center'} justifyContent={'flex-end'} pr={'1.5rem'}>
                            <Button onClick={handleCancel} >
                                <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>Cancel</Typography>
                            </Button>
                            <Button onClick={handleNext}>
                                <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>Next</Typography>
                            </Button>
                    </Box>
                </Box>:
                <Box tabIndex="0" display={'grid'} gridTemplateRows={'repeat(14, 1fr)'} backgroundColor={'coral'} height={'75vh'} width={'400px'} p={'1rem'} borderRadius={'.5rem'}>
                    <Box gridRow={'span 1'} display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Typography variant={'h4'} fontFamily={theme.typography.fontFamily2}>Add Members</Typography>
                        <MdClose onClick={closeBackdrop} style={{height: '1.55rem', width: '1.55rem', cursor: 'pointer'}} />
                    </Box>
                    <Box gridRow={'span 1'} > <MidInputBar pH={"Search"} eText={eText} setEText={setEText} /> </Box>
                    <Box gridRow={'span 11'}  overflow={'auto'}>
                        {fetch.map((data, ind)=>{
                            const {name, _id} = data
                            return(
                                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={1}>
                                <input type="checkbox" name="fire" id="fire" value={name} style={{height: '1.5rem' ,width: '1.5rem', color: 'red', backgroundColor: 'yellow'}} onChange={(e)=>handleChange(e)}  />
                                <label htmlFor="fire">
                                    <Typography variant={'h4'} fontFamily={theme.typography.fontFamily2}>{name}</Typography>
                                </label>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box gridRow={'span 1'} display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} pr={'1.5rem'}>
                            <Button onClick={handleBack} >
                                <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>back</Typography>
                            </Button>
                            <Button onClick={handleCreate} > <Typography variant={'h5'} fontFamily={theme.typography.fontFamily2}>Create</Typography> </Button>
                    </Box>

                </Box>
            }
        </>
    )
}

export default AddGroup