import React from 'react';
import ParentComponent from './LifeCycle/ParentComponent';
import Counter from './Hooks/Counter';
import CounterClass from './Hooks/CounterClass'
import './App.css'

class App extends React.Component{
    render(){
        return(
            <div>
               <ParentComponent/> 
               {/* <Counter/> */}
               {/* <CounterClass/> */}
            </div>
        );
    }
}

export default App;