import React, { memo } from 'react';
import { MAIN_HOURS, OVERTIME_HOURS } from './types';

import './HoursTypeSwitcher.css';

const HoursTypeSwitcher = ({ setButtonType, activeButton }) => {
  return (
    <div className="HoursTypeSwitcher">
      <div data-switcher-type={MAIN_HOURS} className={activeButton === MAIN_HOURS ? 'active button' : 'button'} onClick={setButtonType}>Основные часы</div>
      <div data-switcher-type={OVERTIME_HOURS} className={activeButton === OVERTIME_HOURS ? 'active button' : 'button'} onClick={setButtonType}>Сверхурочные</div>
    </div>
  );
};

export default memo(HoursTypeSwitcher);