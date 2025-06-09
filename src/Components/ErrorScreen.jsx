import React, { useContext, useEffect } from 'react'
import { PromptContext } from '../context/Context'

const ErrorScreen = () => {
  const {OnNewChatButtonPress} = useContext(PromptContext);
  return (
    <div className='error'>
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking doesn't exist.</p>
        <button className='error_button' onClick={OnNewChatButtonPress}>Go to Home</button>
    </div>
  )
}

export default ErrorScreen