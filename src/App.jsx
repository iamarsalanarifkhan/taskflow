import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import AllTasks from "./pages/AllTasks";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router";
import EditTask from "./pages/EditTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    const updateDelete = tasks.filter((task) => task.id !== id);
    setTasks(updateDelete); 
  }

  const completeTask = (id) => {
    const updateComplete = tasks.map((task) => {
      if(task.id === id){
        return { ...task, status: "Completed" };
      } else {
        return task;
      }
    })
    setTasks(updateComplete);
  }

  const updatedTask = (id, editedData) => {
    const updateTask = tasks.map((task) => {
    if(task.id === id){
      return ({ ...task, ...editedData });
    } else {
      return task;
    }
    })
     setTasks(updateTask);
  }

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Dashboard tasks={tasks} />} />
            <Route
              path="/tasks"
              element={
                <AllTasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              }
            />
            <Route path="/add-task" element={<AddTask addTask={addTask} />} />
            <Route
              path="/edit-task/:id"
              element={<EditTask tasks={tasks} updatedTask={updatedTask} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
