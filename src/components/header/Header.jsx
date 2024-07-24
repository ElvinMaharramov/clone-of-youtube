import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import auth from '../../Firebase';
import { logOut } from '../../redux/actions/auth.action';

import './header.scss';

import { FaBars } from 'react-icons/fa';
/* FaBars: Font Awesome ikon setinden "bars" (üç yatay çizgi) ikonunu içe aktarır.
Bu ikon genellikle menü simgesi olarak kullanılır. */
import { FaGoogle } from 'react-icons/fa';

import { AiOutlineSearch } from 'react-icons/ai';
/* AiOutlineSearch: Ant Design ikon setinden "search" (arama) ikonunu içe aktarır.
Bu ikon genellikle arama simgesi olarak kullanılır. */

import { MdNotifications, MdApps, MdAccountCircle, MdVideoLibrary, MdBrightness4, MdSettings, MdHelpOutline, MdFeedback, MdBrightness7 } from 'react-icons/md';
/* MdNotifications: Material Design ikon setinden "notifications" (bildirimler) ikonunu içe aktarır.
Bu ikon genellikle bildirim simgesi olarak kullanılır.
MdApps: Material Design ikon setinden "apps" (uygulamalar) ikonunu içe aktarır.
Bu ikon genellikle uygulama menüsü simgesi olarak kullanılır. */

import YouTubeDarkLogo from '../../assets/img/Youtube-dark-logo.png';
import YouTubeProfileImage from '../../assets/img/YouTube-profile-image.png';

const Header = ({ handleToggleSideBar }) => {

  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  //   localStorage.setItem('darkMode', darkMode);
  // }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`)
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    dispatch(logOut())
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleGoogleAccountClick = () => {
    window.location.href = 'https://myaccount.google.com';
  };

  return (
    <div className='header'>

      <FaBars
        className='header-menu'
        size={26}
        onClick={() => handleToggleSideBar()}
      />

      <img
        src={YouTubeDarkLogo}
        alt="YouTube dark logo"
        className="header-youtube-logo"
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>


      <div className="header-icons">
        <MdNotifications size={28} />
        <MdApps size={22} className='google-apps' />

        <div className="header-avatar-container" onClick={handleMenuToggle}>
          {user ? (
            <img src={user.photoURL} alt="Profile Avatar" className="youtube-profile-image" />
          ) : (
            <img src={YouTubeProfileImage} alt="Default Avatar" className="youtube-profile-image" />
          )}

          {menuOpen && (
            <div className="profile-buttons">
              <div className="avatar-info">
                <img src={user ? user?.photoURL : YouTubeProfileImage} alt="Your Avatar" title='Avatar' />
                <div className="about-user">
                  <p>{user ? user?.displayName : 'Profile Avatar'}</p>
                  <p>{user ? user?.email : 'example@gmail.com'}</p>
                </div>
              </div>
              <div className="horizontal-line"></div>
              <div className="profile-tabs">
              <div className="profile-tab" onClick={handleGoogleAccountClick}>
                  <FaGoogle size={24} />
                  <p>Google Account</p>
                </div>
                <div className="profile-tab">
                  <MdVideoLibrary size={24} />
                  <p>YouTube Studio</p>
                </div>

                {/* <div className="profile-tab" onClick={toggleDarkMode}>
                  {darkMode ? (
                    <>
                      <MdBrightness7 size={24} />
                      <p>Light Theme</p>
                    </>
                  ) : (
                    <>
                      <MdBrightness4 size={24} />
                      <p>Dark Theme</p>
                    </>
                  )}
                </div> */}

                <div className="profile-tab" onClick={toggleDarkMode}>
                  {darkMode ? (
                    <>
                      <MdBrightness7 size={24} />
                      <p>Light Theme</p>
                    </>
                  ) : (
                    <>
                      <MdBrightness4 size={24} />
                      <p>Dark Theme</p>
                    </>
                  )}
                </div>

                <div className="profile-tab">
                  <MdSettings size={24} />
                  <p>Settings</p>
                </div>
                <div className="profile-tab">
                  <MdHelpOutline size={24} />
                  <p>Help</p>
                </div>
                <div className="profile-tab">
                  <MdFeedback size={24} />
                  <p>Send Feedback</p>
                </div>
                <div className="profile-tab" onClick={handleLogOut}>
                  <MdAccountCircle size={24} />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header;