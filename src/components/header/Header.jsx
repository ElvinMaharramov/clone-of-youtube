import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './header.scss';

import { FaBars } from 'react-icons/fa';
/* FaBars: Font Awesome ikon setinden "bars" (üç yatay çizgi) ikonunu içe aktarır.
Bu ikon genellikle menü simgesi olarak kullanılır. */

import { AiOutlineSearch } from 'react-icons/ai';
/* AiOutlineSearch: Ant Design ikon setinden "search" (arama) ikonunu içe aktarır.
Bu ikon genellikle arama simgesi olarak kullanılır. */

import { MdNotifications, MdApps } from 'react-icons/md';
/* MdNotifications: Material Design ikon setinden "notifications" (bildirimler) ikonunu içe aktarır.
Bu ikon genellikle bildirim simgesi olarak kullanılır.
MdApps: Material Design ikon setinden "apps" (uygulamalar) ikonunu içe aktarır.
Bu ikon genellikle uygulama menüsü simgesi olarak kullanılır. */

import YouTubeDarkLogo from '../../assets/img/Youtube-dark-logo.png';
import YouTubeProfileImage from '../../assets/img/YouTube-profile-image.png';

const Header = ({ handleToggleSideBar }) => {

  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`)
  }

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
        <MdApps size={22} />
        <img
          src={YouTubeProfileImage}
          alt="User"
          className='youtube-profile-image'
        />
      </div>


    </div>
  )
}

export default Header;