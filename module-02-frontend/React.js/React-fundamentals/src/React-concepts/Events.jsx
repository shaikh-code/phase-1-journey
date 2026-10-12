import { useState } from "react";


// 1. BASIC EVENT HANDLER

function BasicButton() {
    function handleClick() {
        alert("You clicked me!");
    }

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}


// 2. ALERT BUTTON

function AlertButton({ message, children }) {
    return (
        <button onClick={() => alert(message)}>
            {children}
        </button>
    );
}

function AlertToolbar() {
    return (
        <div>
            <AlertButton message="Playing!">
                Play Movie
            </AlertButton>

            <AlertButton message="Uploading!">
                Upload Image
            </AlertButton>
        </div>
    );
}


// 3. PLAY AND UPLOAD BUTTONS

function EventButton({ onClick, children }) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
}

function Playbutton({ movieName }) {
    function handlePlayClick() {
        alert(`Playing${movieName}`);
    }

    return (
        <div>
            <EventButton onClick={handlePlayClick}>
                Play "{movieName}"
            </EventButton>
        </div>
    );
}

function Uploadbutton() {
    return (
        <EventButton onClick={() => alert("Uploading")}>
            Upload image
        </EventButton>
    );
}

function PlayUploadMain() {
    return (
        <div>
            <Playbutton movieName="Extraction 3"></Playbutton>
            <Uploadbutton></Uploadbutton>
        </div>
    );
}


// 4. EVENT PROPAGATION

function StopPropagationButton({ onClick, children }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </button>
    );
}

function Toolbar() {
    return (
        <div
            className="Toolbar"
            onClick={() => {
                alert("you clicked on the bar");
            }}
        >
            <StopPropagationButton
                onClick={() => {
                    alert("Playing");
                }}
            >
                Play movie
            </StopPropagationButton>

            <StopPropagationButton
                onClick={() => {
                    alert("uploading");
                }}
            >
                Upload image
            </StopPropagationButton>
        </div>
    );
}


// 5. FORM EVENT

function MessageForm() {
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function handleClear() {
        setMessage("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(message);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={message}
                    onChange={handleChange}
                    placeholder="enter"
                />

                <p>{message}</p>

                <button type="submit">
                    Submit
                </button>

                <br />
            </form>

            <button onClick={handleClear}>
                Clear
            </button>
        </div>
    );
}


// 6. FORM WITH OBJECT STATE

function UserForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: ""
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                    placeholder="enter your name"
                />

                <br />

                <input
                    name="role"
                    onChange={handleChange}
                    value={form.role}
                    placeholder="enter your role"
                />

                <br />

                <input
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="enter your email"
                />

                <button type="submit">
                    submit
                </button>

            </form>
        </div>
    );
}


// 7. LOGIN TOGGLE

function LoginToggle() {

    function handleToggleLogin() {
        setIsLoggedIn(prev => !prev);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn ? (
                <h1>Logged in </h1>
            ) : (
                <h1>Logged out </h1>
            )}

            {isLoggedIn && (
                <h1>welcome back love</h1>
            )}

            <button onClick={handleToggleLogin}>
                {isLoggedIn ? "log out" : "log in"}
            </button>
        </div>
    );
}


// MAIN APP

function App() {
    return (
        <div>

            {/* BASIC EVENT */}

            <BasicButton />

            <hr />


            {/* ALERT BUTTON */}

            <AlertToolbar />

            <hr />


            {/* PLAY AND UPLOAD */}

            <PlayUploadMain />

            <hr />


            {/* EVENT PROPAGATION */}

            <Toolbar />

            <hr />


            {/* MESSAGE FORM */}

            <MessageForm />

            <hr />


            {/* OBJECT FORM */}

            <UserForm />

            <hr />


            {/* LOGIN TOGGLE */}

            <LoginToggle />

        </div>
    );
}

export default App;