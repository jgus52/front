import React from "react";
import { Link } from 'react-router-dom';

function Electionitem({item}){
    return(
        <Link to={`/voteinfo/${item.electionid}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
        <div className="election-list">
            <div className="election-list-components">
                <span className="election-name">{item.electionName}</span>
                <span className="election-info">{item.lectionInfo}</span>
                <span className="election-term">{item.startTime} ~ {item.endTime}</span>
            </div>
        </div>
        </Link>
    );

}
export default Electionitem;