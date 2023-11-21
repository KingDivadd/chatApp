import React, {useState, useEffect} from 'react'
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import LoginForm from 'components/loginForm'

const Login = () => {
    const {mode, setMode} = ChatState()
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
            </Box>
            <Box
                width={isNonMobileScreens ? "45%" : "93%"}
                p="1.5rem"
                m="2rem auto"
                borderRadius=".3rem"
                backgroundColor={theme.palette.background.alt}
            >
                {/* <Typography fontWeight="500" fontFamily={theme.typography.fontFamily2}  variant="h2" sx={{ mb: "1.5rem", display: 'flex', justifyContent: 'center'}}>
                Login
                </Typography> */}
                <LoginForm />
            </Box>
        </Box>
    );
}

export default Login