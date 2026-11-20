import { useNavigate, useParams, Link } from "react-router";
import { useState } from "react";
import "./TaskForm.css";

const EditTask = ({ tasks, updatedTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedTask = tasks.find((task) => task.id === id);

  const [title, setTitle] = useState(selectedTask?.title || "");
  const [description, setDescription] = useState(
    selectedTask?.description || "",
  );
  const [priority, setPriority] = useState(selectedTask?.priority || "Medium");
  const [date, setDate] = useState(selectedTask?.date || "");
  const [status, setStatus] = useState(selectedTask?.status || "Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTask) return;

    const editedData = {
      title: title,
      description: description,
      priority: priority,
      date: date,
      status: status,
    };

    updatedTask(id, editedData);
    navigate("/tasks");
  };

  if (!selectedTask) {
    return (
      <div className="task-form-page">
        <div className="task-form-card text-center">
          <h2>Task Not Found</h2>
          <p>This task may have been deleted.</p>
          <Link to="/tasks" className="task-form-submit">
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="task-form-page">
      <div className="task-form-header">
        <div>
          <h1>Edit Task</h1>
          <p>Update your task information.</p>
        </div>
        <Link to="/tasks" className="task-form-back">
          ← Back to Tasks
        </Link>
      </div>

      <div className="task-form-card">
        <div className="task-form-card-header">
          <span className="task-form-accent"></span>
          <div>
            <h2>Edit Task Information</h2>
            <p>Make changes to your existing task below.</p>
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
              placeholder="Task Title"
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
              placeholder="Task Description"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
