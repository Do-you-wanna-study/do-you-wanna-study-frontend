import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/Community.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  let navigate = useNavigate();
  const [post, setPost] = useState([{}]);
  // const [post,setPost] = useState([
  // {title : "중앙대학교 6p/매주 토요일 모각코", description : "박정훈 박호동 장민혁의 캡스톤 스터디를 도와주실 분 급구 디자이너 급해요", status : 'proc', recruitmentToTagList : ["상도","박정훈","박호동","장민혁","캡스톤디자인"], writer : 'hodongpark', deadline : '마감 3일전', comment : 3}
  // ,{title :"토익 990목표/격주 일요일 6시", description : "토익 만점으로 영어 부실 사람 드루와", status : 'done', tag : ["토익","영어","외국어","유학","시험"], writer : 'jeonghoonpark', deadline : '마감 2일전', comment : 5}]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(false);
  const [region, setRegion] = useState(false);
  const [secret, setSecret] = useState([
    "중앙대학교",
    "선린 인터넷고",
    "철산역React",
  ]);
  const [community, setCommunity] = useState(false);
  const location = useLocation();

  const {community_id} = useParams();

  const createClick = () => {
    navigate("/create/"+ community_id);
  };

  useEffect(() => {
    const postData = async () => {
      await axios
        .get("http://43.200.6.177:8000/recruitment/1")
        .then((res) => {
          setPost(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    postData();
  }, []);

  const searchClick = async () => {
    await axios
      .post("http://43.200.6.177:8000/recruitment/1/all", search)
      .then((res) => {
        if (res.data.status == "ok") {
          axios.get("http://43.200.6.177:8000/recruitment/1/all", { search });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                size="xs"
                onClick={searchClick}
              />
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
                    전체 지역
                    <input type="checkbox" name="region" value="my-position" />
                    내 위치 근처
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
              <div className="status">전체</div>
              <div className="status">모집중</div>
              <div className="status">모집완료</div>
            </div>
            <div className="recruitment-sort">
              {props.login && (
                <div className="create" onClick={createClick}>
                  <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>글쓰기
                </div>
              )}
              <select>
                <option value="latest">최신순</option>
                <option value="comment">댓글많은순</option>
              </select>
            </div>
          </div>
          <div className="recruitment">
            {post
              .concat(post)
              .concat(post)
              .map((a,i) => {
                return (
                  <div className="post-area" key={i}>
                    <div className="post">
                      <div className="post-top">
                        <Proc />
                        <div className="post-title">{a.title}</div>
                      </div>
                      <div className="post-content">{a.description}</div>
                      <div className="tags">
                        <Tag tag={"test"} />
                        <Tag tag={"test"} />
                        <Tag tag={"test"} />
                        <Tag tag={"test"} />
                        <Tag tag={"test"} />
                        {/* {a.recruitmentToTagList.map((x)=>{
                  return(
                    <Tag tag={x}/>
                  );
                })} */}
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
