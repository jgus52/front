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
    

    return(
        <div className="voteinfo">
        {
            electionlist.map(data=>{
                if(data.id == id){
                    return(
                        <>
                            <div className="election-name">투표 명: {data.name} </div>
                            <div className="election-info">투표 정보: {data.info} </div>
                            <div className="election-term">투표 기간: {data.startDate} ~ {data.endDate} </div>
                        </>
                    )
                }  
            })
        }
        </div>
    );

}
export default Voteinfo;