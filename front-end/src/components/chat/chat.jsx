import { useState, useRef, useEffect } from "react"
export default function Chat({socket}){


    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message')
    }, [socket])

    const handleSubmit = () => {
        const message = messageRef.current.value;
        
        if(!message.trim()) return 
        
        socket.emit('message', message)
        clearInput()
    }

    const clearInput = () => {
        messageRef.current.value = ""
    }


    return (
        <div>
            <h1>Hello</h1>
           {
            messageList.map((message,index) => (
                <p key={index}>{message.author}: {message.text}</p>
            ))
           }
            <input type="text" placeholder="Username" ref={messageRef} />
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
    )
}