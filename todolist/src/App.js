import {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  let task = '';
  let category = '';
  let date = '';
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
    if(task==='' || category===''){
      alert('Please input task and category')
    } else{
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task, category: category, date: date})
  })}
  // getData();
  }

  function deleteTask(e){
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e.target.id})
  })}

  function handleCategoryChange(e){
    e.preventDefault();
    category = e.target.value;
  }

  function handleDateChange(e){
    e.preventDefault();
    date = e.target.value;
  }

  return (
    <div className="App">
      <h1>ToDO List</h1>

        <div className='todoitem'>
          <div className='category'>
            <h4>Category</h4>
          </div>
          <div className='task'>
            <h4>Tasks</h4>
          </div>
          <div className='date'>
            <h4>Due Date</h4>
          </div>
          <div className='deleteButton'>
            <h4>Complete</h4>
          </div>


        </div>
        {tasks.map(task =>
          <div className='todoitem'>
            <div className='category'>{task.category}</div>
            <div className='task'>{task.title}</div>
            <div className='date'>{task.date}</div>
              <div className='deleteButton'>
                <form id={task.id} onSubmit={deleteTask}>
                  <button type='submit'>
                    Completed
                  </button>
                </form>
              </div>
          </div>
        )}

      <form onSubmit={handleSubmit} className='submitForm'>
        <label>Category
          <input type='text' onChange={handleCategoryChange} placeholder='Enter category' />
        </label>
        <label>
          Task
          <input id='task' type='text' onChange={handleTaskChange} placeholder='Enter task'/>
        </label>
        <label>Due Date
          <input type='text' onChange={handleDateChange} placeholder='Enter Due Date'/>
        </label>
        <button type='submit'>Submit</button>
      </form>



    </div>
  );
}

export default App;
