import axios from "axios";
import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Chart from "./Chart";


const ApplicantScore = () =>{
    const {nickname} = useParams();
    const [grade,setGrade] = useState({}); 
    useEffect(()=>{
        const score = async()=>{
            await axios.get(`http://43.200.6.177:8000/recruitment/detail/user/grade?applicant=${nickname}`)
            .then((res)=>{setGrade(res.data.data);})
            .catch((err)=>{console.log(err);})
        }
        score();
    },[])
    return(
        <div className="applicant_score">
            <span>{nickname}님의 평점</span>
            <Chart grade={grade}></Chart>
        </div>
    );
}

export default ApplicantScore;