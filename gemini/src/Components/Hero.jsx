import React, { useContext, useEffect, useRef, useState } from 'react'
import iconImage from "../assets/woman.png"
import Icon from './Icon'
import { IoMdSend} from 'react-icons/io'
import { MdOutlineMenu, MdOutlineAdd } from 'react-icons/md'
import { PromptContext } from '../context/Context'
import { Outlet } from 'react-router-dom'

const Hero = () => {
  const {
    runPrompt, 
    setInput, 
    input, 
    handleEnterKey, 
    sendButtonDisabled, 
    startingScreen,
    OnNewChatButtonPress,
    OnMenuExpansion,
    isMenuExpanded,
  } = useContext(PromptContext);

  const promptRef = useRef(null);

  useEffect(()=>{
    window.onload = function(){
      promptRef.current.focus();
    }
  },[]);

    return (
      <div className='hero'>
        {/* -------NAVBAR------ */}
        <header className="navbar">
          <div className='left_navbar_icons'>
            <Icon 
              onClick={OnMenuExpansion} 
              title="Expand menu" 
              additionalStyle={"menu"}
              disableTitle={true}>
                <MdOutlineMenu className="icon" />
            </Icon>
            <div className="title" onClick={OnNewChatButtonPress}>Gemini</div>
          </div>
          <div className="right_navbar_icons">
            <Icon 
              onClick={OnNewChatButtonPress} 
              title={`${isMenuExpanded? "New chat": "New Chat"}`} 
              additionalStyle ="newChat"
              isDisabled={startingScreen}>
                <MdOutlineAdd className='icon' />
            </Icon>
            <button className='user_icon'>
              <img src={iconImage} alt="" className='user_icon_img' />
              {/* <FiUser className='user_icon_img'/> */}
            </button>
          </div>
        </header>
        {/* --------MAIN_CONTENT--------- */}
        <div className="content">
          <div className="contentContainer">
            <Outlet />
          </div>
          <div className="promptContainer">
            <input 
              ref={promptRef}
              onChange={(e)=>{setInput(e.target.value)}} 
              value={input} 
              type="text" 
              className='prompt' 
              placeholder='Ask Gemini' 
              onKeyDown={handleEnterKey}
            />
            <button 
              disabled={sendButtonDisabled} 
              onClick={()=>{
                runPrompt()}} 
              className="submit_button">
              <IoMdSend className='submit_icon'/>
            </button>
          </div>
          <p 
            className='disclaimer'
            style={{visibility: startingScreen? "hidden" : "visible"}}>
            Gemini can make mistakes, so double-check it
          </p> 
        </div>
      </div>
    )
  }

export default Hero
