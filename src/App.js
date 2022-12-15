import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
