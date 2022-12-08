import axios from 'axios';
import React, { useState } from 'react';
import '../css/login.css';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



function Login(props){
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [ fail, setFail] = useState(false);

    const onClick = ()=>{
        axios.post('http://43.200.6.177:8000/auth/login',{email: email, password: password}, {withCrendentials: true, crossDomain: true})
        .then((res)=>{
            if(res.data.success){
                props.setLogin(true);
                props.setUser(res.data.data);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                navigate('/recruitment/1/all');
            }
    }).catch((err)=>{
        
        !err.response.data.success && setFail(true);
        
        console.log(err.response);
    })
    }
    const navigate = useNavigate('/signup');

    return(
        <div className='content'>
            <div>이메일</div>
            <input id="id" name="id" placeholder="아이디를 입력해주세요" onChange={(e)=> {setEmail(e.target.value)}} />
            <div>비밀번호</div>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e)=> {setPassword(e.target.value)}}
            />
            {fail &&<div>이메일 및 비밀번호가 틀렸습니다.</div>}

            <br/>
            <Button onClick={onClick}>로그인</Button>
            <Button onClick={ navigate }>회원가입</Button>
        </div>
    );
}

export default Login;