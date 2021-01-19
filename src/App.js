import './App.css';
import Layout from './hoc/layout/layout';
import Calendar from './pages/calendar/calendar';

function App() {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
