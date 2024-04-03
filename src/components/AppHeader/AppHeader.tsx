import { userData } from '../../data';
import { loginAction } from '../../redux/Settings/action';
import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import { useDispatch } from 'react-redux';
import { UserData } from '../../types';
import Logo from '../../assets/logo 4.svg';

function AppHeader() {
  return (
    <header className="header">
      <img src={Logo} alt="Logo Cardamom" className="header-logo" />
      <h1>CardAMom</h1>
      <div>
        <Login />
        <Signup />
      </div>
    </header>
  );
}

export default AppHeader;
