import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { loginCheck } from "../../store/actions/userActions";
import { electioninfo } from "../../store/actions/electionActions";

function Electionitem({item}){
    // const { isLogin } = useSelector(state=>state.user)
    // const { electionloading, electionlist} = useSelector(state=>state.election)

    // const dispatch = useDispatch()

    // if (!isLogin){
    //     if(localStorage.getItem("accessToken")!==null){
    //         dispatch(loginCheck())
    //     }
    // }

    // useEffect(()=>{
    //     if(!electionloading){
    //         dispatch(electioninfo())
    //     }
    // },[])

    return(
        <Link to={`/voteinfo/${item.id}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
        <div className="election-list">
            <div className="election-list-components">
                <span className="election-name">{item.name}</span>
                <span className="election-info">{item.info}</span>
                <span className="election-term">{item.startDate} ~ {item.endDate}</span>
            </div>
        </div>
        </Link>
    );

}
export default Electionitem;