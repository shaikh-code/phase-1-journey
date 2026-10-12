import { useContext, useState, createContext } from "react";


// 1. AUTH CONTEXT AND USER CONTEXT

const AuthContext = createContext();
const UserContext = createContext();

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user = {
        name: "Abdul Moiz",
        id: "260229540",
        role: "AI Product Engineer"
    };

    return (
        <div>

            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>

                <UserContext.Provider value={user}>

                    <Header></Header>

                    <Dashboard></Dashboard>

                    <UserMenu></UserMenu>

                </UserContext.Provider>

            </AuthContext.Provider>

        </div>
    );
}

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <button
                onClick={() =>
                    setIsLoggedIn(prev => !prev)
                }
            >
                {isLoggedIn ? "logout" : "log in"}
            </button>
        </div>
    );
}


function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);

    const user = useContext(UserContext);

    return (
        <div>

            <p>
                {isLoggedIn
                    ? "Welcomed back Dear"
                    : "Please log in"
                }
            </p>

            {isLoggedIn && (
                <>
                    <p>{user.name}</p>
                    <p>{user.id}</p>
                    <p>{user.role}</p>
                </>
            )}

        </div>
    );
}

function UserMenu() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <p>
                Status: {isLoggedIn ? "Logged in" : "logged out"}
            </p>
        </div>
    );
}


// 2. USER CONTEXT THROUGH COMPONENT TREE

const NestedUserContext = createContext();

function SimpleContextApp() {

    const user = {
        name: "Abdul Moiz",
        role: "AI Product Engineer"
    };

    return (
        <div>

            <NestedUserContext.Provider value={user}>
                <SimpleDashboard />
            </NestedUserContext.Provider>

        </div>
    );
}

function SimpleDashboard() {
    return <Sidebar />;
}

function Sidebar() {
    return <SimpleUserMenu />;
}

function SimpleUserMenu() {
    return <Avatar />;
}

function Avatar() {

    const user = useContext(NestedUserContext);

    return (
        <div>
            <p>{user.name}</p>
            <p>{user.role}</p>
        </div>
    );
}


// CONTEXT FLOW

//                   user
//                    ↓
//                  App
//                    ↓
//           UserContext.Provider
//                    │
//         ┌──────────┴──────────┐
//         ↓                     ↓
//     Dashboard              other stuff
//         ↓
//      Sidebar
//         ↓
//     UserMenu
//         ↓
//      Avatar
//         ↑
//         │
//  useContext(UserContext)
//         │
//         └──── gets user


// MAIN APP

function MainApp() {
    return (
        <div>

            <App />

            <hr />

            <SimpleContextApp />

        </div>
    );
}

export default MainApp;