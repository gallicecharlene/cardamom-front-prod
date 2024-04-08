import { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import { AppDispatch, RootState } from '../../../redux/store';
import { loginAction } from '../../../redux/User/action';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { displayModalLogIn } = useSelector(
    (store: RootState) => store.settings
  );
  const jwtToken = useSelector((state: RootState) => state.auth.jwt);

  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(loginAction({ email, password }));

      handleDialogDisplay();

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    console.log('JWT:', jwtToken);
  }, [jwtToken]);

  return (
    <>
      {displayModalLogIn ? (
        <div id="Settings">
          <button id="closeButton" onClick={handleDialogDisplay}>
            <IoIosCloseCircle className="react_icon" />
          </button>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      ) : (
        <button onClick={handleDialogDisplay}>Log In</button>
      )}
    </>
  );
}

export default LogIn;
