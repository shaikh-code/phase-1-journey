function Message({ role, content }) {
    return (
        <div>
            <h3>
                {role}
            </h3>

            <p>
                {content}
            </p>
        </div>
    );
}


// MAIN APP

function ListAndKeys() {

    const numbers = [12, 13, 14, 15];

    const tools = [
        {
            id: 1,
            name: "ChatGPT",
            type: "LLM"
        },
        {
            id: 2,
            name: "Claude",
            type: "LLM"
        },
        {
            id: 3,
            name: "Gemini",
            type: "LLM"
        }
    ];

    const messages = [
        {
            id: "msg-101",
            role: "user",
            content: "What is RAG?"
        },
        {
            id: "msg-102",
            role: "assistant",
            content: "RAG stands for..."
        }
    ];

    const studentsInfo = [
        {
            id: 101,
            year: "3rd year",
            grade: "A+"
        },
        {
            id: 102,
            year: "2nd year",
            grade: "A"
        },
        {
            id: 103,
            year: "1st year",
            grade: "B+"
        }
    ];

    return (
        <div>

            {/* NUMBERS */}

            <ul>
                {numbers.map(number => {
                    console.log("number key:", number);

                    return (
                        <li key={number}>{number}</li>
                    );
                })}
            </ul>


            {/* TOOLS */}

            <ul>
                {tools.map(tool => {
                    return (
                        <div key={tool.id}>
                            <h2>{tool.name}</h2>
                            <p>{tool.type}</p>
                        </div>
                    );
                })}
            </ul>


            {/* MESSAGES */}

            {messages.map(message => {
                console.log("Message ID:", message.id);

                return (
                    <Message
                        key={message.id}
                        role={message.role}
                        content={message.content}
                    />
                );
            })}


            {/* STUDENTS */}

            <ul>
                {studentsInfo.map(stu => {
                    console.log(studentsInfo);

                    return (
                        <li key={stu.id}>
                            {stu.id} — {stu.year} — {stu.grade}
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}

export default ListAndKeys;