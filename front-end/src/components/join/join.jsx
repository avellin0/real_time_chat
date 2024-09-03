import { useRef } from "react"


export default function Join({setChatVisibility}){

    const usernameRef = useRef()

    const handleSubmit = () => {
        const username = usernameRef.current.value
        if(! username.trim()) return
        console.log("submit");
    }

    return (
        <div>
            <h1>Hello World</h1>
            <input type="text" placeholder="Username" ref={usernameRef} />
            <button onClick={() => handleSubmit()}>Entrar</button>
        </div>
    )
}