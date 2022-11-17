import React, { useState } from 'react';
import '../css/Create.css';
import '../App.css';
import { Routes,Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Create1 from './Create1';
import Create2 from './Create2';

function Create(){
    let navigate = useNavigate();
    let [title,setTitle] = useState('');
    let [recruitment,setRecruitment] = useState(0);
    let [region,setRegion] = useState('');
    let [description, setDescription] = useState('');
    let [tag,setTag] = useState([]);
    let [community_id,setCommunity_id] = useState(-1);

    const nowTime = new Date();

    

    const onClick = ()=>{
         axios.post('http://43.200.6.177:8000/recruitment',{title : title,description : description, deadline : nowTime,region : region, recruitment_number : recruitment, hashtag: tag,community_id : community_id})
        .then((res)=>{
            console.log(res.data.data);
            return navigate(-1)
        }).catch((err)=>{console.log(err);})
        }

    
    

    return(
        <div className='body'>
            <Routes>
                <Route path='/create' element={<Create1 setTtle={setTitle} setTag={setTag} setDescription={setDescription}/>}/>
                <Route path='/create2' element={<Create2 onClick={onClick} setRegion={setRegion} setRecruitment={setRecruitment}/>}></Route>
            </Routes>
            
        </div>
    );

}

export default Create;