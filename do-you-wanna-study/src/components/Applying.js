import React, { useEffect, useState } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import "../css/Recruitment.css";
import Proc from './Proc.js';
import "../css/apply.css";
import axios from 'axios';

function Applying(props){
    const navigate = useNavigate();
    const [description,setDescription] = useState('');

    const apply = async() =>{
        let config = {
            headers: {
              id: props.recruitment.id
            }
          }

        await axios.post("http://43.200.6.177:8000/recruitment/detail/apply/?id="+props.recruitment.id, {description:  description}, config)
            .then((res)=>{
                console.log(res.data);
                navigate(-2);
            }).catch((err)=>{console.log(err);})
    }

    return(
        <>
            <div className='recruitment_header'>
                <div className='recruitment_titlebar'>
                    <Proc status={props.recruitment.status}/>
                    <div className='recruitment_title'>{props.recruitment.title}</div>
                </div>
                <div className='recruitment_writerbar'>
                    <div className='recruitment_writer'>{props.recruitment.__author__?.nickname}</div>
                    <div className='recruitment_createDate'>{props.recruitment.__author__?.createdAt}</div>
                </div>
            </div>
            <textarea className='apply_text' placeholder='지원서를 작성해주세요' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <button className='recruitment_apply' onClick={()=>{apply()}}>지원하기</button>
            <button className='recruitment_cancel' onClick={()=>{navigate(-1)}}>취소</button>
        </>
    );
}

export default Applying;