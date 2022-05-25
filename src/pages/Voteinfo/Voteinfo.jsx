import React, { useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

function Voteinfo(){

    const { id } = useParams();

    const dispatch = useDispatch()

    // const { isLogin } = useSelector(state=>state.user)
    const { electionloading, electionlist} = useSelector(state=>state.election)


    // if (!isLogin){
    //     if(localStorage.getItem("accessToken")!==null){
    //         dispatch(loginCheck())
    //     }
    // }

    useEffect(()=>{
        if(!electionloading){
            dispatch(electioninfo())
        }
    },[])
    
    const length = electionlist.length;
    console.log(length);
    const length2 = electionlist[length-id].candidates.length;
    console.log(length2);

    const testlist = [
        {
            electionid:1,
            electionName: "testvoteValidity1",
            lectionInfo: "check if well done for createElection Function with Validity check",
            startTime: "2022-05-01 06:00:00",
            endTime: "2022-05-02 06:00:00",
            candidates: [{
                number:1,
                profile: "profileURL",
                promise: "prmoise for test cnadidates"
            },
            {
                number:2,
                profile: "profileURLFor2",
                promise: "prmoise for test cnadidates"
            }]
        },
        {
            electionid:2,
            electionName: "testvoteValidity2",
            lectionInfo: "check if well done for createElection Function with Validity check",
            startTime: "2022-05-01 06:00:00",
            endTime: "2022-05-02 06:00:00",
            candidates: [{
                number:1,
                profile: "profileURL",
                promise: "prmoise for test cnadidates"
            },
            {
                number:2,
                profile: "profileURLFor2",
                promise: "prmoise for test cnadidates"
            }]
        },
        {
            electionid:3,
            electionName: "testvoteValidity3",
            lectionInfo: "check if well done for createElection Function with Validity check",
            startTime: "2022-05-01 06:00:00",
            endTime: "2022-05-02 06:00:00",
            candidates: [{
                number:1,
                profile: "profileURL",
                promise: "prmoise for test cnadidates"
            },
            {
                number:2,
                profile: "profileURLFor2",
                promise: "prmoise for test cnadidates"
            }]
        },
        {
            electionid:4,
            electionName: "testvoteValidity4",
            lectionInfo: "check if well done for createElection Function with Validity check",
            startTime: "2022-05-01 06:00:00",
            endTime: "2022-05-02 06:00:00",
            candidates: [{
                number:1,
                profile: "profileURL",
                promise: "prmoise for test cnadidates"
            },
            {
                number:2,
                profile: "profileURLFor2",
                promise: "prmoise for test cnadidates"
            }]
        },
      ]

    return(
        <div className="voteinfo">
            <div className="election-name">투표 명: {electionlist[length-id].name} </div>
            <div className="election-info">투표 정보: {electionlist[length-id].info} </div>
            <div className="election-term">투표 기간: {electionlist[length-id].startDate} ~ {electionlist[length-id].endDate} </div>
            {/* <div className="election-term">후보자 번호: {electionlist[length-1].candidates[length2-1].candidateNumber} </div>
            <div className="election-term">후보자 이름: {electionlist[length-1].candidates[length2-1].candidateName} </div>
            <div className="election-term">후보자 정보: {electionlist[length-1].candidates[length2-1].profile} </div>
            <div className="election-term">후보자 공략: {electionlist[length-1].candidates[length2-1].promise} </div> */}
        </div>
    );

}
export default Voteinfo;