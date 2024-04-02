import { userData } from '../../data';
import { loginAction } from '../../redux/Settings/action';
import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import { useDispatch } from 'react-redux';
import { UserData } from '../../types';

function AppHeader() {
  return (
    <header className="header">
      <h1>CardAMom</h1>
      <div>
        <Login />
        <Signup />
      </div>
    </header>
  );
}

export default AppHeader;
