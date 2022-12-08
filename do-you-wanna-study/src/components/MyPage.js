import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/MyPage.css';
import {
    faArrowRight,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Chart  from "../components/Chart.js";

const MyPage = (props)=>{
    const navigate = useNavigate();
    const logout = async() => {
            axios.defaults.headers.common['Authorization'] = `Bearer `;
            props.setUser({});
            props.setLogin(false);
            navigate('/recruitment/1/all');
    }
    return(
        <div className="community-warpper">
            <div className="community-header">마이페이지 <button className="logout" onClick={()=>{logout()}}>로그아웃</button></div>
            <div className="community-body">
                <div className="top_body">
                    <div className="mypage_score">
                        <span>내 평점</span><button>자세히 <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                        <div className="score_option">총점 4.50</div>
                        <div className="score_option">실력 4.50</div>
                        <div className="score_option">인성 4.50</div>
                        <div className="score_option">성실 4.50</div>
                        <div className="score_option">도움 4.50</div>
                        <Chart></Chart>

                    </div>
                    <div className="mypage_apply">
                        <span>지원 현황</span><button>자세히 <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div className="bottom_body">
                    
                </div>
            </div>
        </div>
    );


}

export default MyPage;