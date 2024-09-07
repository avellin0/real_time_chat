import { useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
export default function Chat(){

    const Socket = io("http://localhost:3001")

    const [messageList,setMessageList] = useState([])

    const messageRef = useRef()

    useEffect(()=>{        
        Socket.on('set_username', username => {
            Socket.data.username = username
        })

        Socket.on('mensagem', data => {
            console.log("A mensagem está vindo assim:", data);
            setMessageList((current) => [...current , {text: data.text, author: "" , authorId: data.authorId}])
            console.log("esse é o data:", data);
            
        })

        return () => Socket.off('mensagem')

    },[socket])


    const handleSubmit = () => {
        const message = messageRef.current.value;
        if(!message.trim()) return

        Socket.emit('send_message', message)
        cleanInput()

        console.log(message);
        
    }

    const cleanInput = () => {
        messageRef.current.value = ""
    }

    console.log("essa é a lista de mensagem atual:", messageList);

    return (
        <div>
            <h1>Hello</h1>
            {
                messageList.map((message,index) => (
                    <p key={index}> {message.author}: {message.text}</p>
                ))
            }
            <input type="text" placeholder="Username" ref={messageRef} />
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
    )
}