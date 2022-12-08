import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/MyPage.css';
import {
    faArrowRight,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Chart  from "../components/Chart.js";

const MyPage = (props)=>{
    const navigate = useNavigate();
    const [grade,setGrade] = useState({});
    const [apply,setApply] = useState({});

    const logout = async() => {
            axios.defaults.headers.common['Authorization'] = `Bearer `;
            props.setUser({});
            props.setLogin(false);
            navigate('/recruitment/1/all');
    }

    useEffect(()=>{
        const mypage = async() =>{
            await axios.get("http://43.200.6.177:8000/mypage")
            .then((res)=>{
                setGrade(res.data.data.grade);
                setApply(res.data.data.apply);
            })
            .catch((err)=>{console.log(err);})
        }
        mypage();
    },[])

    return(
        <div className="community-warpper">
            <div className="community-header">마이페이지 <button className="logout" onClick={()=>{logout()}}>로그아웃</button></div>
            <div className="community-body">
                <div className="top_body">
                    <div className="mypage_score">
                        <span>내 평점</span><button onClick={()=>{navigate('/mypage/score')}}>자세히 <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                        <Chart grade={grade}></Chart>

                    </div>
                    <div className="mypage_applyStatus">
                        <span>지원 현황</span><button onClick={()=>{navigate('/mypage/apply')}}>자세히 <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                        <div className="flex-box">
                            <div className="mypage_recruiting"><span className="circle">{apply.recruit}</span><span className="text">모집중</span></div>
                            <div className="mypage_recruiting"><span className="circle">{apply.apply}</span><span className="text">지원중</span></div>
                        </div>
                    </div>
                </div>
                <div className="bottom_body">
                    
                </div>
            </div>
        </div>
    );


}

export default MyPage;