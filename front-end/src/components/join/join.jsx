import { useRef } from "react"
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}){

    const usernameRef = useRef()

    const handleSubmit = async() => {
        
        const username = usernameRef.current.value
        if(! username.trim()) return

        const socket = await io.connect('http://localhost:3001')
        
        socket.emit('set_username', username)
     
        setSocket(username)
        setChatVisibility(true)
    }

    return (
        <div>
            <h1>Hello come on Join</h1>
            <input type="text" placeholder="Username" ref={usernameRef} />
            <button onClick={() => handleSubmit()}>Entrar</button>
        </div> 
    )
}