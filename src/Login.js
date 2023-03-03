
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

//   const register = e => {
//     e.preventDefault();
//     //firebase register

//     auth
//         .createUserWithEmailAndPassword(email, password)
//         .then((auth) =>{
//             // sucess create new user
//             console.log(auth);
//             if (auth){
//                 history.push('/');
//             }
//         }
//         )
//         .catch( error => alert(error.message));
//   }

  return (
    <div className='login'>
        <Link to='/'>
            <img className='login__logo'
            src='http://clipart-library.com/images_k/palm-tree-clipart-transparent/palm-tree-clipart-transparent-19.png' />
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
            <div className='login__switch'>
                <h3>
                You Don't Have An Account??
                </h3>
                <Link to="/register"> 
                    <button className='login__registerButton' >
                    Create Your Account Now!</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login