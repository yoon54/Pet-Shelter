import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';



const Login = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dologin = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", {email, password}, {
      withCredentials: true
    })
      .then( res => {
        console.log(res);
        if(res.data.loggedIn) {
          navigate("/pets");
        } else {
          setErrorMessage("Invalid login attempt!");
        }
      }).catch( err => console.log(err) );
  }

  return (
    <article className="message is-success">
      <div className="message-header">
        <p>Login</p>
      </div>
      <div className="message-body">
        <form onSubmit={ dologin }>
          <label className="label">Email</label>
          <input type="text" className="input" onChange={e => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input type="password" className="input" onChange={e => setPassword(e.target.value)} />
          <br /><br />
          <button style={{width: "100%"}} className="button is-success" type="submit">Submit</button>
          {
            errorMessage.length > 0 ? 
            <><br /><p className="is-danger">{errorMessage}</p></> :
            ""
          }
        </form>
      </div>
    </article>
  );

}

export default Login;