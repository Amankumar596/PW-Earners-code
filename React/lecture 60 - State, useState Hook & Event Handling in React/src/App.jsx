import { useState } from "react";
import Counter from "./components/Counter"
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {

  // let value = 0
  const [value , setValue] = useState(0)
  function printCountValue(val){
    // console.log(value);
    setValue(val)
  }

  return (
    <div>
      {/* <Navbar count={value}/>
      <Counter printCountValue={printCountValue}/> */}
      <Todo/>
      {/* <Counter/> */}
    </div>
  )
}

export default App;
