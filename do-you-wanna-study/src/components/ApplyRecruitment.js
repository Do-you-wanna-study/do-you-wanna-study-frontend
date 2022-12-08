import axios from "axios";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/MyPage.css';

const ApplyRecruitment = ()=>{
    const [postList,setPostList] = useState([]);
    const navigate= useNavigate();

    useEffect(()=>{
        const getPost = async()=>{
            await axios.get("http://43.200.6.177:8000/mypage/myrecruit")
            .then((res)=>{
                setPostList(res.data.data);
            })
            .catch((err)=>{console.log(err);})
        }
        getPost();
    },[]);

    return(
        <div className="mypage_apply">
            <div className="status-wrapper">
                <div className="status">지원중</div>
                <div className="status">모집중</div>
            </div>
            {postList.map((a,i)=>{
                return(
                    <div className="apply_name"key={i}>
                        <button className="study_name" onClick={()=>{navigate("/recruitment/"+a.id+"/applyed")}}>{a.title}</button>
                        <div className="study_writer">{a.description}</div>
                        <div className="study_deadline">{a.createdAt}</div>
                    </div>
                );
            })}
            
        </div>
    );


}

export default ApplyRecruitment;