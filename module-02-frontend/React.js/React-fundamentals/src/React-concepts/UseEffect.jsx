import { useState, useEffect } from "react";


// 1. COUNT AND NAME EFFECT

function CountAndName() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    useEffect(() => {
        document.title = `Count : ${count} & Name  : ${name}`;
    }, [count, name]);

    return (
        <div>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                increment
            </button>

            <br />
            <br />

            <input
                type="text"
                placeholder="type here"
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}


// 2. FETCH USERS

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();

                setUsers(data);

            } catch (error) {
                setError(error.message);
                setUsers([]);

            } finally {
                setLoading(false);
            }
        }

        fetchUsers();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Users</h2>

            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}


// 3. FETCH POSTS

function Posts() {
    const [posts, setPost] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchPost() {

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );

                if (!response.ok) {
                    throw new Error(`HTTP request failed ; ${response.status}`);
                }

                const data = await response.json();

                setPost(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
          

        }
        fetchPost();

    }, []);

    if (loading) {
        return <p>Loading....</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
                

    }

    if (posts.length === 0) {
        return <p>No posts found</p>;
    }

    return (
        <div>
            <h1>Posts</h1>

            {posts.slice(0, 5).map((post) => {

                return (
                    <p key={post.id}>
                        {post.title}
                    </p>
                );
            })}

        </div>
    );
}


// MAIN APP

function App() {
    return (
        <div>

            {/* COUNT AND NAME */}

            <CountAndName />

            <hr />


            {/* USERS */}

            <Users />

            <hr />


            {/* POSTS */}

            <Posts />

        </div>
    );
}

export default App;