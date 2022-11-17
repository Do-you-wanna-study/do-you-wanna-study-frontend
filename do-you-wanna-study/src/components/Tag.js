import React from "react";
import '../css/Tag.css';

function Tag(props){
    return(
        <div className="tag">
            #{props.tag}
        </div>
    );
}

export default Tag;