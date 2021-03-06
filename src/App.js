
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/auth";
import Header from './Components/Header/Header';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const verifyTokenAPIURL = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token) return;
    const requestConfig = {
      //store as envirnment variable later
      headers: {
     'x-api-key': 'Yln5N5b8Sq5m265snaDVc5TWJiAS1Qn980O4FkfD',
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }
    //Uses verify api path to verify token sets authenicating to false when authentication is done if verification does 
    //not work resets user session
    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })
  
    }, []);
    const token = getToken();
    if (isAuthenticating && token){
      return <div className="content">Authenticating...</div>
    }
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
