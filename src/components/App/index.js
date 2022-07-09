import Header from '../Header';
import HoursContainer from '../HoursContainer';
import moment from 'moment';

import './App.css';

function App() {
  moment.updateLocale('en', {
    months: [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
      'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
  });
  return (
    <div className="App">
      <Header />
      <HoursContainer />
    </div>
  );
}

export default App;
