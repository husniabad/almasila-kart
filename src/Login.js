
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase';

function Login() {
  
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e =>{
    e.preventDefault();
    //firebase login
    auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();
    //firebase register

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) =>{
            // sucess create new user
            console.log(auth);
            if (auth){
                history.push('/');
            }
        }
        )
        .catch( error => alert(error.message));
  }

  return (
    <div className='login'>
        <Link to='/'>
            <img className='login__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input  type='text' value={email} onChange=
                {e => setEmail(e.target.value) }/>

                <h5>Password</h5>
                <input type='password' value={password} onChange=
                {e => setPassword(e.target.value) }/>

                <button className='login__signInButton' 
                onClick={signIn}
                type='submit'>Sign In</button>
            </form>
            <p>
            By signing-in you agree to Amazon terms and conditions
            By signing-in you agree to Amazon terms and conditions
            </p>
            <button className='login_registerButton'
            onClick={register}>Create your accoun!</button>
        </div>
    </div>
  )
}

export default Login