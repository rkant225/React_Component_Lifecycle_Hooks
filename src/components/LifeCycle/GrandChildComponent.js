//GrandChildComponent
import React from 'react';

class GrandChildComponent extends React.Component{
    constructor(props){
        console.log('GRAND_CHILD constructor')
        super(props);
        this.state={toy : 'toy_car', fruit : 'banana', booleanValue : false, planets : ['mercury', 'veneus', 'earth', 'mars']}
        this.planetThreadRef = React.createRef();
    }

    handleAddPlanet=()=>{
        this.setState({planets : [...this.state.planets, `Planet ${Math.random()}`]})
    }

    static getDerivedStateFromProps(props, state){ // must be static
        console.log('GRAND_CHILD getDerivedStateFromProps')
        //console.log('PROPS',props, 'STATE',state)
        // return {fruit : props.fruit}; // Be carefull this will update the "fruit" propertyby the value comming from props.
        return null; // return "null" if you don't want any changes
    }

    componentDidMount(){
        console.log('GRAND_CHILD componentDidMount')
        //setTimeout(()=>this.setState({booleanValue : true}),4000)
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('GRAND_CHILD shouldComponentUpdate');
        // return false; // component's render method will not be called 
        return true; // component's render method will be called 
    }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('GRAND_CHILD getSnapshotBeforeUpdate');
        if(prevState.planets.length < this.state.planets.length){
            const planetThreadRef  = this.planetThreadRef.current;
            return {toBeScrolled : planetThreadRef.scrollHeight - planetThreadRef.scrollTop}
        }
        return null;
        
    }

    componentDidUpdate(prevProps,prevState,snapShot){
        console.log('GRAND_CHILD componentDidUpdate');
        if(snapShot && snapShot.toBeScrolled){
            const planetThreadRef  = this.planetThreadRef.current;
            planetThreadRef.scrollTop = planetThreadRef.scrollHeight - snapShot.toBeScrolled
        }
    }
    

    render(){
        console.log('GRAND_CHILD render')
        return(
            <div>
                GrandChildComponent 
                <br/>
                {this.state.booleanValue ? "TRUE" : "FALSE"}
                <br/>
                <button onClick={()=>this.setState({booleanValue : !this.state.booleanValue})}>Toggle boolean state</button>
                <br/>                
                {"**************************************"} 
                <div className="planetBox" ref={this.planetThreadRef}>
                    <ul>
                        {this.state.planets.map(pl => <li key={pl}>{pl}</li>)}
                    </ul>
                </div>
                <button onClick={this.handleAddPlanet}>Add planet</button>
            </div>
        );
    }
}

export default GrandChildComponent;
