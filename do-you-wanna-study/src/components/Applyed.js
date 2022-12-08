import React, { useEffect,useState } from "react";
import '../css/Applyed.css';
import '../App.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CreateStudy from "./CreateStudy.js";

const Applyed = (props) => {
    const {recruitment_id} = useParams();
    const [applyList,setApplyList] = useState([]);
    const [modal,setModal] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const readApply = async()=>{
            await axios.get("http://43.200.6.177:8000/recruitment/detail/readapply?id="+recruitment_id)
            .then((res)=>{
                setApplyList(res.data.data);
                console.log(res.data.data);
            })
            .catch((err)=>{console.log(err);})
        }
        readApply();
    },[])

    const applyAdmit = (id) =>{
        const admit = async() =>{
            await axios.patch("http://43.200.6.177:8000/recruitment/detail/accept?id="+id,)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{console.log(err);})
        }
        admit();
    }
    

    return(
        <div className="mypage_apply">
            {modal && <CreateStudy recruitment_id={recruitment_id}/>}
            <div className="status-wrapper">
                <div className="status">지원중</div>
                <div className="status">모집중</div>
                <button className="create_study" onClick={()=>{setModal(!modal)}}>스터디 생성</button>
            </div>
            {applyList.map((a,i)=>{
                return(
                    <div className="apply_name" key={i}>
                        <div className="study_name">{a.content}</div>
                        <div className="study_writer"><button onClick={()=>{navigate(`/applicant/${a.__user__.nickname}`)}}>{a.__user__?.nickname}</button></div>
                        <div className="study_deadline">{a.createdAt}</div>
                        <button className="admit" onClick={()=>{applyAdmit(a.id)}}>지원서 수락</button>
                    </div>
                );
            })} 
        </div>
    );
}

export default Applyed;