//ErrorProducingComponent
import React from 'react';

class ErrorProducingComponent extends React.Component{
    componentDidMount(){
        console.log(this.props.dummy.toUpperCase()) // produces error, because we are accessing uppercase() on undefined value.
    }
    render(){
        return(
            <div>
               <h1>Error</h1>
            </div>
        );
    }
}

export default ErrorProducingComponent;