import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import LoginForm from './LoginForm.js';

function Login(){
    

    return(
        <div className="login">
            <Header />
            <LoginForm />             
            <br/><Footer/>
        </div>
    )
}

export default Login;