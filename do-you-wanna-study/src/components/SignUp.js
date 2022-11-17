import axios from 'axios';
import React, { useState } from 'react';
import '../css/login.css';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function SignUp(){
    // let email = useSelector((state)=>{return state.email});
    const navigate = useNavigate();
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [passwordAgain,setPasswordAgain] = useState('');
    let [nickname,setNickname] = useState('');
    let [passwordSame, setPasswordSame] = useState(true);
    let [emailForm, setEmailForm] = useState(true);
    let [duplicateEmail, setDuplicateEmail] = useState(false);

    const emailCheck = (email) => {
    
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        
        return regExp.test(email)
    
    }

    const onClick = ()=>{ 
        if(!emailCheck(email)){
            return setEmailForm(false);
        }
        else if(password !== passwordAgain){
            setEmailForm(true);
            return setPasswordSame(false);
        }else{
            setEmailForm(true);
            setPasswordSame(true);
        axios.post('http://43.200.6.177:8000/auth/signup', {email, password, nickname}).then((res)=>{
            if(res.data.success){
                navigate('/login');
            }else{
                setDuplicateEmail(true);
            }
        }).catch((err)=>{console.log(err);})
        }
    }


    return(
        <div className='content'>
            <div>이메일</div>
            <input id="id" name="id" placeholder="이메일을 입력하세요" onChange={(e)=> {setEmail(e.target.value)}} />
            <div>비밀번호</div>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="최소 6자"
                minLength = '6'
                onChange={(e)=> {setPassword(e.target.value)}}
            />
            <div>비밀번호 확인</div>
            <input
                id="passwordAgain"
                name="passwordAgain"
                type="passwordAgain"
                placeholder="최소 6자"
                minLength ='6'
                onChange={(e)=> {setPasswordAgain(e.target.value)}}
            />
            <div>닉네임</div>
            <input
                id="nickname"
                name="nickname"
                type="nickname"
                placeholder="최대 6자"
                maxLength = '6'
                onChange={(e)=> {setNickname(e.target.value)}}
            />
            
            <br/>
            <Button onClick={onClick}>회원가입</Button>
            { emailForm ? null : <div>이메일 형식을 확인하세요.</div> }
            { passwordSame ? null : <div>비밀번호가 일치하지 않습니다.</div> }
            { duplicateEmail ? <div>이미 존재하는 이메일입니다.</div> : null }
        </div>
    );
}

export default SignUp;