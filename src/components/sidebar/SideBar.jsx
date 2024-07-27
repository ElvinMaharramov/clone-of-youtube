import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { login, logOut } from '../../redux/actions/auth.action';
import auth from '../../Firebase';
import FeedbackModal from '../feedbackModal/FeedbackModal';

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
  MdLogin
} from 'react-icons/md';

import './sidebar.scss';

/* MdSubscriptions:
Anlamı: Abonelikler.
Kullanım Amacı: Genellikle kullanıcının abone olduğu kanalları veya içerikleri göstermek için kullanılır. */

/* MdExitToApp:
Anlamı: Uygulamadan çıkış.
Kullanım Amacı: Çıkış veya oturumu kapatma işlevini belirtmek için kullanılır. */

/* MdThumbUp:
Anlamı: Beğeni.
Kullanım Amacı: Kullanıcıların bir içeriği beğendiğini göstermek için kullanılır. "Like" butonu olarak da bilinir. */

/* MdHistory:
Anlamı: Geçmiş.
Kullanım Amacı: Kullanıcının geçmiş aktivitelerini veya izlediği içerikleri göstermek için kullanılır. */

/* MdLibraryBooks:
Anlamı: Kitaplık.
Kullanım Amacı: Kullanıcının kaydettiği veya favori içeriklerini göstermek için kullanılır. */

/* MdHome:
Anlamı: Ana Sayfa.
Kullanım Amacı: Kullanıcıyı ana sayfaya yönlendirmek için kullanılır. */

/* MdSentimentDissatisfied:
Anlamı: Memnuniyetsizlik.
Kullanım Amacı: Kullanıcıların memnuniyetsizliklerini veya olumsuz geri bildirimlerini belirtmek için kullanılır. */

const SideBar = ({ toggleSideBar, handleToggleSideBar }) => {

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
  };

  const handleLogin = () => {
    dispatch(login())
  };

  // Aktif bağlantıya stil eklemek için className fonksiyonu
  const getClassName = ({ isActive }) => (isActive ? 'active' : '');

  const [user, setUser] = useState(null);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeedbackSubmit = (formData) => {
    console.log('Feedback submitted:', formData);
    // Form verilerini işleyin (örneğin, API'ye gönderin)
  };

  return (
    <>
      <nav
        className={toggleSideBar ? 'sidebar open' : 'sidebar'}
        onClick={() => (handleToggleSideBar(false))}
      >

        <NavLink to='/' className={getClassName}>
          <li>
            <MdHome size={24} />
            <span>Home</span>
          </li>
        </NavLink>

        <NavLink to='/feed/subscriptions' className={getClassName}>
          <li>
            <MdSubscriptions size={24} />
            <span>Subscriptions</span>
          </li>
        </NavLink>

        <NavLink to='/liked' className={getClassName}>
          <li>
            <MdThumbUp size={24} />
            <span>Liked videos</span>
          </li>
        </NavLink>

        <NavLink to='/history' className={getClassName}>
          <li>
            <MdHistory size={24} />
            <span>History</span>
          </li>
        </NavLink>

        <NavLink to='/library' className={getClassName}>
          <li>
            <MdLibraryBooks size={24} />
            <span>Library</span>
          </li>
        </NavLink>

        <NavLink to='/feedback' className={getClassName} onClick={openModal}>
          <li>
            <MdSentimentDissatisfied size={24} />
            <span>Feedback</span>
          </li>
        </NavLink>

        <hr />

        <li
          onClick={user ? handleLogOut : handleLogin}
        >
          {user ? <MdExitToApp size={24} /> : <MdLogin size={24} />}
          <span>{user ? 'Logout' : 'Login'}</span>
        </li>

        <hr />

      </nav>

      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleFeedbackSubmit}
      />

    </>

  )
}

export default SideBar;