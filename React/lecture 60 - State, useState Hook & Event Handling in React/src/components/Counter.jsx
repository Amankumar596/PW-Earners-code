import { useState } from "react";

function Counter({ printCountValue }) {
  //   const result = useState(0)
  //   const value  = result[0];
  //   const setValue = result[1]

  let [value, setValue] = useState(0);
  //   const [theme , setTheme] = useState("dark")
  //   const [user , setUser] = useState({})

  //   let count = 0; // normal variable

  //   console.log("re-render");
  //   console.log({ count, value });

  

  function increment() {
    // count++;
    // setValue(value + 1);
    // setValue(value + 1);
    // setValue(value + 1);

    setValue((prev) => prev + 1);
    printCountValue(++value)
    // setValue((prev) => prev + 1);
    // setValue((prev) => prev + 1);

    // setValue(value++)
    // setValue(value++)
    // setValue(value++)

    // setValue(++value);
    // printCountValue(value)
    // setValue(++value)
    // setValue(++value)
  }

  function decrement() {
    // count--;
    // setValue(value--);
    setValue((prev) => prev - 1)
     printCountValue(--value)
  }

  return (
    <div>
      <h1>Counter</h1>

      <button onClick={increment}>+</button>
      <p>{value}</p>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;
