import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { auth, provider } from './firebase';

export default function Login({setUser}) {
    

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user)
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img alt="whatsapp logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1280px-WhatsApp.svg.png"></img>
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}
