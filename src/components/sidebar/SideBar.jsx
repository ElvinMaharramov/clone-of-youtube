import React from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/actions/auth.action';

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied
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

  // Aktif bağlantıya stil eklemek için className fonksiyonu
  const getClassName = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav
      className={toggleSideBar ? 'sidebar open' : 'sidebar'}
      onClick={() => (handleToggleSideBar(false))}
    >

      <NavLink to='/' className={getClassName}>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </NavLink>

      <NavLink to='/feed/subscriptions' className={getClassName}>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </NavLink>

      <NavLink to='/liked' className={getClassName}>
        <li>
          <MdThumbUp size={23} />
          <span>Liked videos</span>
        </li>
      </NavLink>

      <NavLink to='/history' className={getClassName}>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
      </NavLink>

      <NavLink to='/library' className={getClassName}>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
      </NavLink>

      <NavLink to='/feedback' className={getClassName}>
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>Feedback</span>
        </li>
      </NavLink>

      <hr />

      <li
        onClick={handleLogOut}
      >
        <MdExitToApp size={23} />
        <span>Log out</span>
      </li>

      <hr />

    </nav>
  )
}

export default SideBar;