import { useEffect, useState, createContext } from "react";
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthProviderWrapper(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ user, setUser ] = useState(null)

    const storeToken = (token) =>{
        localStorage.setItem("authToken", token) 
    }

    const removeToken = (token) =>{
        localStorage.removeItem("authToken")
    }

    const authenticatedUser = async () =>{
        try {
        const storeToken = localStorage.getItem("authToken")
            
        if(storeToken){
                const { data } = await verifyService()
                setIsLoggedIn(true)
                setIsLoading(false)
                setUser(data)
    
            }else{
                setIsLoggedIn(false)
                setIsLoading(false)
                setUser(null)
                
    
            }
            
        } catch (error) {
            setIsLoggedIn(false)
            setIsLoading(false)
            setUser(null)
            
        }
    }

    const logOutUser = ()=>{
        removeToken()
        authenticatedUser()

    }

    useEffect(()=>{
        authenticatedUser()
    }, [])

    return(
        <AuthContext.Provider value={{
            isLoading,
            isLoggedIn,
            user,
            storeToken,
            logOutUser,
            authenticatedUser,
            setUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProviderWrapper}