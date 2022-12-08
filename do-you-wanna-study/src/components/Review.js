import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../css/Review.css';
import axios from "axios";


const Review = () => {
    const {study_id} = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState([]);
    const [content, setContent] = useState("");
    const [review,setReview] = useState([""]);
    const [skill, setSkill] = useState([0]);
    const [kindness, setKindness] = useState([0]);
    const [sincerity, setSincerity] = useState([0]);
    const [helpful, setHelpful] = useState([0]);
    
    useEffect(()=>{
        const review_get = async() =>{
            await axios.get(`http://43.200.6.177:8000/mystudy/detail/review?id=${study_id}`)
            .then((res)=>{
                setMember(res.data.data);
            })
            .catch((err)=>{console.log(err);})
        }
        review_get();
    },[])

    const review_create = async()=>{
        const evaluates = [];
        member.map((a,i)=>{
            return evaluates[i] = {userId:a.__user__.id, skill: skill[i],kindness:kindness[i],sincerity:sincerity[i],helpful:helpful[i],content:review[i]}
        })

        await axios.post(`http://43.200.6.177:8000/mystudy/detail/review?id=${study_id}`, {content: content, evaluates: evaluates})
        .then((res)=>{
            navigate(-1);
        })
        .catch((err)=>{console.log(err);})
    }

    return(
        <div className="review_body">
            <div className="review_container">
            <div className="review_name" >캡스톤 회고</div>
            <textarea placeholder="회고를 작성해주세요" className="review_box" onChange={(e)=>{setContent(e.target.value);}} />
            </div>

            {member.map((a,i)=>{
                return(
                    <div className="review_container" key={i}>
                        <div className="review_name">{a.__user__.nickname}님에 대한 평가</div>
                        <select onChange={(e)=>{skill[i] = e.target.value; setSkill(skill); }} value={skill}>
                                <option value=''>실력</option>
                            {[1,2,3,4,5].map((item) => (
                                <option value={item} key={item}>
                                {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e)=>{kindness[i] = e.target.value; setKindness(kindness);}} value={kindness}>
                                <option value=''>인성</option>
                            {[1,2,3,4,5].map((item) => (
                                <option value={item} key={item}>
                                {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e)=>{sincerity[i] = e.target.value; setSincerity(sincerity)}} value={sincerity}>
                                <option value=''>성실</option>
                            {[1,2,3,4,5].map((item) => (
                                <option value={item} key={item}>
                                {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e)=>{helpful[i]= e.target.value; setHelpful(helpful);}} value={helpful}>
                                <option value=''>도움</option>
                            {[1,2,3,4,5].map((item) => (
                                <option value={item} key={item}>
                                {item}
                                </option>
                            ))}
                        </select>
                        <textarea placeholder="내용을 작성해주세요" className="review_box" onChange={(e)=>{review[i]=e.target.value; setReview(review);}} />
                    </div>
                );
            })}
            <button className="left" onClick={()=>{navigate(-1)}}>취소</button>
            <button className="right" onClick={()=>{review_create()}}>회고등록</button>

        </div>
    );
}

export default Review;