import React from 'react'
import { useParams } from 'react-router-dom'

const ChatPage = () => {
  const {id} = useParams();
  return (
    <div>ChatPage {id}</div>
  )
}

export default ChatPage