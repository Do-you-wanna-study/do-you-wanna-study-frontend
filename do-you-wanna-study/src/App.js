import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Community from "./components/Community.js";
import Recruitment from "./components/Recruitment";
import Create from "./components/Create.js";
import Login from "./components/Login.js";
import MyStudy from "./components/MyStudy";
import Studying from "./components/Studying";

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [header, setHeader] = useState("공개커뮤니티");
  const [left, setLeft] = useState("회원가입");
  const [right, setRight] = useState("로그인");
  const [user, setUser] = useState({});

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

  return (
    <div className="App">
      <div className="position">
        <div className="header">
          <div className="header-wrapper">
            <img className="logo" src="/logo.png" alt="logo" />

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
            element={<Login setLogin={setLogin} setHeader={setHeader} />}
          />
          <Route
            path="/recruitment/:community_id/:filter"
            element={<Community login={login} setHeader={setHeader} />}
          />
          <Route path="/mystudy" element={<MyStudy />} />
          <Route path="/mypage" element={<div>마이페이지</div>} />
          <Route
            path="/recruitment/:community_id/:filter/:recruitment_id"
            element={<Recruitment />}
          />
          <Route path="/create" element={<Create />} />
          <Route
            path="/mystudy/:studyName"
            element={<Studying setHeader={setHeader} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
