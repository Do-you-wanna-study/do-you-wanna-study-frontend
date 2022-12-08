import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/Community.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowDown,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Proc from "./Proc";
import Tag from "./Tag";

function Community(props) {

  var isEmpty = function(value){
    if( value === "" || value == null || value === undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
      return true
    }else{
      return false
    }
  };

  let navigate = useNavigate();
  const [post, setPost] = useState([{}]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(false);
  const [region, setRegion] = useState(false);
  const [secret, setSecret] = useState([
    "중앙대학교",
    "선린 인터넷고",
    "철산역React",
  ]);
  const [community, setCommunity] = useState(false);
  const {community_id} = useParams();
  const [filter,setFilter] = useState(0);


  const createClick = () => {
    navigate("/create/"+ community_id);
  };

  useEffect(() => {
    const postData = async () => {
      await axios
        .get("http://43.200.6.177:8000/recruitment")
        .then((res) => {
          setPost(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    postData();
  }, []);

  const searchClick = async() => {
      await axios.get("http://43.200.6.177:8000/recruitment?search="+search,{headers:{community:1, pageno:1}})
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err)=>{console.log(err);})
     
  };

  // const status = async() => {
  //   await axios.get(`http://43.200.6.177:8000/recruitment/community/1/${params}`)
  //   .then((res)=>{setPost(res.data.data);
  //   console.log(res.data.data);})
  //   .catch((err)=>{console.log(err);})
  // }

  return (
    <div className="community-warpper">
      <div className="community-header">커뮤니티</div>
      <div className="community-body">
        <div className="side-menu">
          <div className="left-bar">
            <div className="search">
              <input
                className="search_box"
                placeholder="검색"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button><FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                size="xs"
                onClick={()=>{searchClick()}}
              /></button>
            </div>
            <div className="category-wrapper">
              <div className="category">
                <span className="category-title">분야</span>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  onClick={() => {
                    setCategory(!category);
                  }}
                ></FontAwesomeIcon>
              </div>
              {category && (
                <div className="sub-category">
                  <div className="row">
                    <input
                      type="checkbox"
                      name="category"
                      value="computer"
                      id="computer"
                    />
                    <label for="computer"> 개발</label>
                  </div>
                  <div className="row">
                    <input
                      type="checkbox"
                      name="category"
                      value="marketing"
                      id="marketing"
                    />
                    <label for="marketing">마켓팅</label>
                  </div>
                  <div className="row">
                    <input
                      type="checkbox"
                      name="category"
                      value="english"
                      id="english"
                    />
                    <label for="english">영어</label>
                  </div>
                </div>
              )}
              <div className="category">
                <span className="category-title">지역</span>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  onClick={() => {
                    setRegion(!region);
                  }}
                ></FontAwesomeIcon>
                {region && (
                  <div className="category-checkbox">
                    <input type="checkbox" name="region" value="all" />
                    <label for='all'>전체 지역</label>
                    <input type="checkbox" name="region" value="my-position" />
                    <lagel for='location'>내 위치 근처</lagel>
                  </div>
                )}
              </div>
              <div className="category">
                <span className="category-title">커뮤니티</span>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  onClick={() => {
                    setCommunity(!community);
                  }}
                ></FontAwesomeIcon>
                {community && (
                  <div className="category-checkbox">
                    {secret.map((a) => {
                      return (
                        <>
                          <input type="checkbox" name="community" value="" />
                          {a}
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="recruitment-body">
          <div className="status-bar">
            <div className="status-wrapper">
              <div className="status" onClick={()=>{}}>전체</div>
              <div className="status" onClick={()=>{}}>모집중</div>
              <div className="status" onClick={()=>{}}>모집완료</div>
            </div>
            <div className="recruitment-sort">
              {props.login && (
                <button className="create" onClick={createClick}>
                  <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>글쓰기
                </button>
              )}
              <select>
                <option value="latest">최신순</option>
                <option value="comment">댓글많은순</option>
              </select>
            </div>
          </div>
          <div className="recruitment">
            {post
              .map((a,i) => {
                return (
                  <div className="post-area" key={i}>
                    <div className="post">
                      <div className="post-top">
                        <Proc status={a.status}/>
                        <button className="post-title" onClick={()=>{navigate("/recruitmentPost/"+community_id+"/"+a.id)}}> {a.title}</button>
                      </div>
                      <div className="post-content" onClick={()=>{navigate("/recruitmentPost/"+community_id+"/"+a.id)}}> {a.description}</div>
                      <div className="tags">
                        { 
                         isEmpty(a.recruitmentToTagList) ? null : a.recruitmentToTagList?.map((x,i)=>{return(<Tag tag={x.__tag__.name} key={i}/>);}) 
                        }
                      </div>
                      <div className="post-bottom">
                        <div className="writer">{a.__author__?.nickname}</div>
                        <div className="writer">{a.deadline}</div>
                      </div>
                    </div>
                    <div className="comment-area">
                      <div className="comment">
                        <span className="comment-length">
                          {a.recruitmentCommentList?.length}
                        </span>
                        <span className="comment-content">댓글</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
