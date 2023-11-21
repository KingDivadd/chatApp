import React, {useState, useContext, useEffect, createContext} from "react";

const ChatContext = createContext()

export const ChatProvider = ({children})=>{
    const [mode, setMode] = useState("dark")
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [chat, setChat] = useState(null)
    const [chatMssg, setChatMssg] = useState([])
    const [text, setText] = useState("")
    const [menu, setMenu] = useState(false)
    const [backdrop, setBackdrop] = useState({before: false, addAcct: false, newGrp: false, crateChat: false, settings: false, grpInfo: false, profile: false})
    const [activeChat, setActiveChat] = useState(false)
    const [persistData, setPersistData] = useState({mode: 'dark', user: null, isAuth: false, chat: null,})


    return <ChatContext.Provider 
            value={{mode, setMode, user, setUser, token, setToken, isAuth, setIsAuth, chat, setChat, persistData, setPersistData, activeChat, setActiveChat, chatMssg, setChatMssg, text, setText, menu, setMenu, backdrop, setBackdrop}}
            >
            {children}
        </ChatContext.Provider>
} 

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatProvider