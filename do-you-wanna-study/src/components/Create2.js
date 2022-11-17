import React from 'react';
import {useNavigate} from 'react-router-dom';

function Create2(props){

    let navigate = useNavigate('/create2');
    
    
    return(
        <>
            <div className='body'>
            <input className="createPeople" placeholder='모집인원' onChange={(e)=>{props.setRecruitment(e.target.value)}}/>
            <input className="createRegion" placeholder='지역선택' onChange={(e)=>{props.setRegion(e.target.value)}}/>
            </div>

            <div className='createPost' onClick={ props.onClick }>모집하기</div>
            <div className='createCancel' onClick={()=>{navigate(-2)}}>취소</div>
            
        </>
    );
}

export default Create2;