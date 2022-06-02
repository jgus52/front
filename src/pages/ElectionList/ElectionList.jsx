import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Electionitem from "./Electionitem";
import { electioncheckout } from "../../store/actions/electionActions";
import './ElectionList.scss'

function ElectionList({item}){

  const dispatch = useDispatch();
  const { iselection } = useSelector((state) => state.election);

  if (iselection) {
    dispatch(electioncheckout());
  }


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