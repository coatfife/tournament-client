import './App.css';
import { Leaderboard } from './components/Leaderboard';
import { Description } from './components/Description';


function App() {
  return (
    <div className="App">
        <h1>Framed Tournament Current Leaderboard</h1>
        <Leaderboard/>
        <Description />
      </div>

  );
}

export default App;
