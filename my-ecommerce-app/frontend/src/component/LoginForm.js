import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [signup, setSignup] = useState(false); // variable to toggle between login and signup form

    const [username, setUsername] = useState(''); //  variable to store username
    const [password, setPassword] = useState(''); // variable to store password
    const [confirmPassword, setConfirmPassword] = useState(''); // variable to store confirm password
    const [email, setEmail] = useState(''); //  variable to store email
    const [message, setMessage] = useState(''); // ! may be redundant

    const [loggedIn, setLoggedIn] = useState(false);

   function handleAuthentication(){
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username, 'password': password}),
   })
   .then(response => response.json())
   .then(response =>{

        if (response.authenticated){
            setLoggedIn(true);
            setMessage("Authentication successful!");
        } else {
            setLoggedIn(false)
            setMessage("Authentication failed. Incorrect username or password.");
        }
   }) // todo implement this function
   .catch(error => setMessage("Authentication failed. Incorrect username or password."));
} 
    
    const handleSignup = (e) => {return} // todo implement this function

    return(
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
                        <p>{message}</p>
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

                </form>)}
        </div>
    </div>
    )
}
export default LoginForm;