import React from 'react';
import{ useParams } from 'react-router-dom';

function Studying(props){
    let {studyName}  = useParams();
    props.setHeader(studyName);

    return(
        <div>
            <div>hi</div>
        </div>
    );
}

export default Studying;