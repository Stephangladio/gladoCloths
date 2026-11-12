
import {
    createContext,
    useContext,
    useState,
} from "react";

import type { ReactNode } from "react";

export interface User {
    fullName: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    register: (fullName: string, email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

function getSavedUser(): User | null {
    try {
        const savedUser = localStorage.getItem("glado-user");
        return savedUser ? JSON.parse(savedUser) as User : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getSavedUser);

    function login(email: string, password: string) {
        try {
            const savedAccount = localStorage.getItem("glado-account");

            if (!savedAccount) return false;

            const account = JSON.parse(savedAccount);

            if (
                account.email !== email ||
                account.password !== password
            ) {
                return false;
            }

            const loggedInUser: User = {
                fullName: account.fullName,
                email: account.email,
            };

            localStorage.setItem(
                "glado-user",
                JSON.stringify(loggedInUser)
            );

            setUser(loggedInUser);
            return true;
        } catch {
            return false;
        }
    }

    function register(
        fullName: string,
        email: string,
        password: string
    ) {
        const account = {
            fullName,
            email,
            password,
        };

        localStorage.setItem(
            "glado-account",
            JSON.stringify(account)
        );

        const newUser: User = {
            fullName,
            email,
        };

        localStorage.setItem("glado-user", JSON.stringify(newUser));
        setUser(newUser);

        return true;
    }

    function logout() {
        localStorage.removeItem("glado-user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}