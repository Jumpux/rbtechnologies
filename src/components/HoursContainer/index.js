import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import HoursWeekSwitcher from '../HoursWeekSwitcher';
import HoursTypeSwitcher from '../HoursTypeSwitcher';
import HoursTable from '../HoursTable';
import { getIssue, getProjects, getTableData, saveNewWeekDay } from './queries';
import { MAIN_HOURS } from '../HoursTypeSwitcher/types';

import './HoursContainer.css';

const HoursContainer = () => {
  const [projects, setProjects] = useState([]);
  const [projectsWithData, setProjectsWithData] = useState([]);
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [activeButton, setActiveButton] = useState(MAIN_HOURS);

  const { current: setButtonType } = useRef(e => {
    setActiveButton(e.target.dataset.switcherType)
  })

  const clearTable = useCallback(() => {
    const projectWithResetHours = projectsWithData.map(project => {
      project.week.map(day => day.hours = 0)
      return project;
    })
    setProjectsWithData(projectWithResetHours)
  }, [projectsWithData])

  const saveTable = useCallback(() => {
    projectsWithData.map(project => {
      project.week.map(day => {
        saveNewWeekDay(day.timeEnteriesId, Number(day.hours))
      })
    })
  }, [projectsWithData]);

  const { current: getWeek } = useRef(() => {
    setCurrentWeekData([]);
    const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб', 'Вс'];
    const weekDay = moment().day();
    const monthDay = moment().date();
    const month = moment().month();
    const year = moment().year();
    const countDayOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // День месяца, понедельника текущей недели
    let countMonthDay;
    // Проверка что бы всегда начинать выстаривать текущую неделю с понедельника
    if (weekDay > 1) {
      countMonthDay = monthDay - (weekDay - 1);
    } else if (weekDay === 0) {
      countMonthDay = monthDay - 6;
    } else {
      countMonthDay = monthDay;
    }
    // Постраение итогового массива
    for (let i = 0; i < 7; i++) {
      // Если countMonthDay больше кол-ва дней в месяце
      // дни начинаются сначала
      if ((countMonthDay + i) > countDayOnMonth[month]) {
        let count = countDayOnMonth[month] - (countMonthDay + 6);
        setCurrentWeekData(prevState => [...prevState, {
          date: moment(`${year}.${month + 1}.${count + i}.`).format(),
          dayOfWeek: week[i],
        }]);
      } else {
        setCurrentWeekData(prevState => [...prevState, {
          date: moment(`${year}.${month + 1}.${countMonthDay + i}`).format(),
          dayOfWeek: week[i],
        }]);
      }
    }
  });

  const setWeekAgo = useCallback(() => {
    setProjectsWithData([]);
    setCurrentWeekData(currentWeekData.map(weekDay => {
      return { ...weekDay, date: moment(weekDay.date).subtract(1, 'week').format() };
    }));
  }, [currentWeekData]);

  const setWeekForward = useCallback(() => {
    setProjectsWithData([]);
    setCurrentWeekData([]);
    setCurrentWeekData(currentWeekData.map(weekDay => {
      return { ...weekDay, date: moment(weekDay.date).add(1, 'week').format() };
    }));
  }, [currentWeekData]);

  const { current: getProjectList } = useRef(async () => {
    const { data } = await getProjects();
    return setProjects(data.projects);
  });

  const getProjectIssue = useCallback(async () => {
    if (!currentWeekData.length) {
      return;
    }
    const { data: { time_entries: timeEntries } } = await getTableData(
      moment(currentWeekData[0].date).format('YYYY-MM-DD'),
      moment(currentWeekData[currentWeekData.length - 1].date).format('YYYY-MM-DD'),
    );
    const weekWithValues = currentWeekData.map(dayOfWeek => {
      const currentTimeEntries = timeEntries.find(time => dayOfWeek.date.includes(time.spent_on));
      if (currentTimeEntries) {
        dayOfWeek.hours = currentTimeEntries.hours;
        dayOfWeek.timeEnteriesId = currentTimeEntries.id;
      } else {
        dayOfWeek.hours = 0;
        dayOfWeek.timeEnteriesId = 0;
      }
      return dayOfWeek;
    });
    return projects.map(async project => {
      const { data: projectIssue } = await getIssue(project.id);
      const currentIssueObj = projectIssue.issues.find(issue => issue.project.id === project.id);
      setProjectsWithData(prevState => [...prevState, {
        projectId: project.id,
        projectName: project.name,
        projectTask: currentIssueObj.subject,
        week: weekWithValues,
      }]);
    });
  }, [projects, currentWeekData]);

  useEffect(() => {
    if (!projects.length) {
      getProjectList();
      return;
    }
    if (!currentWeekData.length) {
      getWeek();
      return;
    }

    getProjectIssue();

  }, [projects, currentWeekData]);
  return (
    <div className="HoursContainer">
      <div className="settingWithTitle">
        <div className="dFlex itemsCenter h100">
          <h1 className="pageTitle">Табель</h1>
          <HoursTypeSwitcher activeButton={activeButton} setButtonType={setButtonType} />
          <HoursWeekSwitcher currentWeek={currentWeekData} setWeekAgo={setWeekAgo} setWeekForward={setWeekForward}/>
        </div>
        <div className="buttons">
          <button className="saveBtn" onClick={saveTable}>Сохранить</button>
          <button className="clearBtn" onClick={clearTable}>Очистить</button>
        </div>
      </div>
      {activeButton === MAIN_HOURS && <HoursTable currentWeek={currentWeekData} projectsWithData={projectsWithData} setProjectsWithData={setProjectsWithData}/>}
    </div>
  );
};

export default memo(HoursContainer);