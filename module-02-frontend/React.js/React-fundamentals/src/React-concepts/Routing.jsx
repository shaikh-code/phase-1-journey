import { lazy, Suspense } from "react";

import {
  Routes,
  Route,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
  useNavigate,
  Navigate
} from "react-router-dom";
const Chat = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import("./Chat")), 3000)
  )
);
const App = () => {
    const projects = [
  { id: 101, name: "RAG Chatbot" },
  { id: 102, name: "AI Resume Builder" },
  { id: 103, name: "Customer Support Agent" }
];
// function Projects() {
//   return (
//     <div>
//       <h2>Projects</h2>

//       {projects.map((project) => (
//         <div key={project.id}>
//           <h3>{project.name}</h3>
//           <NavLink to={`/dashboard/projects/${project.id}`}>
//             Open Project
//           </NavLink>
//         </div>
//       ))}
//     </div>
//   );
// }
function Projects(){
    const[searchParams,setSearchParams] = useSearchParams()
    const search = searchParams.get("search") || ""
    function handleSearch(e){
        setSearchParams({search: e.target.value})
    }
    return(
        <div>
            <input type="text" value={search} onChange={handleSearch} placeholder="Serach projects"/>
            <p>
                Seraching for: {search}
            </p>
        </div>
    )
}
  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        }>
          <Route index element={<Overview />} />
          <Route path="chat" element={
            <Suspense fallback={<p>...Loading Chat</p>}>
                <Chat/>
            </Suspense>
          } />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails/>}/>
          <Route path="settings" element={<Settings />} />

        </Route>
          <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
};

function Home() {
  return <h1>Home</h1>;
}

function Login() {
  const navigate = useNavigate();
  function handleLogin(){
    // preten login succeeded
    navigate("/dashboard")
  }
  return ( 
    <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>
            Login
        </button>
    </div>
  )
}

function Overview() {
  return <h2>Overview</h2>;
}


function Settings() {
  return <h2>Settings</h2>;
}

function ProjectDetails() {
  const { projectId } = useParams();

  return <h2>Project ID: {projectId}</h2>;
}

function DashboardLayout() {
  return (
    <div>
      <h1>AI Workspace Dashboard</h1>
 
      <nav>
        <NavLink to="/dashboard">Overview</NavLink>
        <NavLink to="/dashboard/chat">Chat</NavLink>
        <NavLink to="/dashboard/projects">Projects</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
function ProtectedRoute({children}){
    const isloggedIn = true;
    if (!isloggedIn){
        return <Navigate to="/login"/>
    }
    return children
}
function NotFound(){
    return <h1>404- page notFound</h1>
}


export default App;