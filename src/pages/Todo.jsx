import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import TodoList from '../components/todo/TodoList';

const Todo = () => {
    const token = localStorage.getItem('token');
    const [text, setText] = useState();

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}todos`,
                {
                    todo: text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.status === 201) window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {!token && <Navigate to="/" replace={true} />}
            <main>
                <h1>TO</h1>
                <section>
                    <input
                        type="text"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    ></input>
                    <button type="button" onClick={handleCreate}>
                        추가
                    </button>
                    <TodoList />
                </section>
            </main>
        </>
    );
};
export default Todo;
