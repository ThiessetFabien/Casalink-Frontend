import { useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdFamilyRestroom } from 'react-icons/md';
import './test.scss';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Test2() {
  const [openMenu, setOpenMenu] = useState(false);
  const openOrCloseMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div className={`${!openMenu ? 'side' : 'side-open'}`}>
      <BsArrowLeftShort
        className={`${
          !openMenu ? 'side_menubtn_icon' : 'side_menubtn_icon-open'
        }`}
        onClick={openOrCloseMenu}
      />
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <BiHomeAlt2
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
        />
        <Link to="/" className={`${openMenu ? 'side_item' : 'side_item-open'}`}>
          {openMenu ? 'Accueil' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <MdFamilyRestroom
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
        />
        <Link to="/" className="side_item">
          {openMenu ? 'Mon foyer' : ''}
        </Link>
      </div>
    </div>
  );
}
export default Test2;
