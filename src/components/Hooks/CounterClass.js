import React from 'react';
import {useState} from 'react';
import usePrevious from './usePrevious';

class CounterClass extends React.Component {
    
    state={count : 0}

    componentDidUpdate(p,oldState){
        console.log('NEW COUNT : ',this.state.count, 'OLDCOUNT', oldState.count)

    }

    render(){
        console.log('I am rendered.')
        return(
            <div>
                COUNT : {this.state.count}
                <br/>
                <button onClick={()=>this.setState({count : this.state.count + 1})}>Increment</button>
                <button onClick={()=>this.setState({count : this.state.count - 1})}>Decrement</button>
                <button onClick={()=>this.setState({count : 1})}>Reset</button>
            </div>
        );
    }
}

export default CounterClass;