import React from 'react' ;
import {useSelector} from "react-redux" ;
import Home from '../../page/home/Home';

const Dashboard = () => {
    const user = useSelector(state => state.authReducer.user)
    
    if(!user)
    {
        return <h1>Waiting ...</h1>
    }
    return (
        <div>
            <Home />
            
        </div>
    )
}

export default Dashboard




