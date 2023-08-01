import React, { createContext, useContext, useState } from "react"
import { Auth, LoginResponse } from "../../Types/Auth"

export interface AuthState {
    authProfile: Auth | null
    isLogged: boolean,
    logout: () => void,
    signIn: (data: LoginResponse) => void,
    setProfile: (data: Auth) => void
}

const AuthContext = createContext<AuthState | null>(null)
export const useAuth = () => useContext(AuthContext)
export const AuthContextConsumer = AuthContext.Consumer
export const AuthProvider = ({ children }: { children: any }) => {
    const [authState, setAuthState] = useState(() => {
        const authStoredData = localStorage.getItem('data.auth')
        if (!authStoredData || !JSON.parse(authStoredData)) return null
        return {
            authProfile: JSON.parse(authStoredData) as Auth,
            isLogged: localStorage.getItem('tokens') !== null
        }

    });

    const signIn = (data: LoginResponse) => {
        const authProfile: Auth = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar_url: data.avatar_url,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }

        localStorage.setItem('data.auth', JSON.stringify(authProfile))
        localStorage.setItem("tokens", JSON.stringify({ access_token: data.access_token, refresh_token: data.refresh_token }))

        setAuthState({
            authProfile,
            isLogged: true
        })
    }

    const logout = () => {
        localStorage.removeItem('data.auth')
        localStorage.removeItem('tokens')
        setAuthState(null)
    }

    const setProfile = (data: Auth) => {
        setAuthState((prev) => {
            return { isLogged: prev?.isLogged || false, authProfile: data }
        })
        localStorage.setItem('data.auth', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ authProfile: authState?.authProfile || null, isLogged: authState?.isLogged || false, logout, signIn, setProfile }}>
            {children}
        </AuthContext.Provider>
    )
}
