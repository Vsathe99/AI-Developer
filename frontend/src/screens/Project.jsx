import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";

const Project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectUserId, setSelectUserId] = useState([]);
  const [project, setProject] = useState(location.state.project);

  const [users, setUsers] = useState([]);

  const handleUserClick = (id) => {
    setSelectUserId((prevSelectUserId) => {
      const newSelectUserId = new Set(prevSelectUserId);
      if (newSelectUserId.has(id)) {
        newSelectUserId.delete(id);
      } else {
        newSelectUserId.add(id);
      }
      return newSelectUserId;
    });
  };

  function addCollaboraters() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        setProject(res.data.project);
        console.log(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-96 ">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
          <button onClick={() => setIsModalOpen(true)} className="flex gap-1">
            <i className="ri-add-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2"
          >
            <i className="ri-group-line"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col  bg-slate-300 ">
          <div className="message-box flex-grow flex flex-col gap-2 p-2">
            <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="message max-w-56 ml-auto flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="inputField w-full flex ">
            <input
              className="p-2 px-4 w-full border-none outline-none rounded-lg bg-white "
              type="text"
              placeholder="Type a message..."
            />
            <button className="flex-grow px-3 hover:bg-slate-950 hover:text-white rounded-full pl-3 ">
              <i className="ri-send-plane-2-fill text-lg "></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50  absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center p-2 px-3 w-full bg-slate-100">
            <h1 
            className="font-semibold text-lg"
            >
                Collaborators
            </h1>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-fill text-lg"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2 p-2">
            {project.users &&
              project.users.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="user flex gap-2 items-center cursor-pointer p-2 hover:bg-slate-200 rounded-lg"
                  >
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className="font-semibold text-lg">{user.email}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectUserId).includes(user._id)
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaboraters}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
