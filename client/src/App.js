import './App.css';
import React, { useEffect, useState } from "react";
import { fetchData } from "./api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
	async function getMessage() {
	    const data = await fetchData();
	    if (data) setMessage(data.message);
	}
	getMessage();
    }, []);
    return (
      <div className="App">
	<header className="bg-blue-500 text-white text-center py-10">
	  <h1 className="text-4xl font-bold">Recipe Builder</h1>
	  <p className="mt-4">{message}</p>
	</header>
      </div>
  );
}

export default App;
