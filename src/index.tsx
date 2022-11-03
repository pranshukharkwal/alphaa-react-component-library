import React from 'react';
import ReactDOM from 'react-dom/client';
import Chart  from "./components/Chart";
import "./index.css";

function App() {
  return (
    <div>
      <div className= "App" > Hello world </div>;
        < Chart />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

