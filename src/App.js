import './App.css';
import { Leaderboard } from './components/Leaderboard';
import { Description } from './components/Description';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <h1>Framed Tournament Current Leaderboard</h1>
        <Leaderboard/>
        <Description />
      </div>
    </ThemeProvider>

  );
}

export default App;
