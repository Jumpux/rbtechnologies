import { memo } from 'react';

import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="logo">
        <span>ИСУП</span>
      </div>
    </div>
  );
};

export default memo(Header);