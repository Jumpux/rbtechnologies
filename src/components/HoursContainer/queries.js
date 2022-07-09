import axios from 'axios';

export const getProjects = async () => {
  return await axios.get(`${process.env.REACT_APP_HOST_URL}/projects.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '10adc5c1f37b173f35d734e6937347e24fa87736'
    },
  });
};

export const getIssue = async (projectId) => {
  return await axios.get(`${process.env.REACT_APP_HOST_URL}/issues.json?project_id=${projectId}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '10adc5c1f37b173f35d734e6937347e24fa87736'
    },
  });
};

export const getTableData = async (timeFrom, timeTo, projectId) => {
  return await axios.get(`${process.env.REACT_APP_HOST_URL}/time_entries.json?from=${timeFrom}&to=${timeTo}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '10adc5c1f37b173f35d734e6937347e24fa87736'
    },
  });
};

export const saveNewWeekDay = async (timeEntriesId, hours) => {
  return await axios.put(`${process.env.REACT_APP_HOST_URL}/time_entries/${timeEntriesId}.json`, {
    time_entry: {
      hours
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '10adc5c1f37b173f35d734e6937347e24fa87736'
    },
  });
};