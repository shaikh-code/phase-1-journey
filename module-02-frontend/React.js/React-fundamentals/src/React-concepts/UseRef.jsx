import { useRef, useState, useEffect } from "react";


// 1. RENDER COUNT AND INPUT FOCUS

function RenderCountExample() {
    const [name, setName] = useState("");

    const renderCount = useRef(1);

    console.log(renderCount);

    const inputRef = useRef();

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    function focus() {
        inputRef.current.focus();
        inputRef.current.placeholder = "ypehere";
    }

    return (
        <div>
            <input
                ref={inputRef}
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <p>My name is {name}</p>

            <p>
                i rendered {renderCount.current}
            </p>

            <button onClick={focus}>
                focus
            </button>
        </div>
    );
}


// 2. READ INPUT VALUE

function ReadInput() {
    const inputRef = useRef(null);
    const [read,setRead] = useState(false);

    function handleRead() {
        console.log(inputRef.current.value);
        setRead(true);
    }
   
    function handleClear() {
        inputRef.current.value = "";
        setRead(false);
    }
    return (
        <div>
            <input
                placeholder="typehere"
                ref={inputRef}
            />

            <button onClick={handleRead}>
                Read
            </button>
            <button onClick={handleClear}>
                Clear
            </button>
            {read && <p>input value: {inputRef.current?.value}</p>}
        </div>
    );
}


// 3. TIMER

function Timer() {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);

    const interVal = useRef(null);

    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(interVal.current);

        interVal.current = setInterval(() => {

            // update the current time every 10ms

            setNow(Date.now());

        }, 10);
    }

    function handleStop() {
        clearInterval(interVal.current);
    }

    let secondPassed = 0;

    if (startTime != null && now != null) {
        secondPassed = (now - startTime) / 1000;
    }

    return (
        <div>
            <h1>
                Time passed :{secondPassed.toFixed(3)}
            </h1>

            <button onClick={handleStart}>
                Start
            </button>

            <br />

            <button onClick={handleStop}>
                Stop
            </button>
        </div>
    );
}


// 4. CHAT WITH UNDO

function Chat() {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);

    let timeOutRef = useRef(null);

    function handleSend() {
        setIsSending(true);

        timeOutRef.current = setTimeout(() => {
            alert("Sent!");
            setIsSending(false);
        }, 3000);
    }

    function handleUndo() {
        setIsSending(false);
        clearTimeout(timeOutRef.current);
    }

    return (
        <>
            <input
                placeholder="type here"
                disabled={isSending}
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button
                disabled={isSending}
                onClick={handleSend}
            >
                {isSending ? "Sending..." : "Send"}
            </button>

            {isSending &&
                <button onClick={handleUndo}>
                    Undo
                </button>
            }
        </>
    );
}


// MAIN APP

function App() {
    return (
        <div>

            {/* RENDER COUNT */}

            <RenderCountExample />

            <hr />


            {/* READ INPUT */}

            <ReadInput />

            <hr />


            {/* TIMER */}

            <Timer />

            <hr />


            {/* CHAT */}

            <Chat />

        </div>
    );
}

export default App;