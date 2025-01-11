import { useState,useEffect } from 'react'
import {FaCheck} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task,setTask] = useState("")
  
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://todo-backend-1-7fe4.onrender.com/tasks')
      const data = await response.json()
      setTasks(data)
      console.log(data)
    } catch (error) {
      alert("Error Occured While Fetching the tasks: ",error)
    }
  }

  const AddTasks = async () => {
    if(!task.trim()) {
      alert("Task cannot be empty!!!")
      return
    }
    try {
      const response = await fetch('https://todo-backend-1-7fe4.onrender.com/tasks',{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task:task})
      })
      if(response.ok) {
        setTask('')
        fetchTasks()
      }
    } catch (error) {
      alert("Error Occured While Adding new Task: ",error)
    }
  }

  const ChangeStatus = async (id,status) => {
    try {
      const response = await fetch(`https://todo-backend-1-7fe4.onrender.com/tasks/${id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: !status})
      })
      console.log(response)
      if(response.ok) {
        fetchTasks()
      }
    } catch (error) {
      alert("Error While Updating Task Status: ",error)
    }
  }

  const DeleteTask = async (id) => {
    try {
      const response = await fetch(`https://todo-backend-1-7fe4.onrender.com/tasks/${id}`,{
        method: 'DELETE'
      })
      if(response.ok) {
        fetchTasks()
      }
    } catch (error) {
      alert("Failedto delete Task: ",error)
    }
  }

  return (
    <>
      <h1>Todo Application</h1> <hr /><br /><br />
        <div className="addTask">
          <input type="text" placeholder='Enter Task Name' value={task} onChange={(e) => setTask(e.target.value)} />
          <button className='add' onClick={AddTasks}>Add</button>
        </div>
        <h3>Task Lists:</h3> <hr />
      <div className="show">
        {tasks.length === 0 ? (
          <p>Sorry No Task Added Yet!!!</p>
        ) : (
          <div>
            {tasks.map((task) => (
            <><div className="tasks" key={task.id}>
                {task.status ? (
                  <div className="tick"><FaCheck style={{ color: 'green' }}></FaCheck></div>
                ) : (
                  <div className="loader"></div>
                )}
                <p>{task.task}</p>
                <div className="actions">
                  <button onClick={() => ChangeStatus(task.id)} className={task.status ? 'Completed' : 'Pending'}>
                    {task.status ? 'Completed' : 'Pending'}
                  </button>
                  <button className='delete' onClick={() => DeleteTask(task.id)}><AiFillDelete></AiFillDelete></button>
                </div>
              </div><hr /></>
          ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
