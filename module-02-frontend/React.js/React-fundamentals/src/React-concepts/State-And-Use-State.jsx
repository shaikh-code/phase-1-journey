import { useState } from "react";


// 1. BASIC COUNTER

function BasicCounter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count => count + 1);
    }

    function handleReset() {
        setCount(0);
    }

    return (
        <div>
            <h2>Basic Counter</h2>
            <h3>{count}</h3>

            <button onClick={handleIncrement}>
                Increment
            </button>

            <button onClick={handleReset}>
                Reset
            </button>
        </div>
    );
}


// 2. LIKE BUTTON

function LikeButton() {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    function handleLike() {
        setLiked(liked => !liked);
        setLikeCount(liked => liked === 0 ? 1 : 0);
    }

    return (
        <div>
            <h2>Like Button</h2>
            <h3>{likeCount}</h3>

            <button onClick={handleLike}>
                {liked ? "Liked" : "Like"}
            </button>
        </div>
    );
}


// 3. COUNTER WITH CONDITIONS

function Counter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count => count + 1);
    }

    function handleDecrement() {
        if (count > 0) {
            setCount(count => count - 1);
        } else {
            alert("Count cannot be negative");
        }
    }

    function handleReset() {
        setCount(0);
    }

    function handleDoubleIncrement() {
        setCount(count => count * 2);
    }

    return (
        <div>
            <h2>Advanced Counter</h2>
            <h3>{count}</h3>

            <button onClick={handleIncrement}>
                Increment
            </button>

            <br />

            <button onClick={handleDecrement}>
                Decrement
            </button>

            <br />

            <button onClick={handleReset}>
                Reset
            </button>

            <br />

            <button onClick={handleDoubleIncrement}>
                Double
            </button>
        </div>
    );
}


// MAIN APP

function App() {
    return (
        <div>
            <BasicCounter />

            <hr />

            <LikeButton />

            <hr />

            <Counter />
        </div>
    );
}

export default App;