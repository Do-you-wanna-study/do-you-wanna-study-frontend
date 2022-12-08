import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import "../css/Create.css";

function Create1(props){
    useEffect(()=>{
        props.setTitle("")
        props.setDescription("")
        props.setTag([])
    },[])

    let navigate = useNavigate('/create2');
    const {community_id} = useParams();
    const onDescriptionChange = (e)=>{
       props.setDescription(e.target.value)
    }
    const onTagChange = (e)=>{
        var tags = e.target.value.split("#");
        tags.shift();
        props.setTag(tags);
    }
    
    return(
        <>
            <input className="createTitle" placeholder='제목을 입력하세요' onChange={(e)=>{props.setTitle(e.target.value)}}/>
            <input className="createTag" placeholder='#태그 입력 (최대 5개)' onChange={onTagChange}/>
            <textarea className="createContent" placeholder='내용을 입력하세요' onChange={onDescriptionChange}></textarea>

            <button className='createPost' onClick={()=>{navigate('/create2/'+community_id)}}>모집하기</button>
            <button className='createCancel' onClick={()=>{navigate(-1)}}>취소</button>
            
        </>
    );
}

export default Create1;