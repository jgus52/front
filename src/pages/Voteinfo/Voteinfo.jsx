import React, { useEffect} from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// import { electioninfo } from "../../store/actions/electionActions";

function Voteinfo(){

    const { id } = useParams();

    // const dispatch = useDispatch()
    // const { electionloading, electionlist} = useSelector(state=>state.election)


    // useEffect(()=>{
    //     if(!electionloading){
    //         dispatch(electioninfo())
    //     }
    // },[])

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
            <div className="election-name">투표 명: {testlist[id-1].electionName} </div>
            <div className="election-info">투표 정보: {testlist[id-1].lectionInfo} </div>
            <div className="election-term">투표 기간: {testlist[id-1].startTime} ~ {testlist[id-1].endTime} </div>
            <div className="election-term">후보자 번호: {testlist[id-1].candidates[id-1].number} </div>
            <div className="election-term">후보자 정보: {testlist[id-1].candidates[id-1].profile} </div>
            <div className="election-term">후보자 공략: {testlist[id-1].candidates[id-1].promise} </div>
        </div>
    );

}
export default Voteinfo;