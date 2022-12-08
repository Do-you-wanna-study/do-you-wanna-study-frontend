import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const MyScore = () =>{
    const [evaluation,setEvaluation] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const score = async() => {
            await axios.get("http://43.200.6.177:8000/mypage/feedback")
            .then((res)=>{
                setEvaluation(res.data.data);
                console.log(res.data.data);
            })
            .catch((err)=>{console.log(err);})
        }
        score();
    },[])
    return(
        <div>
            {evaluation.map((a,i)=>{
                return(
                    <div className="apply_name" key={i}>
                        <div className="study_name">{a.content}</div>
                    </div>
                );
            })} 
        </div>
    );
}

export default MyScore;