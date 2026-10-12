import { useState } from "react";


// 1. LIFTING STATE - MESSAGE

function MessageApp() {
    const [message, setMessage] = useState("");

    return (
        <>
            <MessageInput setMessage={setMessage} />
            <MessagePreview message={message} />
        </>
    );
}

function MessageInput({ setMessage }) {
    function handleChange(e) {
        setMessage(e.target.value);
    }

    return <input placeholder="enter here" onChange={handleChange} />;
}

function MessagePreview({ message }) {
    return <p>Your message is: {message}</p>;
}


// USER TYPES H
//       ↓
// Browser detects input change
//       ↓
// onChange
//       ↓
// handleChange(e)
//       ↓
// e.target.value = "H"
//       ↓
// setMessage("H")
//       ↓
// App's state changes
//       ↓
// App re-renders
//       ↓
// message = "H"
//       ↓
// message passed to MessagePreview
//       ↓
// Preview displays "H"


// 2. TEXT INPUT AND CHARACTER COUNT

function App() {
    const [text, setText] = useState("");

    return (
        <div>
            <TextInput setText={setText}></TextInput>
            <CharacterCount text={text}></CharacterCount>
        </div>
    );
}

function TextInput({ setText }) {
    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div>
            <input placeholder="typehere" onChange={handleChange} />
        </div>
    );
}

function CharacterCount({ text }) {
    return (
        <div>
            <p>
                Character count :{text.length}
            </p>
        </div>
    );
}


// MAIN APP

function LiftState() {
    return (
        <div>
            <MessageApp />

            <hr />

            <App />
        </div>
    );
}

export default LiftState;