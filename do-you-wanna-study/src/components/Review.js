import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../css/Review.css';
import axios from "axios";

const Review = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const review_create = async() =>{
            console.log("록로고그그그그그");
            await axios.get("http://43.200.6.177:8000/mystudy/detail/review?id="+id)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{console.log(err);})
        }
        review_create();
    },[id])
       

    return(
        <div className="review_body">
            <div className="review_container">
            <div className="review_name" >캡스톤 회고</div>
            <textarea placeholder="회고를 작성해주세요" className="review_box" />
            </div>

            <div className="review_container">
            <div className="review_name">박정훈님에 대한 평가</div>
            <select>
                <option value='' selected>-- 실력 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected>-- 인성 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected>-- 성실 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected>-- 도움 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <textarea placeholder="내용을 작성해주세요" className="review_box" />
            </div>

            <div className="review_container">
            <div className="review_name">장민혁님에 대한 평가</div>
            <select>
                <option value='' selected >-- 실력 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected >-- 인성 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected disabled>-- 성실 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected disabled>-- 도움 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <textarea placeholder="내용을 작성해주세요" className="review_box" />
            </div>

            <div className="review_container">
            <div className="review_name">박호동님에 대한 평가</div>
            <select>
                <option value='' selected disabled>-- 실력 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected disabled>-- 인성 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected disabled>-- 성실 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <select>
                <option value='' selected disabled>-- 도움 --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <textarea placeholder="내용을 작성해주세요" className="review_box" />
            </div>

            

        </div>
    );
}

export default Review;