import React, { memo, useCallback, useEffect, useState } from 'react';

import './HoursTableRow.css';

const HoursTableRow = ({ project, setProjectsWithData }) => {
  const [rowCount, setRowCount] = useState(0);

  const updateDayHours = useCallback((e) => {
    if (e.target.value.length > 3) return
    const updatedWeek = project.week.map(day => {
      if (day.dayOfWeek === e.target.dataset.dayOfWeek) {
        day.hours = e.target.value;
      }
      return day;
    });
    setProjectsWithData(prevState => {
      const currentProject = prevState.find(projectWithData => projectWithData.id === project.id);
      return [{ ...currentProject, week: updatedWeek }];
    });
    calcRowCount();
  }, [project]);


  const calcRowCount = useCallback(() => {
    setRowCount(0);
    project.week.map(day => setRowCount(prevState => prevState + Number(day.hours) || prevState));
  }, [rowCount]);

  useEffect(() => {
    if (!rowCount) {
      return calcRowCount();
    }
  }, [rowCount]);

  return (
    <div className="row">
      <div className="big-col projectName">{project.projectName}</div>
      <div className="big-col taskName">{project.projectTask}</div>
      {project.week.map(day => {
        return <div key={day.date} className="middle-col hoursOfWeek">
          <input
            data-day-of-week={day.dayOfWeek}
            type="number"
            value={day.hours}
            onChange={updateDayHours}
            maxLength="2"
          />
          <span>Комментарии</span>
        </div>;
      })}
      <div className="small-col">
        {rowCount}
      </div>
    </div>
  );
};

export default memo(HoursTableRow);