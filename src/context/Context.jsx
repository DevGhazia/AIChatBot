import { createContext, useEffect, useRef, useState } from "react";
import run from "../config/Gemini";
import { useNavigate, useLocation} from "react-router-dom";
import {useLocalStorageState} from "../Hooks/useLocalStorageState"
export const PromptContext = createContext();
            
function ContextProvider({children}){
            
    const [input, setInput] = useState("");
    const [responses, setResponses] = useState([]);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [newChatButtonDisabled, setNewChatButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [startingScreen, setStartingScreen] = useState(true);
    const [history, setHistory] = useState([]);

    const [chatLogs, setChatLogs] = useLocalStorageState("chatLogs", []);
    const [isMenuExpanded, setIsMenuExpanded] = useLocalStorageState("menu", false);
    
    const chatLogId = useRef(-1);
    const currentPrompt = useRef("");
    const currentAnswer = useRef("");
    const latestMessRef = useRef(null);
    
    const navigate = useNavigate();
    const location = useLocation();

    // **** DISABLE/ENABLE SEND BUTTON ****
    useEffect (()=>{
        if(input !== "" && !isLoading)
            setSendButtonDisabled(false);
        else
            setSendButtonDisabled(true);
    }, [input]);

    // ******* UPDATE CHATLOGS *******
    useEffect(()=>{
        if(isComplete){
            updateHistoryAndChatLogs();
        }
    },[isComplete, responses]);

    function LoadLogsById(id){
        const currentLog = chatLogs.find(chat=> chat.id === Number(id));
        if(currentLog){
            navigate("/app/"+id);
            chatLogId.current = currentLog.id;
            setResponses(currentLog.convo);
            setHistory(currentLog.history);
            setNewChatButtonDisabled(false);
            setStartingScreen(false);
        }
        else
            navigate("error");
        if(window.innerWidth < 960)
            setIsMenuExpanded(false);
    }

    function updateHistoryAndChatLogs(){
        const nextEntry = [
            {role: "user", parts: [{text: currentPrompt.current}]},
            {role: "model", parts: [{text: currentAnswer.current}]}
        ]
        setHistory(prev=> {
            const updatedHistory = [...prev, ...nextEntry];
            setChatLogs(previous=> previous.map(chat=>{
                if(chat.id === chatLogId.current){
                    chat.history = updatedHistory;
                    chat.convo = responses;
                }
                return chat;
            }))
            return updatedHistory;
        });
        currentPrompt.current = "";
        currentAnswer.current = "";
        setIsComplete(false);
    }

    function createNewChatLog(){
        chatLogId.current = Date.now();
        const newEntry = 
            {
                id: chatLogId.current, 
                history: [],
                convo: [] 
            }
        setHistory([]);
        setResponses([]);
        setChatLogs(prev=> [newEntry, ...prev]);
    }
        
    async function runPrompt(){
        if(location.pathname === "/app"){
            createNewChatLog();
            navigate("app/"+ chatLogId.current, {state:{ isFromButton : true}});
            setStartingScreen(false);
            setNewChatButtonDisabled(false);
        }

        currentPrompt.current = input;
        setInput("");
        setIsLoading(true);
        setIsComplete(false);

        const newResponseProps = {
            id: Date.now(),
            question: currentPrompt.current,
            answer: "",
            isLoading: true
        }
        setResponses(prev=> [...prev, newResponseProps]);
        try{
            const rawTextStream = await run(input, history); 
            setIsLoading(false);
            typeChunks(rawTextStream, newResponseProps);
        }
        catch(error){
            setIsLoading(false);
            console.error("Api error : ", error);
        }
    }
    
    async function typeChunks(rawText, newResProps){
        let currentIndex = 0;
        for await(const chunk of rawText){
            let words = [];
            words = chunk.text().split(" ");
            for(let word of words){
                currentAnswer.current +=`${word} `;
                setResponses(prev=> prev.map(res => 
                    (res.id === newResProps.id)? 
                    {...res, answer: currentAnswer.current, isLoading: false} : res
                ))
                await new Promise(resolve => setTimeout(resolve, 15));
            } 
            currentIndex++;
        }
        setIsComplete(true);
    }

    function OnNewChatButtonPress(){
        navigate("/app");    
        setStartingScreen(true);
        chatLogId.current = "";
    }

    function OnMenuExpansion(){ setIsMenuExpanded(prev => !prev)};

    function handleEnterKey(event){
        if(event.key == "Enter" && !sendButtonDisabled){
            event.preventDefault();
            runPrompt();
        }
    }

    function DeleteLog(id, event){
        event.stopPropagation();
        setChatLogs((prev)=>prev.filter((log)=> log.id !== id));
        if(id === chatLogId.current){
            OnNewChatButtonPress();
        }
    }

    function ScrollToTop(){
        latestMessRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    const contextValue = {
        runPrompt,
        setInput,
        input, 
        responses,
        handleEnterKey,
        sendButtonDisabled,
        startingScreen,
        chatLogs,
        chatLogId,
        isMenuExpanded,
        OnMenuExpansion,
        OnNewChatButtonPress,
        LoadLogsById,
        newChatButtonDisabled,
        DeleteLog,
        latestMessRef,
        ScrollToTop
    }
    
    return(
        <PromptContext.Provider value={contextValue}>
            {children}
        </PromptContext.Provider>
    )
}

export default ContextProvider;

