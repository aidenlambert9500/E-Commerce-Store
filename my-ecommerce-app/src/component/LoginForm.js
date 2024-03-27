import React, {useState} from 'react';

function LoginForm() {
    const [signup, setSignup] = useState(false);
    
    return(
        <div>
            <h2>Login</h2>
            <div className="login-form"></div>
                {!signup &&
                    (<form className="login-form">
                        <label>Username</label>
                        <input type="text" placeholder="Enter your username"  required/><br/>
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password"  required/><br/>
                        <button type="submit">Login</button>
                        <button onClick={() => setSignup(!signup)}className="signup">Switch to Signup</button>
                    </form>)}
            <div/>
            <div className='signup-form'>
                {signup && 
                    (<form className="login-form">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username"  required/><br/>
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required /><br/>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password"  required/><br/>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required /><br/>
                    <button type="submit">Signup</button>
                    <button onClick={() => setSignup(!signup)} className="signup">Switch to Login</button>

                </form>)}
        </div>
    </div>
    )
}
export default LoginForm;