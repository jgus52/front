import React, { useEffect } from "react"
import Concept from '../../img/concept.png'
import ElectionList from '../ElectionList/ElectionList';
import { useSelector, useDispatch } from "react-redux";
import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

import './Main.scss'

const Main = () => {
    const { isLogin } = useSelector(state=>state.user)
    const { electionloading, electionlist} = useSelector(state=>state.election)

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

                    {(electionlist.length == 0)&&
                        (<div className="election-list-none">
                            <p>참여 가능한 투표 목록이 없습니다.</p>
                        </div>)
                    }

                    {(electionlist.length > 0)&&
                        (<div className="election-list">
                            <ElectionList item = {electionlist}/>
                        </div>)
                    }   
                </div>)
            }
             
        </div>
    );
}

export default Main;