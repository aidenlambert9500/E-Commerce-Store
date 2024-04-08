import React, {useContext, useState} from 'react';
import { UserContext } from './UserContext';
import {useNavigate} from 'react-router-dom';

function LoginForm() {
    const [signup, setSignup] = useState(false); // variable to toggle between login and signup form
    const navigate = useNavigate(); // variable to navigate between pages
    const [username, setUsername] = useState(''); //  variable to store username
    const [password, setPassword] = useState(''); // variable to store password
    const [confirmPassword, setConfirmPassword] = useState(''); // variable to store confirm password
    const [email, setEmail] = useState(''); //  variable to store email
    const [message, setMessage] = useState(''); // variable to store message

    const {setLoggedIn} = useContext(UserContext);

    
    
    function handleAuthentication(event){
        event.preventDefault(); // * THIS LINE IS IMPORTANT
        console.log(username, password);
        fetch('http://localhost:5000/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': username, 'password': password}),
    })
    .then(response => response.json())
    .then(response =>{

            if (response.loggedIn){
                setLoggedIn(true);
                console.log("Logged In:" , response.loggedIn);
                setMessage("Authentication successful!");
                navigate('/Productpage');
            } else {
                setLoggedIn(false)
                console.log("Logged In:" , response.loggedIn);
                setMessage("Authentication failed. Incorrect username or password.");
            }
    }) 
    .catch(error => setMessage("Authentication failed. Incorrect username or password."));
    
};
    
    function handleSignup(event) {
        event.preventDefault();
        console.log(username, password, confirmPassword, email);
        if (password !== confirmPassword){
            setMessage("Passwords do not match");
            return;
        } else {
            fetch('http://localhost:5000/Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username': username, 'password': password, 'email': email}),
        })
        .then(response => response.json())
        .then(response => {
        if (response.success){
            setMessage("Signup successful!");
            setSignup(false);
        } else {
            setMessage("Signup failed. Username already exists.");
        }
        
    }).catch(error => setMessage("Signup failed. Incorrect username or password.")); 
}}
    return(
        <UserContext.Provider value={{setLoggedIn}}>
        <div>
            <h2>Login</h2>
            <div className="login-form"></div>
                {!signup &&
                    (<form className="login-form">
                        <label>Username</label>
                        <input type="text" placeholder="Enter your username" required onChange={(e) =>setUsername(e.target.value)}/><br/>
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required onChange={(e) =>setPassword(e.target.value)}/><br/>
                        <button type="submit" onClick={handleAuthentication}>Login</button>
                        <button onClick={() => setSignup(!signup)}className="signup">Switch to Signup</button>
                        <br/>  
                        {message && <p>{message}</p>}
                    </form>)}
            <div/>
            <div className='signup-form'>
                {signup && 
                    (<form className="login-form">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" required onChange={(e) =>setUsername(e.target.value)}/><br/>
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required onChange={(e) =>setPassword(e.target.value)} /><br/>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" required onChange={(e) =>setConfirmPassword(e.target.value)}/><br/>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required onChange={(e) =>setEmail(e.target.value)} /><br/>
                    <button type="submit" onClick={handleSignup}>Signup</button>
                    <button onClick={() => setSignup(!signup)} className="signup">Switch to Login</button>
                    {message && <p>{message}</p>}
                </form>)}
        </div>
    </div>
    </UserContext.Provider>
    );
}
export default LoginForm;