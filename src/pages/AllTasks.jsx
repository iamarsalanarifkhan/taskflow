import { Link } from "react-router";
import { useState } from "react";
import "./AllTasks.css";

const AllTasks = ({ tasks, deleteTask, completeTask }) => {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  const searchTask = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());

    const matchPriority = priority === "All" || task.priority === priority;

    const matchStatus = status === "All" || task.status === status;

    return matchSearch && matchPriority && matchStatus;
  });

  return (
    <div className="all-tasks-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="all-tasks-heading">All Tasks</h1>
          <p className="all-tasks-subtitle">
            Organize and manage your daily tasks.
          </p>
        </div>

        <Link to="/add-task" className="all-tasks-add-btn">
          + Add New Task
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="all-tasks-filter-box">
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <label className="form-label">Search Tasks</label>
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by task title..."
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Count */}
      <div className="all-tasks-list-header">
        <h2>Task List</h2>
        <span className="all-tasks-count">{searchTask.length} Tasks</span>
      </div>

      {/* Tasks */}
      {searchTask.length === 0 ? (
        <div className="all-tasks-empty">
          <div className="all-tasks-empty-icon">📋</div>
          <h3>No tasks found</h3>
          <p>No tasks match your current filters.</p>
        </div>
      ) : (
        <div className="row g-3">
          {searchTask.map((task) => (
            <div className="col-12 col-xl-6" key={task.id}>
              <div className="all-tasks-card">
                <div className="all-tasks-card-top">
                  <h3>{task.title}</h3>

                  <span
                    className={`all-tasks-priority priority-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="all-tasks-description">
                  {task.description || "No description provided."}
                </p>

                <div className="all-tasks-meta">
                  <div>
                    <span className="all-tasks-meta-label">Due Date</span>
                    <strong>{task.date || "Not set"}</strong>
                  </div>

                  <div>
                    <span className="all-tasks-meta-label">Status</span>
                    <span
                      className={`all-tasks-status ${
                        task.status === "Completed"
                          ? "status-completed"
                          : "status-pending"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>

                <div className="all-tasks-actions">
                  <Link
                    to={`/edit-task/${task.id}`}
                    className="all-tasks-edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="all-tasks-delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="all-tasks-complete-btn"
                    onClick={() => completeTask(task.id)}
                    disabled={task.status === "Completed"}
                  >
                    {task.status === "Completed"
                      ? "Completed"
                      : "Mark Complete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
