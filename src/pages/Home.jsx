import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

function Home() {
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passCheck, setPassCheck] = useState(false);

    const handleCheckValid = () => {
        const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (email.match(emailRegex) && password.length >= 8) {
            setPassCheck(true);
        } else {
            setPassCheck(false);
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}auth/signup`, {
                email: email,
                password: password,
            });
            if (response.status === 201) alert('회원가입이 완료되었습니다.');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await axios.post(`${BASE_URL}auth/signin`, {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.access_token);
                window.location.replace('/todo');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {token && <Navigate to="/todo" replace={true} />}
            <main>
                <h1>로그인 및 회원가입</h1>
                <form>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            onKeyUp={handleCheckValid}
                            placeholder="이메일"
                        ></input>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            onKeyUp={handleCheckValid}
                            placeholder="비밀번호"
                        ></input>
                    </div>
                    <button
                        type="button"
                        onClick={handleSignUp}
                        disabled={passCheck ? false : true}
                    >
                        회원가입
                    </button>
                    <button
                        type="button"
                        onClick={handleSignIn}
                        disabled={passCheck ? false : true}
                    >
                        로그인
                    </button>
                </form>
            </main>
        </>
    );
}

export default Home;
