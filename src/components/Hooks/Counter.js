import React from 'react';
import {useState} from 'react';
import usePrevious from './usePrevious';

const Counter =(props)=>{
    console.log('I am rendered.')
    const [count, setCount] = useState(1);
    const oldCount = usePrevious(count);
    console.log('NEW COUNT : ',count, 'OLDCOUNT', oldCount);
    // this.count = count;
    return(
        <div>
            COUNT : {count}
            <br/>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <button onClick={()=>setCount(count-1)}>Decrement</button>
            <button onClick={()=>setCount(1)}>Reset</button>
        </div>
    );
}

export default Counter;