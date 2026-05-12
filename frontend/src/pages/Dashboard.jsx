import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {

    fetchTasks();
    fetchProjects();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/tasks/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const createProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/projects/create",
        {
          name: projectName,
          description: projectDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created Successfully");

      fetchProjects();

      setProjectName("");
      setProjectDescription("");

    } catch (error) {

      console.log(error);

      alert("Failed To Create Project");
    }
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks/create",
        {
          title: title,
          description: description,
          priority: priority,
          due_date: dueDate,
          assigned_to: 1,
          project_id: selectedProject
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created Successfully");

      fetchTasks();

      setTitle("");
      setDescription("");
      setPriority("High");
      setDueDate("");

    } catch (error) {

      console.log(error);

      alert("Failed To Create Task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  return (

    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}

      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold mb-10 text-indigo-400">
            TaskFlow
          </h1>

          <div className="space-y-4">

            <button className="w-full text-left p-3 rounded-xl bg-slate-800 hover:bg-indigo-600">
              Dashboard
            </button>

            <button className="w-full text-left p-3 rounded-xl hover:bg-slate-800">
              Projects
            </button>

            <button className="w-full text-left p-3 rounded-xl hover:bg-slate-800">
              Tasks
            </button>

          </div>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/";
          }}
          className="bg-red-500 p-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1">

        <div className="bg-indigo-600 text-white p-5 text-3xl font-bold shadow-lg">
          TaskFlow Dashboard
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-3 gap-6 p-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-2">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold text-indigo-600">
              {totalTasks}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-2">
              In Progress
            </h2>

            <p className="text-5xl font-bold text-yellow-500">
              {inProgressTasks}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-2">
              Completed
            </h2>

            <p className="text-5xl font-bold text-green-600">
              {completedTasks}
            </p>

          </div>

        </div>

        {/* Create Project */}

        <div className="p-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Create Project
            </h2>

            <form
              onSubmit={createProject}
              className="grid grid-cols-2 gap-4"
            >

              <input
                type="text"
                placeholder="Project Name"
                className="border p-3 rounded-xl"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Description"
                className="border p-3 rounded-xl"
                value={projectDescription}
                onChange={(e) =>
                  setProjectDescription(e.target.value)
                }
              />

              <button
                className="bg-indigo-600 text-white p-3 rounded-xl col-span-2"
              >
                Create Project
              </button>

            </form>

          </div>

        </div>

        {/* Create Task */}

        <div className="p-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Create Task
            </h2>

            <form
              onSubmit={createTask}
              className="grid grid-cols-2 gap-4"
            >

              <input
                type="text"
                placeholder="Task Title"
                className="border p-3 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                className="border p-3 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="border p-3 rounded-xl"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >

                <option>High</option>
                <option>Medium</option>
                <option>Low</option>

              </select>

              <select
                className="border p-3 rounded-xl"
                value={selectedProject}
                onChange={(e) =>
                  setSelectedProject(e.target.value)
                }
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (

                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>

                ))}

              </select>

              <input
                type="date"
                className="border p-3 rounded-xl"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button
                className="bg-indigo-600 text-white p-3 rounded-xl col-span-2 hover:bg-indigo-700"
              >
                Create Task
              </button>

            </form>

          </div>

        </div>

        {/* Tasks Table */}

        <div className="p-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Tasks
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">
                    Title
                  </th>

                  <th className="text-left p-3">
                    Priority
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>

                  <th className="text-left p-3">
                    Due Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {tasks.map((task) => (

                  <tr
                    key={task.id}
                    className="border-b hover:bg-slate-100"
                  >

                    <td className="p-3">
                      {task.title}
                    </td>

                    <td className="p-3">
                      {task.priority}
                    </td>

                    <td className="p-3">

                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(
                            task.id,
                            e.target.value
                          )
                        }
                        className={`px-3 py-2 rounded-xl text-white
                        ${
                          task.status === "Done"
                            ? "bg-green-500"
                            : task.status === "In Progress"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      >

                        <option value="To Do">
                          To Do
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Done">
                          Done
                        </option>

                      </select>

                    </td>

                    <td className="p-3">
                      {task.due_date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}