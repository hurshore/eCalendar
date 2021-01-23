import './App.css';
import { useContext, useEffect } from 'react';
import Layout from './hoc/layout/layout';
import Calendar from './pages/calendar/calendar';
import { ThemeContext } from './context/themeContext';
import { ReminderContext } from './context/reminderContext';

function App() {
  const themeContext = useContext(ThemeContext);
  const reminderContext = useContext(ReminderContext);
  const { fetchReminders } = reminderContext;

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if(theme) themeContext.setPreferredTheme(theme);
  }, [themeContext])

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders])
  
  const appClasses = ['App'];
  if(themeContext.theme === 'dark') appClasses.push('dark');
  return (
    <div className={appClasses.join(' ')}>
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
