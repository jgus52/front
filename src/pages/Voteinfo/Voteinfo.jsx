import React, { useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

function Voteinfo(){

    const { id } = useParams();

    const dispatch = useDispatch()

    const { isLogin } = useSelector(state=>state.user)
    const { electionloading, electionlist} = useSelector(state=>state.election)

    if (!isLogin){
        if(localStorage.getItem("accessToken")!==null){
            dispatch(loginCheck())
        }
    }

    useEffect(()=>{
        if(!electionloading){
            dispatch(electioninfo())
        }
    },[])
    
    const length = electionlist.length;

    return(
        <div className="voteinfo">
            <div className="election-name">투표 명: {electionlist[length-id].name} </div>
            <div className="election-info">투표 정보: {electionlist[length-id].info} </div>
            <div className="election-term">투표 기간: {electionlist[length-id].startDate} ~ {electionlist[length-id].endDate} </div>
        </div>
    );

}
export default Voteinfo;