import { useState } from 'react';

import './SignUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { AppDispatch, RootState } from '../../../redux/store';

function SignUp() {
  const dispatch: AppDispatch = useDispatch();
  const { displayModalSignUp, isConnected } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalSignUp
      ? dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_SIGNUP' });
  return (
    <>
      {displayModalSignUp ? (
        <div id="Settings">
          <button id="closeButton" onClick={handleDialogDisplay}>
            <IoIosCloseCircle className="react_icon" />
          </button>
          <form>
            <input type="Email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      ) : (
        <button onClick={handleDialogDisplay}>SignUp</button>
      )}
    </>
  );
}

export default SignUp;
