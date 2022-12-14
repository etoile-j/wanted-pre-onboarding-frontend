import { Navigate } from 'react-router-dom';

const Todo = () => {
    const token = localStorage.getItem('token');

    return (
        <>
            {!token && <Navigate to="/" replace={true} />}
            <p>todo</p>
        </>
    );
};
export default Todo;
