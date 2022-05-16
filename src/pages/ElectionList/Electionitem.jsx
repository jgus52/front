import React from "react";

function Electionitem({item}){
    return(
        <div className="election-list">
            <div className="election-list-components">
                <span className="election-name">{item.electionName}</span>
                <span className="election-info">{item.lectionInfo}</span>
                <span className="election-term">{item.startTime} ~ {item.endTime}</span>
            </div>
        </div>
    );

}
export default Electionitem;