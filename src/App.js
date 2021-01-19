import './App.css';
import { useContext } from 'react';
import Layout from './hoc/layout/layout';
import Calendar from './pages/calendar/calendar';
import { ThemeContext } from './context/themeContext';

function App() {
  const themeContext = useContext(ThemeContext);
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
