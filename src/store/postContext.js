
import { createContext, useState } from "react";

export const PostContext = createContext(null)



function Post ({children}){
    const [postDetails,SetPostDetails]=useState("")

    return (
        <PostContext.Provider value={{postDetails,SetPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}
export default Post