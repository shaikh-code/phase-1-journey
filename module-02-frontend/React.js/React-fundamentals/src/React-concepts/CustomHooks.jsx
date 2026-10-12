import { useEffect, useState } from "react";


// 1. SEARCH CUSTOM HOOK

function useSearch(initialquery) {
    const [query, setQuery] = useState(initialquery);

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function clearSearch() {
        setQuery("");
    }

    return {
        query,
        handleChange,
        clearSearch
    };
}

function ProductSearch() {
    const {
        query,
        handleChange,
        clearSearch
    } = useSearch("Laptop");

    return (
        <div>

            <input
                value={query}
                placeholder="type here"
                onChange={handleChange}
            />

            <button onClick={clearSearch}>
                clear
            </button>

            <p>
                searching for query : {query}
            </p>

            <ConversationSearch></ConversationSearch>

        </div>
    );
}

function ConversationSearch() {
    const {
        query,
        handleChange,
        clearSearch
    } = useSearch();

    return (
        <div>

            <input
                value={query}
                placeholder="type here"
                onChange={handleChange}
            />

            <button onClick={clearSearch}>
                Clear conversation
            </button>

        </div>
    );
}


// 2. ONLINE STATUS CUSTOM HOOK

function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {

        function handleOnline() {
            setIsOnline(true);
        }

        function handleOffline() {
            setIsOnline(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };

    }, []);

    return isOnline;
}

function ChatStatus() {
    const isOnline = useOnlineStatus();

    return (
        <div>
            <p>
                {isOnline ? "Online" : "Offline"}
            </p>
        </div>
    );
}

function ProfileStatus() {
    const isOnline = useOnlineStatus();

    return (
        <div>
            <p>
                {isOnline ? "Online" : "Offline"}
            </p>
        </div>
    );
}


// 3. TOGGLE CUSTOM HOOK

function useToggle() {
    const [toggle, setToggle] = useState(false);

    function handleToggle() {
        setToggle(!toggle);
    }

    return {
        toggle,
        handleToggle
    };
}

function Toggle() {

    const {
        toggle,
        handleToggle
    } = useToggle();

    useEffect(() => {
        document.body.style.backgroundColor =
            toggle ? "black" : "white";
    }, [toggle]);

    return (
        <div
            style={{
                color: toggle ? "white" : "black"
            }}
        >
            <p>
                screen is: {toggle ? "black" : "white"}
            </p>

            <button onClick={handleToggle}>
                {toggle ? "OFF" : "On"}
            </button>
        </div>
    );
}


// MAIN APP

function App() {
    return (
        <div>

            {/* SEARCH */}

            <ProductSearch />

            <hr />


            {/* ONLINE STATUS */}

            <ChatStatus />

            <ProfileStatus />

            <hr />


            {/* TOGGLE */}

            <Toggle />

        </div>
    );
}

export default App;