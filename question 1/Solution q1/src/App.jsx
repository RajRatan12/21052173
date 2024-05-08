import React, { useState, useEffect } from 'react';
import './App.css';

const WINDOW_SIZE = 10; 

 
const URLS = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand',
};
 
function updateWindow(window, newNumbers) {
  const uniqueNumbers = [...new Set([...window, ...newNumbers])].slice(-WINDOW_SIZE);
  return uniqueNumbers;
}

 
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  return (numbers.reduce((acc, n) => acc + n, 0) / numbers.length).toFixed(2);
}

 
function App() {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

   
  async function fetchNumbers(type) {
    if (!URLS[type]) {
      console.error('Invalid number type specified');
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 500);
      const response = await fetch(URLS[type], { signal: controller.signal });
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const newNumbers = data.numbers;

         setWindowPrevState(windowCurrState);

         const updatedWindow = updateWindow(windowCurrState, newNumbers);
        setWindowCurrState(updatedWindow);

         setNumbers(newNumbers);

 
        setAvg(calculateAverage(updatedWindow));
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
    }
  }

  return (
    <div className="App">
      <h1>Average Calculator Microservice</h1>
      <div>
        <button onClick={() => fetchNumbers('p')}>Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Random Numbers</button>
      </div>

      <div>
        <h3>Previous Window State:</h3>
        <pre>{JSON.stringify(windowPrevState, null, 2)}</pre>

        <h3>Current Window State:</h3>
        <pre>{JSON.stringify(windowCurrState, null, 2)}</pre>

        <h3>Numbers Fetched:</h3>
        <pre>{JSON.stringify(numbers, null, 2)}</pre>

        <h3>Average:</h3>
        <p>{avg}</p>
      </div>
    </div>
  );
}

export default App;
