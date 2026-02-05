import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../util/api";
import "./ProjectPage.css";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const allowedStatuses = ["To Do", "In Progress", "Done"];

  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState("");

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");

  // --------------------
  // Fetch Project Details
  // --------------------
  useEffect(() => {
    async function fetchProject() {
      try {
        setProjectLoading(true);
        setProjectError("");

        const data = await apiRequest(`/api/projects/${projectId}`);
        setProject(data);
      } catch (error) {
        setProjectError(error.message || "Failed to load project.");
        setProject(null);
      } finally {
        setProjectLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  // --------------------
  // Fetch Tasks
  // --------------------
  useEffect(() => {
    async function fetchTasks() {
      try {
        setTasksLoading(true);
        setTasksError("");

        const data = await apiRequest(`/api/projects/${projectId}/tasks`);
        setTasks(data);
      } catch (error) {
        setTasksError(error.message || "Failed to load tasks.");
        setTasks([]);
      } finally {
        setTasksLoading(false);
      }
    }

    fetchTasks();
  }, [projectId]);

  // --------------------
  // Refresh Tasks
  // --------------------
  const refreshTasks = async () => {
    try {
      setTasksLoading(true);
      setTasksError("");

      const data = await apiRequest(`/api/projects/${projectId}/tasks`);
      setTasks(data);
    } catch (error) {
      setTasksError(error.message || "Failed to load tasks.");
      setTasks([]);
    } finally {
      setTasksLoading(false);
    }
  };

  // --------------------
  // Create Task
  // --------------------
  const handleCreateTask = async (event) => {
    event.preventDefault();

    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      setTasksError("Task title is required.");
      return;
    }

    if (!allowedStatuses.includes(newTaskStatus)) {
      setTasksError("Invalid status value.");
      return;
    }

    try {
      setTasksError("");

      await apiRequest(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTitle,
          description: newTaskDescription,
          status: newTaskStatus,
        }),
      });

      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskStatus("To Do");

      await refreshTasks();
    } catch (error) {
      setTasksError(error.message || "Failed to create task.");
    }
  };

  // --------------------
  // Update Task Status
  // --------------------
  const handleStatusChange = async (taskId, nextStatus) => {
    if (!allowedStatuses.includes(nextStatus)) return;

    try {
      setTasksError("");

      await apiRequest(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      await refreshTasks();
    } catch (error) {
      setTasksError(error.message || "Failed to update task.");
    }
  };

  // --------------------
  // Delete Task
  // --------------------
  const handleDeleteTask = async (taskId) => {
    try {
      setTasksError("");

      await apiRequest(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
      });

      await refreshTasks();
    } catch (error) {
      setTasksError(error.message || "Failed to delete task.");
    }
  };

  return (
    <div className="project-wrapper">
      <div className="project-header">
        <button
          type="button"
          
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

        

        <h2>Project Details</h2>
      </div>

      {projectLoading && <p>Loading project...</p>}
      {projectError && <p className="error">{projectError}</p>}

      {!projectLoading && project && (
        <div className="project-card">
          <h3>{project.name}</h3>
          {/* <p>{project.description || "No description yet."}</p> */}
        </div>
      )}

      <div className="tasks-section">
        <h3>Tasks</h3>

        <form onSubmit={handleCreateTask} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />

          <select
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </form>

        {tasksLoading && <p>Loading tasks...</p>}
        {tasksError && <p className="error">{tasksError}</p>}

        {!tasksLoading && !tasksError && tasks.length === 0 && (
          <p>No tasks yet.</p>
        )}

        {!tasksLoading && tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                  <div className="task-title">
                    <strong>{task.title}</strong>
                  </div>
                <div className="task-top">

                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>

                {task.description && (
                  <div className="task-desc">{task.description}</div>
                )}

                <div className="task-actions">
                  <label>
                    Status:{" "}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
