//ChildComponent
import React from 'react';
import GrandChildComponent from './GrandChildComponent';
class ChildComponent extends React.Component{
    constructor(props){
        console.log('CHILD constructor')
        super(props);
        this.state={toy : 'toy_car', fruit : 'banana',booleanValue : false, planets : [], displayGrandChild : false}
    }

    static getDerivedStateFromProps(props, state){ // must be static
        console.log('CHILD getDerivedStateFromProps')
        //console.log('PROPS',props, 'STATE',state)
        // return {fruit : props.fruit}; // Be carefull this will update the "fruit" propertyby the value comming from props.
        return null; // return "null" if you don't want any changes
    }

    componentDidMount(){
        console.log('CHILD componentDidMount')
        setTimeout(()=>this.setState({booleanValue : true}),3000)
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('CHILD shouldComponentUpdate');
        // return false; // component's render method will not be called 
        return true; // component's render method will be called 
    }

    handleButtonClick=()=>{
        this.setState(
            {
                booleanValue : !this.state.booleanValue,
            })
    }

    render(){
        console.log('CHILD render')
        return(
            <div>
                ChildComponent
                <br/>
                {this.state.fruit}
                <br/>
                {this.state.toy}
                <br/>
                {this.state.booleanValue ? "TRUE" : "FALSE"}
                <br/>
                <button onClick={()=>this.handleButtonClick()}>Toggle boolean state</button>
                <br/>
                {"**************************************"}
                <br/>
                <button onClick={() => this.setState({displayGrandChild : !this.state.displayGrandChild})}>{this.state.displayGrandChild ? "Hide GrandChild" : "Show GrandChild"}</button>
                {this.state.displayGrandChild && <GrandChildComponent dumyProp={"dummyProp"}/>}
            </div>
        );
    }
}

export default ChildComponent;
