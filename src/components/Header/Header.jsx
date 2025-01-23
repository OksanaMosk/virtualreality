import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logOutThunk, loginThunk } from 'redux/auth/auth.reducer';
import { selectUserData, selectAuthenticated } from 'redux/auth/auth.selector';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useTheme } from '../Themes/Themes';
import { useNavigate } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  console.log('TCL: Header -> authenticated', authenticated);
  const { setTheme } = useTheme();

  const userRegisterName = JSON.parse(localStorage.getItem('auth'));

  const [userValue, setUserValue] = useState('');

  useEffect(() => {
    if (userData !== null) {
      console.log('TCL: Header -> userData', userData);

      // Використання значення name з authData, якщо воно існує
      if (userRegisterName && userRegisterName.name) {
        setUserValue(userRegisterName.name);
      } else if (userData.email) {
        // Якщо name відсутній, використовуємо email
        setUserValue(userData.email);
      }
    }

    // Зберегти значення userValue в локальному сховищі
    localStorage.setItem('userValue', userValue);
  }, [userData, userValue, userRegisterName]);

  useEffect(() => {
    // Отримання значення userValue з локального сховища при завантаженні компоненту
    const storedUserValue = localStorage.getItem('userValue');
    if (storedUserValue) {
      setUserValue(storedUserValue);
    }
  }, []);

  console.log('TCL: Header -> userValue', userValue);

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const { token, email, password, uid } = JSON.parse(authData);
      console.log('TCL: Header -> authData', authData);
      dispatch(loginThunk.fulfilled({ token, email, password, uid }));
    }
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(logOutThunk());
    localStorage.removeItem('auth');
    localStorage.removeItem('auth1');
    navigate('/');
  };

  const openRegisterModal = () => {
    if (!isLoginModalOpen) {
      setIsRegisterModalOpen(true);
      document.body.classList.add('body-no-scroll');
    }
  };

  const openLoginModal = () => {
    if (!isRegisterModalOpen) {
      setIsLoginModalOpen(true);
      document.body.classList.add('body-no-scroll');
    }
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  const handleGreenThemeClick = () => {
    setTheme('green');
  };
  const handleBlueThemeClick = () => {
    setTheme('blue');
  };
  const handleOrangeThemeClick = () => {
    setTheme('orange');
  };

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.header}>
      <div className={css.mainTit}>
        <h3 className={css.mainTitle}>
          <span className={css.mainTitleSpan}>psychologists.</span>services
        </h3>
      </div>
      <div className={css.links}>
        <div
          className={`${css.burgerMenu} ${isOpen ? css.open : ''}`}
          onClick={toggleMenu}
        >
          <div className={css.line}></div>
          <div className={css.line}></div>
          <div className={css.line}></div>
        </div>
        <ul className={`${css.menu} ${isOpen ? css.active : ''}`}>
          <li className={css.link}>
            <NavLink
              to="/"
              className={`${currentPath === '/' ? css.active : css.toLink}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={css.link}>
            <NavLink
              className={`${
                currentPath === '/psychologists' ? css.active : css.toLink
              }`}
              to="/psychologists"
              onClick={() => setIsOpen(false)}
            >
              Psychologists
            </NavLink>
          </li>

          {authenticated && (
            <li className={css.link}>
              <NavLink
                className={`${
                  currentPath === '/favorites' ? css.active : css.toLink
                }`}
                to="/favorites"
                onClick={() => setIsOpen(false)}
              >
                Faforites
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className={css.left}>
        {authenticated ? (
          <div className={css.auth}>
            <svg
              className={css.log}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
                fill="#FBFBFB"
              />
            </svg>

            {authenticated && (
              <span className={css.nameLogOutButton}>{userValue}</span>
            )}
            <button className={css.logOutButton} onClick={onLogOut}>
              Log out
            </button>
          </div>
        ) : (
          <div className={css.authorization}>
            <button className={css.login} onClick={openLoginModal}>
              Log In
            </button>
            <button className={css.register} onClick={openRegisterModal}>
              Registration
            </button>
          </div>
        )}
        <div className={css.theme}>
          <button
            className={css.greenTheme}
            onClick={handleGreenThemeClick}
          ></button>
          <button
            className={css.blueTheme}
            onClick={handleBlueThemeClick}
          ></button>
          <button
            className={css.orangeTheme}
            onClick={handleOrangeThemeClick}
          ></button>
        </div>

        {isRegisterModalOpen && (
          <ModalWindow
            isOpen={isRegisterModalOpen}
            onClose={closeRegisterModal}
            type="register"
          />
        )}
        {isLoginModalOpen && (
          <ModalWindow
            isOpen={isLoginModalOpen}
            onClose={closeLoginModal}
            type="login"
          />
        )}
      </div>
    </div>
  );
};
