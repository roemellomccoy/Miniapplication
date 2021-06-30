import {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  let task = '';
  let url = 'http://localhost:3001';


  async function getData(){
    await fetch(url)
    .then(res => res.json())
    .then(res => setTasks(res))
  }

  useEffect(() =>
    getData(), []);

  function handleTaskChange(e){
    e.preventDefault();
    task = e.target.value;
  }

  function handleSubmit(e){
    // e.preventDefault();
    console.log(task);
    if(task===''){
      alert('Please input task')
    } else{
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task})
  })}
  // getData();
  }

  function deleteTask(e){
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e.target.id})
  })}

  return (
    <div className="App">
      <h1>ToDO List</h1>

      <ul>
        {tasks.map(task =>
          <form id={task.id} onSubmit={deleteTask}>
            <li>
              {task.title}
              <button type='submit'>
                Completed
              </button>
            </li>
          </form>)}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Task
          <input id='task' type='text' onChange={handleTaskChange} placeholder='Enter task'/>
        </label>
        <button type='submit'>Submit</button>
      </form>



    </div>
  );
}

export default App;
