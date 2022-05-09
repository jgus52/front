import React from "react"
import Concept from '../../img/concept.png'

import './Main.scss'

const Main = () => {
    return (
        <div className="main-page">
            <div className="conceptimage">
                <img className="concept" src={Concept} />
            </div>
        </div>  
    )
}

export default Main