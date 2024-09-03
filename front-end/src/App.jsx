import { useState } from 'react'
import './App.css'
import Join from './components/join/join'
import Chat from './components/chat/chat'
function App() {

  const [chatVisibility, setChatVisibility] = useState(false)

  return (
    <>
        {
          chatVisibility ? <Chat/> : <Join setChatVisibility={setChatVisibility} />
        }

    </>
  )
}

export default App
