import classes from './ProfileForm.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const newPwdRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (e) => {
      e.preventDefault();
      const enteredNewPassword = newPwdRef.current.value;
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBkumDuMgZu2oUdyyej2yjBFyrPpn77n98`,{
        method: 'POST',
        body: JSON.stringify({
          idToken : authCtx.token,
          password : enteredNewPassword,
          returnSecureToken : false
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      }).then(res => {
        history.replace('/');
        console.log('send new pwd', res);
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPwdRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
