import { Link } from "react-router";
import "./Dashboard.css";

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const completionRate =
    totalTasks === 0 ? 0 : ((completedTasks / totalTasks) * 100).toFixed(2);

  const recentTasks = tasks.slice(-5).reverse();

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's your task overview.
          </p>
        </div>

        <Link to="/add-task" className="dashboard-add-btn">
          + Add New Task
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon stat-blue">📋</div>
            <p className="stat-label">Total Tasks</p>
            <h2 className="stat-value">{totalTasks}</h2>
            <span className="stat-description">All your tasks</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon stat-green">✓</div>
            <p className="stat-label">Completed Tasks</p>
            <h2 className="stat-value">{completedTasks}</h2>
            <span className="stat-description">Tasks finished</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon stat-yellow">◷</div>
            <p className="stat-label">Pending Tasks</p>
            <h2 className="stat-value">{pendingTasks}</h2>
            <span className="stat-description">Tasks remaining</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon stat-blue">↗</div>
            <p className="stat-label">Completion Rate</p>
            <h2 className="stat-value">{completionRate}%</h2>

            <div className="progress dashboard-progress">
              <div
                className="progress-bar"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="recent-tasks-card">
        <div className="recent-tasks-header">
          <div>
            <h3>Recent Tasks</h3>
            <p>Your latest task activity</p>
          </div>

          <Link to="/tasks" className="view-all-link">
            View All Tasks
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-icon">📋</div>
            <h4>No tasks yet</h4>
            <p>Create your first task to get started.</p>

            <Link to="/add-task" className="dashboard-add-btn">
              Create Task
            </Link>
          </div>
        ) : (
          <div className="recent-tasks-list">
            {recentTasks.map((task) => (
              <div className="recent-task-item" key={task.id}>
                <div className="task-info">
                  <span className="task-indicator"></span>
                  <span className="task-name">{task.title}</span>
                </div>

                <div className="task-tags">
                  <span
                    className={`priority-badge priority-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`status-badge ${
                      task.status === "Completed"
                        ? "status-completed"
                        : "status-pending"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
