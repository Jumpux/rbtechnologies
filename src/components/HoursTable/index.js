import React, { memo } from 'react';
import moment from 'moment';
import HoursTableRow from '../HoursTableRow';

import './HoursTable.css';

const HoursTable = ({ currentWeek, projectsWithData, setProjectsWithData }) => {
  return (
    <div className="HoursTable">
      <div className="row tableHeader">
        <div className="big-col projectName">Проект</div>
        <div className="big-col taskName">Задача</div>
        {currentWeek.map(day => {
          return <div key={day.date} className="middle-col dayOfWeek">
            <span>{moment(day.date).format('DD.MM')}</span>
            <span>{day.dayOfWeek}</span>
          </div>;
        })}
        <div className="small-col">Итого</div>
      </div>
      {projectsWithData.map(project => {
        return <HoursTableRow
          key={project.projectId}
          project={project}
          projectsWithData={projectsWithData}
          setProjectsWithData={setProjectsWithData}
        />;
      })}
    </div>
  );
};

export default memo(HoursTable);