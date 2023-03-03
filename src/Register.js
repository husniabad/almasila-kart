
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase';

function Register() {
  
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

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
            src='http://clipart-library.com/images_k/palm-tree-clipart-transparent/palm-tree-clipart-transparent-19.png' />
        </Link>

        <div className='login__container'>
            <h1>Register</h1>

            <form>
                <h5>E-mail</h5>
                <input  type='text' value={email} onChange=
                {e => setEmail(e.target.value) }/>

                <h5>Password</h5>
                <input type='password' value={password} onChange=
                {e => setPassword(e.target.value) }/>

                <p className='login__checkbox'>
                    <input type="checkbox" />
                By registering you agree to AlMasila-Kart terms and conditions
                </p>
                <button className='login__registerButton' 
                onClick={register}
                type='submit'>Create your accoun!</button>
            </form>
            <div className='login__switch'>
                <h3>Do You have An Account?</h3>
                <Link to="/login">
                <button className='login__signInButton'>Login</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register