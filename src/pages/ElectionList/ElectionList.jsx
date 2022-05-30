import React from "react";
import Electionitem from "./Electionitem";
import './ElectionList.scss'

function ElectionList({item}){
  return (
    <div className="election-list">
      {
        item.map(item=>{
          return (<Electionitem item = {item}/>)
        })
      }
    </div>
  );
}
  
export default ElectionList;