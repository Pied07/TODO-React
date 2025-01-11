import { useState,useEffect } from 'react'
import {FaCheck} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import './App.css'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const [task,setTask] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todo-backend-1-7fe4.onrender.com/tasks')
      console.log(response)
      setTasks(response.data)
    } catch (error) {
      alert("Error fetching Data: ",error)
    }
  }

  const AddTasks = async () => {
      try {
        const response = await axios.post('https://todo-backend-1-7fe4.onrender.com/tasks',{task:task})
        fetchTasks()
        setTask("")
      } catch (error) {
        alert("Error Adding Data to Database: ",error)
      }
  }

  const ChangeStatus = async (id) => {
    try {
      await axios.patch(`https://todo-backend-1-7fe4.onrender.com/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      alert("Error Changing the Status of the Task: ",error)
    }
  }

  const DeleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-backend-1-7fe4.onrender.com/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      alert("Error Deleting Task: ",task)
    }
  }

  return (
    <>
      <h1>Todo Application</h1> <hr /><br /><br />
        <div className="addTask">
          <input type="text" placeholder='Enter Task Name' value={task} onChange={(e) => setTask(e.target.value)} required/>
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
