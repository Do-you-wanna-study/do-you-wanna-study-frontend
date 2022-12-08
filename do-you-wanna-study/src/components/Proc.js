import React from 'react';
import '../css/Proc.css';

function Proc(props){
    return( props.status === "recruiting" ? <div className='proc'>모집중</div> : <div className='done'>모집완료</div>);
}

export default Proc;