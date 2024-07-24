import React, { useEffect, useRef, useState } from 'react';
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

import { MdNotifications, MdApps, MdAccountCircle, MdVideoLibrary, MdSettings, MdHelpOutline, MdFeedback, MdPerson } from 'react-icons/md';
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


  const menuRef = useRef(null);
  const avatarRef = useRef(null);

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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !avatarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleGoogleAccountClick = () => {
    window.open('https://myaccount.google.com', '_blank');
  };

  const handleYouTubeStudioClick = () => {
    window.open('https://studio.youtube.com/', '_blank')
  };

  const handleSettingsClick = () => {
    window.open('https://www.youtube.com/account', '_blank')
  };

  const handleYouDataClick = () => {
    window.open('https://myaccount.google.com/u/0/yourdata/youtube?hl=en', '_blank')
  };

  const handleHelpClick = () => {
    window.open('https://support.google.com/youtube', '_blank')
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

        <div className="header-avatar-container" ref={avatarRef} onClick={handleMenuToggle}>
          {user ? (
            <img src={user.photoURL} alt="Profile Avatar" className="youtube-profile-image" />
          ) : (
            <img src={YouTubeProfileImage} alt="Default Avatar" className="youtube-profile-image" />
          )}

          {menuOpen && (
            <div className="profile-buttons" ref={menuRef}>
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
                <div className="profile-tab" onClick={handleYouTubeStudioClick}>
                  <MdVideoLibrary size={24} />
                  <p>YouTube Studio</p>
                </div>

                <div className="profile-tab" onClick={handleYouDataClick}>
                  <MdPerson size={24} />
                  <p>Your Data in YouTube</p>
                </div>

                <div className="profile-tab" onClick={handleSettingsClick}>
                  <MdSettings size={24} />
                  <p>Settings</p>
                </div>
                <div className="profile-tab" onClick={handleHelpClick}>
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