import React, { useContext } from 'react'
import { PromptContext } from '../context/Context';

const Icon = ({children, additionalStyle, title, onClick, disableTitle, isDisabled=false}) => {
  const {isMenuExpanded} = useContext(PromptContext);
  return (
    <>
        <button 
          onClick={onClick} 
          className={`icon_button ${additionalStyle}`}
          disabled={isDisabled}>
            <div className="iconContainer">{children}</div>
            {(isMenuExpanded && title && !disableTitle)? <span className='icon_title'>{title}</span> : null}
            <div className="toolTip">{title}</div>
        </button>
    </>
  )
}

export default Icon