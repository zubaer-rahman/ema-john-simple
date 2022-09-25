import React,  { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, SignInWithEmailAndPassword} from './LoginManager';
 
function Login() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    img:'',
    error: '',
    success: false

  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  let {from} = location.state || {from: {pathname: "/"}};

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
 
  const handleSubmit = (event) => {
    if (isNewUser && user.email && user.password){
      CreateUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!isNewUser && user.email && user.password) {
      SignInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    event.preventDefault();
   
  }

  const handleResponse = (res, to_navigate) => {
      setUser(res);
      setLoggedInUser(res);
      if(to_navigate) {
        navigate(from);
      }    
  }
 
  const handleBlur = (event) => {
     let isFieldValid = true;
     event.target.name === "email"? isFieldValid = /\S+@\S+\.\S+/.test(event.target.value) :  
     event.target.name === "password"? isFieldValid = /(?=.*[0-9])/.test(event.target.value) :
                                       isFieldValid = true;

    if  (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }                                     
  }
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn? <button onClick={signOut}> Sign Out </button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      {
        <button onClick={fbSignIn}>Sign In uisng Facebook</button>
      }
      {
        user.isSignedIn && <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <img src={user.img} alt="not found" />
      </div>
      }

      <h1> Our Own Authentication </h1>
      <input type="checkbox" onChange={() => setIsNewUser(!isNewUser)} name="" id="isNewUser" />
      <label htmlFor="isNewUser">New User Sign Up</label>
      
      <form onSubmit={handleSubmit}>

        {
          isNewUser && <input type="text" onBlur={handleBlur} name='name' placeholder='your name' />
        }
        <br />
        <input type="email" onBlur={handleBlur} name='email' placeholder='email' required />
        <br />
        <input type="password" onBlur={handleBlur} name='password' placeholder='password' required />
        <br />
        <input type="submit" value={isNewUser? "Sign Up" : "Sign In"} />

      </form>
      <p style={{color: "red"}}> {user.error}</p>
      {
        user.success && <p style={{color: "green"}}> User {isNewUser? "created" : "signed in"} successfully!</p>
      }
    </div>
  );
}

export default Login;
