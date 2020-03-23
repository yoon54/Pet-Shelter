import React, { useState } from 'react';
import { navigate } from '@reach/router';
import Axios from 'axios';
import 'bulma/css/bulma.min.css';


const Register = props => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const Doregister = e => {
    e.preventDefault();
    const user = { firstName, lastName, email, password, confirmPassword };
    Axios.post("http://localhost:8000/api/register", user, {
      withCredentials: true
    })
      .then( res => {
        console.log(res);
        if(res.data.loggedIn) {
          navigate("/pets");
        } else {
          setErrors(res.data.errors);
        }
      }).catch( err => console.log(err) );
  }

  return (
    <article className="message is-info">
      <div className="message-header">
        <p>Register</p>
      </div>
      <div className="message-body">
        <form onSubmit={ Doregister }>
          <label className="label">First Name</label>
          <input type="text" className="input" onChange={e => setFirstName(e.target.value)} />
          {
            errors.firstName ? 
            <p class="help is-danger">{errors.firstName.message}</p> :
            ""
          }
          <label className="label">Last Name</label>
          <input type="text" className="input" onChange={e => setLastName(e.target.value)} />
          {
            errors.lastName ? 
            <p class="help is-danger">{errors.lastName.message}</p> :
            ""
          }
          <label className="label">Email</label>
          <input type="text" className="input" onChange={e => setEmail(e.target.value)} />
          {
            errors.email ? 
            <p class="help is-danger">{errors.email.message}</p> :
            ""
          }
          <label className="label">Password</label>
          <input type="password" className="input" onChange={e => setPassword(e.target.value)} />
          {
            errors.password ? 
            <p class="help is-danger">{errors.password.message}</p> :
            ""
          }
          <label className="label">Confirm Password</label>
          <input type="password" className="input" onChange={e => setConfirmPassword(e.target.value)} />
          {
            errors.confirmPassword ? 
            <p class="help is-danger">{errors.confirmPassword.message}</p> :
            ""
          }
          <br /><br /><br />
          <button style={{width: "100%"}} className="button is-info" type="submit">Submit</button>
        </form>
      </div>
    </article>
  );

}

export default Register;