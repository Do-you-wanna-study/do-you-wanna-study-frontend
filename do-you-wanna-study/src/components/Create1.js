import React from 'react';
import {useNavigate} from 'react-router-dom';

function Create1(props){

    let navigate = useNavigate('/create2');
    
    return(
        <>
            <input className="createTitle" placeholder='제목을 입력하세요' onChange={(e)=>{props.setTitle(e.target.value)}}/>
            <input className="createTag" placeholder='#태그 입력 (최대 5개)' onChange={(e)=>{props.setTag([e.target.value])}}/>
            <textarea className="createContent" placeholder='내용을 입력하세요' onChange={(e)=>{props.setDescription(e.target.value)}}></textarea>

            <div className='createPost' onClick={()=>{navigate('/create2')}}>모집하기</div>
            <div className='createCancel' onClick={()=>{navigate(-1)}}>취소</div>
            
        </>
    );
}

export default Create1;