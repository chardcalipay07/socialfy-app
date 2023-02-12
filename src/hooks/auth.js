import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { DASHBOARD, LOGIN } from '../lib/routes';
import {setDoc, doc, getDoc} from 'firebase/firestore';
import isUsernameExists from '../utility/isUsernameExists';

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState()
    const [user, setUser] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());
            setLoading(false);
        }

        if (!authLoading) {
            if (authUser) fetchData();
            else setLoading(false);
        }

    }, [authLoading] )

    return {user, isLoading, error}
    
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function login({email, password, redirectTo=DASHBOARD}) {
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "You are Logged In",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            navigate(redirectTo)
        } catch (error) {
            toast({
                title: "Logging Faild",
                discription: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            setLoading(false)
            return false; //return false if login failed
        }
        setLoading(false)
        return true; // return true if logon succeeded
    }

    return {login, isLoading}
}

export function useRegister() {
    const[isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function register({
        username,
        email,
        password,
        redirectTo = DASHBOARD,
        }) {
        setLoading(true);

        const usernameExists = await isUsernameExists(username);

        if ( usernameExists ) {
            toast({
                title: "Username already exists",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    Avatar: "",
                    date: Date.now(),
                });
                toast({
                    title: "Account created",
                    description: "You are logged in",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
                navigate(redirectTo)
            } catch (error) {
                toast({
                    title: "Sign up failded",
                    description: error.message,
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000, 
                });
            } finally {
                setLoading(false)
            }
        }
    }

    return {register, isLoading};
}

export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate()

    async function logout() {
        if (await signOut()) {
            toast({
                title: "Successfully logged out",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000, 
            })
            navigate(LOGIN);
        } // else show error 
    }

    return { logout, isLoading };
}


