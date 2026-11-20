import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./TaskForm.css";

const AddTask = ({ addTask }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      priority: priority,
      date: date,
      status: status,
    };

    addTask(newTask);
    navigate("/tasks");
  };

  return (
    <div className="task-form-page">
      <div className="task-form-header">
        <div>
          <h1>Create New Task</h1>
          <p>Add a new task to your workspace.</p>
        </div>
        <Link to="/tasks" className="task-form-back">
          ← Back to Tasks
        </Link>
      </div>

      <div className="task-form-card">
        <div className="task-form-card-header">
          <span className="task-form-accent"></span>
          <div>
            <h2>Task Information</h2>
            <p>Fill in the details below to create your task.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">
              Task Title <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design homepage layout"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what needs to be done..."
            />
          </div>

          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Task Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="task-form-actions">
            <Link to="/tasks" className="task-form-cancel">
              Cancel
            </Link>
            <button type="submit" className="task-form-submit">
              + Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
