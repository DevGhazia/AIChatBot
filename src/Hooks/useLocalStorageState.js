import { useEffect, useState } from "react";

export function useLocalStorageState(key, defaultValue){
    const [value, setValue] = useState(()=>{
        const storedValue = localStorage.getItem(key); 
        return storedValue? JSON.parse(storedValue) : defaultValue;
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));    
    },[value])

    return [value, setValue];
}
