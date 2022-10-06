import React, { useState } from 'react';
import {Button,Nav} from 'react-bootstrap';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'


function Community() {
  const [postTitle,setPostTitle] = useState(["중앙대학교 6p/매주 토요일 모각코", "토익 990목표/격주 일요일 6시"]);
  const [post,setPost] = useState(["박정훈 박호동 장민혁의 캡스톤 스터디를 도와주실 분 급구 디자이너 급해요","토익 만점으로 영어 부실 사람 드루와"]);
  const [status,setStatus] = useState([true,true]);
  const [secret,setSecret] = useState(["중앙대학교","SOPT","우아한형제들","선린인터넷고"]);
  let navigate = useNavigate();

  return (
    <div>
      <div className='container'>
        <div className='header'>
          <div className='logo'>ㄱㅂㅎㄹ?</div>
          <div className='board'>
            <span className='board-name'>공개커뮤니티</span>
            <Button className='my_study' onClick={()=>{ navigate('/mystudy')}}>마이스터디</Button>
            <Button className='my_page' onClick={()=>{ navigate('/mypage')}}>마이페이지</Button>
          </div>
        </div>
        <div className='left-bar'>
          <Button className='open' onClick={()=> navigate('/community')}>공개 커뮤니티</Button><hr/>
            {
              secret.map((a)=>{
                return(
                  <Button className='secret'>{a}</Button>
                )
              })
            }
        </div>
        <div className='body'>
          <div className='search'>
            <Nav variant="tabs">
              <Nav.Item className='tabs'>
                <Nav.Link eventKey='link-0'>전체</Nav.Link>
              </Nav.Item>

              <Nav.Item className='tabs'>
                <Nav.Link eventKey="link-1">모집중</Nav.Link>
              </Nav.Item>

              <Nav.Item className='tabs'>
                <Nav.Link eventKey='link-2'>모집완료</Nav.Link>
              </Nav.Item>

             
                <Button className='write'>글쓰기</Button>
              
            </Nav>
            
              <form>
              <input className='search_box' placeholder='지역검색'/>
              <input className='search_box' placeholder='검색창'/>
              <input className='search_box' placeholder='태그검색'/>
              <button type='submit' className='submit'>검색</button>
              </form>
            
          </div>

          <div className='order'>
            <Button>최신순</Button>
            <Button className='good_button'>좋아요순</Button>
            <Button>댓글많은순</Button>
          </div>

         
              
              
              {
                postTitle.map((a,i)=>{
                  return(
                    <div className='post'>
                      <div className='post-container'>
                        <div className='status'>{ status[i] === true ? "모집중" : "모집완료"}</div>
                        <div className='title'>{postTitle[i]}</div>
                        <div className='content'>{post[i]}</div>
                        <div className='comment'>
                          댓글은 오른쪽
                        </div>
                      </div>
                    </div>
                  );
                })
              }
        </div>
        
      </div>
    </div>
  );
}

export default Community;
