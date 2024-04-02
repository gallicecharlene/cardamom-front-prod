import { useState } from 'react';

import './LogIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { AppDispatch, RootState } from '../../../redux/store';

function LogIn() {
  const dispatch: AppDispatch = useDispatch();
  const { displayModalLogIn, isConnected } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });
  return (
    <>
      {displayModalLogIn ? (
        <div id="Settings">
          <button id="closeButton" onClick={handleDialogDisplay}>
            <IoIosCloseCircle className="react_icon" />
          </button>
          <form>
            <input type="Email" placeholder="Email" />
            <input type="password" placeholder="mot" />
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
