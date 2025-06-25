import React, { useState } from 'react';
import { authService } from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const inputStyles = {};
const AuthForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data)
        } catch (e) {
            setError(e.message)
        }
    };
    return (
        <>
        <form onSubmit={onSubmit} className="container">
                <input name="email" className="authInput" type="email" placeholder="Email" value={email} onChange={onChange} required />
                {error}
                <input name="password" className="authInput" type="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" className="authInput authSubmit" value={newAccount ? '계정 생성' : '로그인'} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "sign in" : "create Account"}</span>
        </>
    )
}

export default AuthForm;