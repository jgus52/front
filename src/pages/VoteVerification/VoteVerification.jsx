import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { myhash, allhash, sumhash } from "../../store/actions/hashlistActions";
import { useParams } from "react-router-dom";
import { electioncheck } from "../../store/actions/electionActions";
import { loginCheck } from "../../store/actions/userActions";
import './VoteVerification.scss'

const VoteVerification = () => {

    const { isLogin } = useSelector(state=>state.user)
    const { iselection } = useSelector((state) => state.election);
    const { myhashloading, myhashlist, allhashloading, allhashlist, sumhashloading, sumhashlist} = useSelector(state=>state.hashlist)
    const dispatch = useDispatch()
    const {id} = useParams();

    if(!isLogin){
        if(localStorage.getItem("accessToken")!==null){
            dispatch(loginCheck())
        }
    }

    if (!iselection) {
        dispatch(electioncheck());
    }

    useEffect(()=>{
        if(!sumhashloading){
            dispatch(sumhash(id))
        }

        if(!myhashloading){
            dispatch(myhash(id))
        }

        if(!allhashloading){
            dispatch(allhash(id))
        }
        
    },[])

    return (
        <>
            <div>
                <div className="hash-list-title">
                    <p className="hash-site-name">전체 합산 해쉬 주소</p>
                    <p className="hash-site-sub">(해당 투표의 모든 암호문을
                        <Link to={{ pathname: "https://github.com/snucrypto/HEAAN" }} target="_blank" style={{ textDecoration: 'none',  color: 'inherit', fontWeight: "bold"}}>
                            <span>동형 알고리즘(HEAAN)</span>
                        </Link> 
                        을 이용하여 합산한 암호문 입니다.)</p>
                </div>  
                <div className="hash-list">
                    <div className="hash-list-components">
                        <a className="hash-site" target="_blank" href={`https://gateway.pinata.cloud/ipfs/${sumhashlist.hashsite}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
                            <span >https://gateway.pinata.cloud/ipfs/{sumhashlist.hashsite}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div>
                <div className="hash-list-title">
                    <p className="hash-site-name2">사용자가 투표한 해쉬 주소</p>
                </div>  
                <div className="hash-list">
                    <div className="hash-list-components">
                        <a className="hash-site" target="_blank" href={`https://gateway.pinata.cloud/ipfs/${myhashlist.ballotHash}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
                            <span >https://gateway.pinata.cloud/ipfs/{myhashlist.ballotHash}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div>
                <div className="hash-list-title">
                    <p className="hash-site-name2">전체 투표 해쉬 주소</p>
                </div>  
                <div className="hash-list">
                    {
                        allhashlist.map((allhashlist,index)=>{
                            return (
                                <div key={index}>
                                    <div className="hash-list-components">
                                        <a className="hash-site" target="_blank" href={`https://gateway.pinata.cloud/ipfs/${allhashlist.BallotHash}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
                                            <span>https://gateway.pinata.cloud/ipfs/{allhashlist.BallotHash}</span>
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="help">
                <span>관련 정보 확인하러 가기</span>
                <Link to={{ pathname: "https://github.com/UOSVOTE/Back" }} target="_blank" style={{ textDecoration: 'none',  color: 'inherit'}}>
                    <span>(https://github.com/UOSVOTE/Back)</span>
                </Link>
            </div>

        </>
    );
  }
  
  export default VoteVerification;
