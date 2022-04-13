import { useState,useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext  from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef('');
  const pwdInputRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext)
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) =>{
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPwd = pwdInputRef.current.value;
    let url;
    if(isLogin){
       url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkumDuMgZu2oUdyyej2yjBFyrPpn77n98`
    }
    else{
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkumDuMgZu2oUdyyej2yjBFyrPpn77n98`
    }
      const addUser = async() => { 
       try{
        setIsLoading(true)
        const res = await fetch(url,{
          method: 'POST',
          body : JSON.stringify({
            email: enteredEmail,
            password: enteredPwd,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await res.json();
        console.log(result);
        setIsLoading(false);
        authCtx.login(result.idToken);
        history.replace('/');

        if(!result.ok && result.error.message !== undefined){
          throw new Error(result.error.message);
        }
        return result;
      }
      catch(err) {
        let errorMessage = 'authenitcation failed';
        if(err){
          errorMessage = err;
          }
          console.log(errorMessage);
        }
       }
      addUser();
    }
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={pwdInputRef}/>
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p>Sending request..</p>} 
         <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
