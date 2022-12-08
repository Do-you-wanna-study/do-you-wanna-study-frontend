import React,{useState,useEffect} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import '../App.css';
import '../css/CreateStudy.css';
import { useNavigate } from 'react-router-dom';


const CreateStudy = (props)=>{
    const [groupName,setGroupName] = useState("");
    const [period,setPeriod] = useState(0);
    const [startDate,setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const createStudy = (id) =>{
        const create = async() =>{
            await axios.post("http://43.200.6.177:8000/recruitment/detail/create?id="+id,{groupName: groupName,period : period, startDate: startDate})
            .then((res)=>{
                console.log(res.data);
                navigate('/recruitment/1/all');
            })
            .catch((err)=>{console.log(err);})
        }
        create();
    }

    return(
        <div className='create_modal'>
            <input className="createName" placeholder='제목을 입력하세요' onChange={(e)=>{setGroupName(e.target.value)}}/>
            <input className="createPeriod" placeholder='기간' type='number' onChange={(e)=>{setPeriod(e.target.value)}}/>
            <DatePicker selected={startDate} dateFormat="yyyy/MM/dd" placeholderText='시작일을 선택하세요' onChange={(date) => setStartDate(date)} />
            <button className="create_study" onClick={()=>{createStudy(props.recruitment_id)}}>스터디 생성</button>
        </div>
    );
}

export default CreateStudy;