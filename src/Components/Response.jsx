import React, { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import geminiIcon from "../assets/gemini_icon.png"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { PromptContext } from '../context/Context';

const Response = ({question, answer, isLoading, messRef}) => {
    const {ScrollToTop} = useContext(PromptContext);
    useEffect(()=>{if(messRef)ScrollToTop()}, [messRef]);

    return (
        <div className={`response_log ${messRef? "log_additional" : ""}`}>
            <div className="chatBubble" ref={messRef}><span>{question}</span></div>
            <div className="response_text">
                <img className={isLoading? "rotate" : ""} src={geminiIcon} alt="" />
                {isLoading? 
                    <div className="loadingBarsContainer">
                        <div className="loadingBar"></div>
                        <div className="loadingBar"></div>
                        <div className="loadingBar"></div>
                    </div> :
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{answer}</ReactMarkdown>
                } 
            </div>
        </div>
    )
}

export default Response;