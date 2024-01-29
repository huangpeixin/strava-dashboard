import './App.css';
import CustomComponent from "./components/CustomComponent";
import CalendarHeatmap from "./components/CalendarHeatmap";
import MonthChart from "./components/MonthChart";

function App() {
  return (
    <div className="App">
        <MonthChart />
        <CustomComponent />
        <CalendarHeatmap />
    </div>
  );
}

export default App;
