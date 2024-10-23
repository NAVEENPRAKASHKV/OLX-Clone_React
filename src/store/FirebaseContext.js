import { createContext, useState } from "react";



const FirebaseContext = createContext(null);
 
export const Authcontext =createContext(null);

export default FirebaseContext

// this functional componet is used for wrapping the entire app with context as state varable
export function Context({children}){
    const [user,setUser] =useState(null)

    return (
        <Authcontext.Provider value={{user,setUser}}>
             {children}
        </Authcontext.Provider>
    )
}