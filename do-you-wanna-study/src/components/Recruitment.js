import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Proc from './Proc.js';
import '../css/Recruitment.css';
import Tag from './Tag.js';


function Recruitment(props){
    const [recruitment, setRecruitment] = useState({});
    const {recruitment_id} = useParams();
    const {community_id} = useParams();
    const [commentList,setCommentList] = useState([{}]);
    const [comment,setComment] = useState("");
    const navigate = useNavigate();

    const commentCreate = ()=>{
        let config = {
            headers: {
              id: recruitment_id
            }
          }
        const postData = async() => {
            await axios.post(`http://43.200.6.177:8000/recruitment/detail/comment?id=${recruitment_id}`, {content: comment}, config)
            .then((res)=>{
                console.log(res.data.data);
            }).catch((err)=>{console.log(err);})
        }
        props.login ? postData() : navigate('/login')
    }

    const apply = () => {
        props.setRecruitment(recruitment);
        props.login ? navigate('/recruitmentPost/'+community_id+"/"+recruitment_id+"/applying") : navigate('/login')
    }

    const applyed = () =>{
        props.setRecruitment(recruitment);
        navigate('/recruitment/'+recruitment_id+"/applyed");
    }
    

    useEffect(() => {
        const getData = async() => {
            await axios.get(`http://43.200.6.177:8000/recruitment/detail?id=${recruitment_id}`)
            .then((res) => {
                setRecruitment(res.data.data);
             })
            .catch((err)=>{console.log(err);})
        }
        getData();
    }, []);

    return(
        <>
            <div className='recruitment_header'>
                <div className='recruitment_titlebar'>
                    <Proc status={recruitment.status}/>
                    <div className='recruitment_title'>{recruitment.title}</div>
                    {recruitment.__author__?.nickname === props.user?.nickname 
                    ? <button className='recruitment_apply' onClick={applyed}>지원서확인</button> 
                    : <button className='recruitment_apply' onClick={apply}>지원하기</button>}
                </div>
                <div className='recruitment_writerbar'>
                    <div className='recruitment_writer'>{recruitment.__author__?.nickname}</div>
                    <div className='recruitment_createDate'>{recruitment.__author__?.createdAt}</div>
                </div>
                <div className='recruitment_subcategory'>
                    <div className='recruitment_subtitle'>분야</div>
                    <div className='recruitment_subcontent'>개발</div>
                </div>
                <div className='recruitment_subcategory'>
                    <div className='recruitment_subtitle'>지역</div>
                    <div className='recruitment_subcontent'>{recruitment.region}</div>
                </div>
                <div className='recruitment_subcategory'>
                    <div className='recruitment_subtitle'>인원</div>
                    <div className='recruitment_subcontent'>{recruitment.recruitmentNumber}명</div>
                </div>
            </div>    
            <div className='recruitment_body'>{recruitment.description}</div>
            <div className='recruitment_footer'>
                <div className='recruitment_tags'>
                    {recruitment.recruitmentToTagList?.map((a,i)=>{
                        return (<div className='recruitment_tag' key={i}><Tag tag={a.__tag__.name}/></div>);
                    })}
                    <div className='recruitment_commentNumber'>
                        <img className='comment_logo' src={process.env.PUBLIC_URL+ '/Vector.png'} alt='comment'/>
                        댓글 {recruitment.recruitmentCommentList?.length}
                    </div>
                </div>
                <div className='recruitment_commentContainer'>
                    <div className='recruitment_flexBox'>
                        <textarea className='recruitment_commentBox' placeholder='댓글을 작성해주세요' value={comment} onChange={(e)=>{setComment(e.target.value)}}></textarea>
                        <button className='recruitment_commentCreate' onClick={()=>{commentCreate()}}>등록</button>
                    </div>
                    { recruitment.recruitmentCommentList?.map((a,i)=>{
                        return(
                            <div className='recruitment_comment' key={i}>
                                <div className='comment_title'>{a.__user__?.nickname}</div>
                                <div className='comment_date'>{a.createdAt.split('T')[0]}</div>
                                <div className='comment_content'>{a.content}</div>
                            </div>
                        );
                    })
                    }
                    
                </div>
            </div>
        </>
    );
}
    

export default Recruitment;