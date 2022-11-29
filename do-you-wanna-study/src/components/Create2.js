import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import "../css/Create.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Create2(props){
    useEffect(()=>{
        setRecruitment(0)
        setRegion("")
    },[])

    let navigate = useNavigate('/create2');
    let {community_id} = useParams();
    const [recruitment,setRecruitment] = useState(0);
    const [region, setRegion] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let id = parseInt(community_id)
    let title = toString(props.title)
    let description = toString(props.description)
    

    const onClick = ()=>{
        console.log(props.title, props.description, null, region, recruitment, props.tag, community_id);
        axios.post('http://43.200.6.177:8000/recruitment',{title : title, description : description, deadline : null, region : region, recruitment_number : recruitment, hashtag: props.tag, community_id : id})
       .then((res)=>{
           console.log(res.data.data);
           return navigate(-2)
       }).catch((err)=>{console.log(err);})
       }
    
    return(
        <>
            <input className="createPeople" placeholder='모집인원' onChange={(e)=>{setRecruitment(e.target.value)}}/>
            <input className="createRegion" placeholder='지역선택' onChange={(e)=>{setRegion(e.target.value)}}/>
            <DatePicker selected={startDate} dateFormat="yyyy/MM/dd" placeholderText='시작일을 선택하세요' onChange={(date) => setStartDate(date)} />
            <DatePicker selected={endDate} dateFormat="yyyy/MM/dd" placeholderText='마감일을 선택하세요' minDate={startDate} onChange={(date) => setEndDate(date)} />

            <div className='createPost' onClick={ onClick }>모집하기</div>
            <div className='createCancel' onClick={()=>{navigate(-2)}}>취소</div>
            
        </>
    );
}

export default Create2;