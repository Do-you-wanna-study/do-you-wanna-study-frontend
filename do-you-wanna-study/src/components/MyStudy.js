import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function MyStudy(){
    const [open,setOpen] = useState([['중앙대f4',16, 8,'서울특별시 동작구'],['철산역React',16,4, '경기도 광명시']]);
    const [secret,setSecret] = useState([['취뽀해보자구',16 ,8,'중앙대학교'],['디자인패턴스터디',16,6,'우아한형제들']])
    let url;
    let navigate = useNavigate(url);
    return(
    <div>
        <div className="open_myStudy">
            <span>공개스터디</span><hr/>
            { open.map((a)=>{
                return(
                    <div>
                        <div>
                            <div onClick={ ()=>{ url = `/mystudy/${a[0]}`; navigate(url);} }>{a[0]}</div>
                            <div>{a[1]}</div>
                        </div>
                        <div className="study_region">
                            {a[3]}
                        </div>
                        <hr/>
                    </div>
                );
            })}
        </div>
        <div className="secret_myStudy"></div>
        { secret.map((a)=>{
                return(
                    <div>
                        <div>
                            <div>{a[0]}</div>
                            <div>{a[1]}</div>
                        </div>
                        <div className="study_region">
                            {a[3]}
                        </div>
                        <hr/>
                    </div>
                );
            })}
    </div>
    );

}

export default MyStudy;