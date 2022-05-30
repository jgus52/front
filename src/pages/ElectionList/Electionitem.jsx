import React from "react"
import { Link } from 'react-router-dom';
import moment from 'moment';

function Electionitem({item}){
    
    return(
        <Link to={`/voteinfo/${item.id}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
            <div className="election-list-components">
                <span className="election-name">{item.name}</span>
                <span className="election-info">{item.info}</span>
                <span className="election-term">{moment(item.startDate).format("yyyy/MM/DD h:mm a")} ~ {moment(item.endDate).format("yyyy/MM/DD h:mm a")}</span>
            </div>
        </Link>
    );
}
export default Electionitem;