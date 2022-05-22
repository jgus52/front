import React, {useEffect} from "react"
import Concept from '../../img/concept.png'
import ElectionList from '../ElectionList/ElectionList';
import { useSelector, useDispatch } from "react-redux";

import './Main.scss'
import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

const Main = () => {
    const { isLogin } = useSelector(state=>state.user)
    const { electionloading, electionlist} = useSelector(state=>state.election)

    const dispatch = useDispatch()

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

    return (
        <div>
            {!isLogin&&
                (<div className="main-page">
                    <div className="conceptimage">
                        <img className="concept" src={Concept} />
                    </div>
                </div>)  
            }
            {isLogin&&
                (<div className="election-container">
                    <div className="election-title">
                        <p className="election-name">투표 명</p>
                        <p className="election-info">투표 정보</p>
                        <p className="election-date">투표 기간</p>
                    </div>
                    <div className="election-list">
                        <ElectionList item = {electionlist}/>
                    </div>
                    {/* <div className="election-list-none">
                        <p> </p>
                    </div> */}
                </div>)
            }
             
        </div>
    );
}

export default Main;