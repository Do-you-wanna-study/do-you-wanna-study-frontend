import React, { useEffect, useState } from "react";
import "./App.css";
import {  Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Community from "./components/Community.js";
import Recruitment from "./components/Recruitment";
import Create1 from "./components/Create1.js";
import Create2 from "./components/Create2.js";
import Login from "./components/Login.js";
import MyStudy from "./components/MyStudy";
import Studying from "./components/Studying";
import SignUp from "./components/SignUp";
import Applying from "./components/Applying.js";
import MyPage from "./components/MyPage";
import Applyed from "./components/Applyed";
import ApplyRecruitment from "./components/ApplyRecruitment";
import Review from "./components/Review.js";
import ApplicantScore from "./components/ApplicantScore";
import MyScore from "./components/MyScore";
import axios from "axios";


function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  let token;

  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState([]);

  const [recruitment,setRecruitment] = useState({});

  const location = useLocation();

  let rightOnClick = () => {
    if (login) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  let leftOnClick = () => {
    if (login) {
      navigate("/mystudy");
    } else {
      navigate("/signup");
    }
  };

  useEffect(()=>{
    const redirection = ()=>{
      return navigate('/recruitment/1/all');
    }
    redirection();
  },[])

  return (
    <div className="App">
      <div className="position">
        <div className="header">
          <div className="header-wrapper">
            <button className="logo" onClick={()=>{navigate('/recruitment/1/all')}}><img className="logo" src="/logo.png" alt="logo" /></button>
            {location.pathname ==='/mypage' || location.pathname==='/mypage/apply'|| location.pathname==='/recuruitment/:recruitment_id/applyed' || location.pathname==='/mypage/profile' || location.pathname==='/mypage/score'
              ? <>
              <div className="header-tab" onClick={()=>{navigate('/mypage')}}>대시보드</div>
              <div
                className="header-tab"
                onClick={() => {
                  navigate("/mypage/score");
                }}
              >
                평점
              </div>
              <div className="header-tab" onClick={()=>{navigate('/mypage/apply')}}>지원현황</div>
              <div className="header-tab" onClick={()=>{navigate('/mypage/profile')}}>프로필</div></>
              : <>
              <div className="header-tab">이용안내</div>
              <div
                className="header-tab"
                onClick={() => {
                  navigate("/recruitment/1/all");
                }}
              >
                커뮤니티
              </div>
              <div className="header-tab">후기</div>
            </>}
            
          </div>
          <div className="board">
            <button className="left" onClick={leftOnClick}>
              <span className="left-content">
                {login ? "마이스터디" : "회원가입"}
              </span>
            </button>
            <button className="right" onClick={rightOnClick}>
              <span className="right-content">
                {login ? "마이페이지" : "로그인"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={<Login setLogin={setLogin} setUser={setUser} token={token}/>}
          />
          <Route
            path='/signup'
            element={<SignUp/>}
          />
          <Route
            path="/recruitment/:community_id/:filter"
            element={<Community login={login} />}
          />
          <Route path="/mystudy" element={<MyStudy />} />
          <Route path="/mypage" element={<MyPage setUser={setUser} setLogin={setLogin}/>} />
          <Route
            path="/recruitmentPost/:community_id/:recruitment_id"
            element={<Recruitment user={user} login={login} setRecruitment={setRecruitment}/>}
          />
          <Route path="/create/:community_id" render={() => (!login ?? navigate("/login"))} element={<Create1 login={login} setTitle={setTitle} setDescription = {setDescription} setTag={setTag}  />} />
          <Route path="/create2/:community_id" render={() => (!login ?? navigate("/login") )} element={<Create2 login={login} title={title} description={description} tag={tag} token={token}/>}/>
          <Route
            path="/mystudy/:studyName"
            element={<Studying />}
          />
          <Route
            path="/recruitmentPost/:community_id/:recruitment_id/applying"
            element={<Applying recruitment={recruitment} />}
          />
          <Route
            path="/mypage/apply"
            element={<ApplyRecruitment/>}
          />
          <Route
            path="/recruitment/:recruitment_id/applyed"
            element={<Applyed groupName={recruitment.title}/>}
          />
          <Route
            path="/mystudy/:study_id/review"
            element={<Review/>}
          />
          <Route
            path="/mypage/score"
            element={<MyScore/>}
          />
          <Route
            path="/applicant/:nickname"
            element={<ApplicantScore/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
