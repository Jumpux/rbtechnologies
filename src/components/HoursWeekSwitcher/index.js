import React, { memo } from 'react';
import moment from 'moment';

import Chevron from '../../icons/chevron';

import './HoursWeekSwitcher.css';

const HoursWeekSwitcher = ({ currentWeek, setWeekAgo, setWeekForward }) => {
  return (
    <div className="dFlex">
      <button onClick={setWeekAgo} className="navButton">
        <Chevron className="chevron" />
      </button>
      <div className="navDates">
        <span className="dates">
          {moment(currentWeek[0]?.date).format('DD MMMM YYYY')}
          <span className="divider">—</span>
          {moment(currentWeek[currentWeek.length - 1]?.date).format('DD MMMM YYYY')}</span>
      </div>
      <button onClick={setWeekForward} className="navButton rotate">
        <Chevron className="chevron" />
      </button>
    </div>
  );
};

export default memo(HoursWeekSwitcher);