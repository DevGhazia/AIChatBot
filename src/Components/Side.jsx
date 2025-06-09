import React, { useContext } from 'react'
import {
  MdOutlineMenu, 
  MdOutlineAdd,
  MdOutlineDiamond,
  MdOutlineHelpOutline,
  MdOutlineSettingsBackupRestore,
  MdOutlineSettings,
  MdOutlineSegment,
  MdOutlineDelete
} from "react-icons/md";
import { PromptContext } from '../context/Context';
import Icon from './Icon';

const Side = () => {
  const { 
      isMenuExpanded, 
      chatLogs,
      startingScreen,
      OnNewChatButtonPress, 
      DeleteLog, 
      LoadLogsById, 
      chatLogId
    } = useContext(PromptContext);
  
  return (
    <div className={`sidebar ${isMenuExpanded? 'extended': ''}`}>
        { 
          <div className="center_icons">
            {chatLogs.length > 0 && <p className='recent'>Recent</p>}
            {chatLogs.map((chat)=> {
                  const titleLength = 28;
                  let title = "";
                  let slicedTitle = "Generating Response...";
                  if(chat.convo.length > 0){
                    title = chat.convo[0].question.replace(/^\w/, (c)=> c.toUpperCase());
                    slicedTitle = title.slice(0, titleLength);
                  }
                  return (
                    <button 
                      key={chat.id} 
                      onClick={()=> LoadLogsById(chat.id)}
                      className= {`icon_button ${(chat.id === chatLogId.current)? 'active' : ''}`}>
                      <MdOutlineSegment className='icon icon_small' />
                      <span className='icon_title'>{`${slicedTitle}${(title.length>titleLength)? "...":""}`}</span>
                      <div className='delete' onClick={(event)=> DeleteLog(chat.id, event)}><MdOutlineDelete /></div>
                    </button>
                  )
                return null;
              })
            }
          </div>
        }
        <div className="bottom_icons">
          <Icon title="Gem manager"><MdOutlineDiamond className='icon' /></Icon>
          <Icon title="Help"><MdOutlineHelpOutline className='icon' /></Icon>
          <Icon title="Activity"><MdOutlineSettingsBackupRestore className='icon'/></Icon>
          <Icon title="Settings"><MdOutlineSettings className='icon' /></Icon>
        </div>
    </div>
  )
}

export default Side