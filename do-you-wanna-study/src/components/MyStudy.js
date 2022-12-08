import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/MyStudy.css";


function MyStudy(){
    const [secret, setSecret] = useState([]);
    let url;
    let navigate = useNavigate(url);

    useEffect(()=>{
       const myStudy = async() =>{
        await axios.get("http://43.200.6.177:8000/mystudy")
        .then((res)=>{
            setSecret(res.data.data);
        })
        .catch((err)=>{console.log(err);})
       } 
       myStudy();
    },[])

    const studyEnd = async(id) =>{
        await axios.patch("http://43.200.6.177:8000/mystudy/detail/end?id="+id)
        .then((res)=>{
            navigate("/mystudy/"+id+"/review");
        })
        .catch((err)=>{console.log(err);})
    }

    return(
    <div className="myStudy">
        <span className="myStudy_header">마이스터디</span>
        <div className="myStudy_list">
            { secret.map((a,i)=>{
                    return(
                    <div key={i}>
                        <div className="groupName" >{a.__studyGroup__.groupName}</div>
                        <div className="startDate">{a.__studyGroup__.startDate} 
                        {a.__studyGroup__.isFinished && <button className="study_end" onClick={()=>{studyEnd(a.__studyGroup__.id)}}>회고하기</button> }
                        
                        </div>
                        <div className="period">{a.__studyGroup__.period}주</div>
                    </div> 
                    );
                })}
        </div>
    </div>
    );

}

export default MyStudy;