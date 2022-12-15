import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import { TodoItem } from './TodoItem';

function TodoList() {
    const token = localStorage.getItem('token');
    const [todos, setTodos] = useState();

    const handleGet = async () => {
        try {
            const response = await axios.get(`${BASE_URL}todos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTodos(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        handleGet();
    }, []);

    return (
        <article>
            <ul>
                {todos?.map((item) => {
                    return (
                        <li key={item.id}>
                            <TodoItem
                                text={item.todo}
                                id={item.id}
                                isCompleted={item.isCompleted}
                            />
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default TodoList;
