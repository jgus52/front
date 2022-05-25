import React, {useEffect, useState} from "react"
import Concept from '../../img/concept.png'
import ElectionList from '../ElectionList/ElectionList';
import { useSelector, useDispatch } from "react-redux";

import './Main.scss'
import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

const Main = () => {
    const { isLogin } = useSelector(state=>state.user)
    const { electionloading, electionlist} = useSelector(state=>state.election)
    const [ list, setlist] = ('')

    const dispatch = useDispatch()

    if(!isLogin){
        if(localStorage.getItem("accessToken")!==null){
            dispatch(loginCheck())
        }
    }

    useEffect(()=>{
        if(!electionloading){
            dispatch(electioninfo())
        }
    },[])

    // useEffect(()=>{
    //     if(testlist !==null && testlist !== undefined){
    //         setlist(true)
    //     }
    //     else{
    //         setlist(false)
    //     }
    //     console.log(list);
    // },[])

    const testlist = [
        {
            id:1,
            name: "testvoteValidity1",
            info: "check if well done for createElection Function with Validity check",
            startDate: "2022-05-01 06:00:00",
            endDate: "2022-05-02 06:00:00",
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
            id:2,
            name: "testvoteValidity2",
            info: "check if well done for createElection Function with Validity check",
            startDate: "2022-05-01 06:00:00",
            endDate: "2022-05-02 06:00:00",
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
            id:3,
            name: "testvoteValidity3",
            info: "check if well done for createElection Function with Validity check",
            startDate: "2022-05-01 06:00:00",
            endDate: "2022-05-02 06:00:00",
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
            id:4,
            name: "testvoteValidity1",
            info: "check if well done for createElection Function with Validity check",
            startDate: "2022-05-01 06:00:00",
            endDate: "2022-05-02 06:00:00",
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

    console.log(testlist.length);

    return (
        <div>
            {isLogin&&
                (<div className="main-page">
                    <div className="conceptimage">
                        <img className="concept" src={Concept} />
                    </div>
                </div>)  
            }
            {!isLogin&&
                (<div className="election-container">
                    <div className="election-title">
                        <p className="election-name">투표 명</p>
                        <p className="election-info">투표 정보</p>
                        <p className="election-date">투표 기간</p>
                    </div>

                    {(testlist.length == 0)&&
                        (<div className="election-list-none">
                            <p>참여 가능한 투표 목록이 없습니다.</p>
                        </div>)
                    }

                    {(testlist.length > 0)&&
                        (<div className="election-list">
                            <ElectionList item = {testlist}/>
                        </div>)
                    }   
                </div>)
            }
             
        </div>
    );
}

export default Main;