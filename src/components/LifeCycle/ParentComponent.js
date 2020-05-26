//ParentComponent
import React from 'react';
import ChildComponent from './ChildComponent';
import ErrorBoundryHOC from './ErrorBoundryHOC';
class ParentComponent extends React.Component{

    constructor(props){
        console.log('PARENT constructor')
        super(props);
        this.state={fruit : 'mango', booleanValue : false}
    }

    static getDerivedStateFromProps(props, state){ // must be static
        console.log('PARENT getDerivedStateFromProps')
        return null; // return "null" if you don't want any changes
    }

    componentDidMount(){
        console.log('PARENT componentDidMount')
        console.log("******************MOUNTING PHASE END********************")
        console.log("******************UPDATING PHASE START********************")
        console.log('Time taken to fetch data || PARENT : 2 sec. || CHILD : 3 sec. || GRAND_CHILD : 4 sec.')
        setTimeout(()=>this.setState({booleanValue : true}),2000)
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('PARENT shouldComponentUpdate');
        //return false; // component's render method will not be called 
        return true; // component's render method will be called 
    }

    render(){
        console.log('PARENT render')
        return(
            <ErrorBoundryHOC>
                <div>
                    ParentComponent
                    <br/>
                    {this.state.booleanValue ? "TRUE" : "FALSE"}
                    <br/>
                    <button onClick={()=>this.setState({booleanValue : !this.state.booleanValue})}>Toggle boolean state</button>
                    <br/>
                    {"**************************************"}
                    <ChildComponent fruit={this.state.fruit}/>
                </div>
            </ErrorBoundryHOC>
        );
    }
}

export default ParentComponent;

// https://blog.logrocket.com/the-new-react-lifecycle-methods-in-plain-approachable-language-61a2105859f3/

// MOUNTING PHASE
    // 1. Constructor(props)
        // This is the very first method called as the component is “brought to life”.
        // The constructor method is called before the component is mounted to the DOM.
        // Usually, you’d 
        // a.) initialise state and
        // b.) bind event handlers methods within the constructor method.
        // What’s important to note is that this is the first method invoked — before the component is mounted to the DOM.
        // Also, the constructor is NOT where to introduce any side-effects or subscriptions such as event handlers.
        // EXAMPLE :
        // constructor(props) {
        //     super(props);
        //     this.state = {points: 0}; 
        //     this.handlePoints = this.handlePoints.bind(this);
        // }

    // 2. static getDerivedStateFromProps()
        // static getDerivedStateFromProps(props, state) {
        //     return {points: 200} // update state with this
        //     return null          // Or return null to make no update
        // }
        // Why exactly is this lifecycle method important? Well, it is one of the rarely used lifecycle methods, but it comes in handy in certain scenarios.
        // this method is called (or invoked) before the component is rendered to the DOM on initial mount.
        // this method is called before the component is mounted to the DOM. By returning an object, we update the state of the component before it is even rendered.
        // So when should you use the static getDerivedStateFromProps lifecycle method?
        // The method name "getDerivedStateFromProps" comprises five different words, 'Get' 'Derived' 'State' 'From' 'Props'.
        // Essentially, this method allows a component to update its internal state in response to a change in props.
        // You could read that again if you need it to sink in.
        // Also, component state in this manner is referred to as "Derived State".
        // As a rule of thumb, derived state should be used carefully as you can introduce subtle bugs into your application if you aren’t sure of what you’re doing.
        //
        // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#common-bugs-when-using-derived-state
        // "getDerivedStateFromProps" exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
        // All problems with derived state that we have seen can be ultimately reduced to either 
        //     (1) unconditionally updating state from props or 
        //     (2) updating state whenever props and state don’t match.
        // Anti-pattern: Unconditionally copying props to state
        //     A common misconception is that 'getDerivedStateFromProps' and 'componentWillReceiveProps' are only called when props “change”. 
        //     These lifecycles are called any time a parent component rerenders, regardless of whether the props are “different” from before. 
        //     Because of this, it has always been "unsafe" to unconditionally override state using either of these lifecycles. 
        //     "Doing so will cause state updates to be lost".

    // 3. Render()
        // After the static getDerivedStateFromProps method is called, the next lifecycle method in line is the render method.
        // render() is the only required method for a class component
        // NOTE : An important thing to note about the render method is that the render function should be pure i.e do not attempt to use setStateor interact with the external APIs.
        
        // If you want to render elements to the DOM, the render method is where you write this (as shown above) i.e returning some JSX
            // class MyComponent extends React.Component {
            //     render() {
            //     return <h1> Hurray! </h1>
            //     }
            // }
            
            
        // You could also return plain strings and numbers as shown below:
            // class MyComponent extends React.Component {
            //    render() {
            //     return "Hurray" 
            //    }
            // }

        // Or return arrays and fragments as shown below:
            // class MyComponent extends React.Component {
            //    render() {
            //     return [
            //           <div key="1">Hello</div>, 
            //           <div key="2" >World</div>
            //       ];
            //    }
            // }
            // class MyComponent extends React.Component {
            //    render() {
            //     return <React.Fragment>
            //             <div>Hello</div>
            //             <div>World</div>
            //       </React.Fragment>
            //    }
            // }

        // In the event that you don’t want to render anything, you could return a Boolean or null within the render method:
            
            // class MyComponent extends React.Component { 
            //    render() {
            //     return null
            //    }
            // }
            
            // class MyComponent extends React.Component {
            //   render() {
            //     return (2 + 2 === 5) && <div>Hello World</div>;
            //   }
            // }

        // Lastly, you could also return a portal from the render method:
            //  class MyComponent extends React.Component {
            //  render() {
            //      return createPortal(this.props.children, document.querySelector("body"));
            //    }
            //  }



    // 4. componentDidMount()
        // After render is called, the component is mounted to the DOM, and the componentDidMount method is invoked.
        // This function is invoked immediately after the component is mounted to the DOM.
        // Sometimes you need to grab a DOM node from the component tree immediately after it’s mounted. This is the right component lifecycle method to do this.
        // For example, you could have a modal and want to render the content of the modal within a specific DOM element. The following could work:
            // class ModalContent extends React.Component {
            //     el = document.createElement("section");
            //     componentDidMount() {
            //         document.querySelector("body).appendChild(this.el);
            //     }
            //     // using a portal, the content of the modal will be rendered in the DOM element attached to the DOM in the componentDidMount method. 
            // }

        // If you also want to make network requests as soon as the component is mounted to the DOM, this is a perfect place to do so as well:
            // componentDidMount() {
            // this.fetchListOfTweets() // where fetchListOfTweets initiates a netowrk request to fetch a certain list of tweets. 
            // }

        // You could also set up subscriptions such as timers. Here’s an example:
            // e.g requestAnimationFrame 
            // componentDidMount() {
            //     window.requestAnimationFrame(this._updateCountdown);
            // }

            // e.g event listeners 
            // componentDidMount() {
            //     el.addEventListener()
            // }
        // Just make sure to cancel the subscription when the component unmounts. I’ll show you how to do this when we discuss the componentWillUnmount lifecycle method.
        // With this, we come to the end of the Mounting phase. Let’s have a look at the next phase the component goes through — the updating phase.

// UPDATING PHASE
    // Whenever a change is made to the state or props of a react component, the component is re-rendered. In simple terms, the component is updated. This is the updating phase of the component lifecycle.
    // So what lifecycle methods are invoked when the component is to be updated?
    
    // 1. static getDerivedStateFromProps(props, state)
        // Firstly, the static getDerivedStateFromProps method is also invoked. That’s the first method to be invoked. I already explained this method in the mounting phase, so I’ll skip it.
        // What’s important to note is that this method is invoked in both the mounting and updating phases. The same method.
    // 2. shouldComponentUpdate(nextProps, nextState)
        // As soon as the static getDerivedStateFromProps method is called, the shouldComponentUpdate method is called next.
        // By default, or in most cases, you’ll want a component to re-render when state or props changes. However, you do have control over this behavior.
        // Within this lifecycle method, you can return a boolean — true or false and control whether the component gets re-rendered or not i.e upon a change in state or props.
        // true => Update UI (default value id it is not implemented.)
        // false => DON'T update UI
        // This lifecycle method is mostly used for performance optimisation measures. 
        // However, this is a very common use case, so you could use the built-in "PureComponent" when you don’t want a component to re-render if the stateand props don’t change.
    // 3. render()
        // After the "shouldComponentUpdate" method is called, render is called immediately afterwards, –> depending on the returned value from "shouldComponentUpdate" which defaults to true.
    // 4. getSnapshotBeforeUpdate(prevProps, prevState)
        // Right after the render method is called, the getSnapshotBeforeUpdatelifcycle method is called next.
        // This comes handy specifically when you need to grab some information from the DOM (and potentially change it) just after an update is made.
        // Here’s the important thing. The value queried from the DOM in getSnapshotBeforeUpdate will refer to the value just before the DOM is updated. Even though the render method was previously called.
        // Actual updates to the DOM may be asynchronous, but the getSnapshotBeforeUpdate lifecycle method will always be called immediately before the DOM is updated.
        // A classic example of where this lifecycle method may come in handy is in a chat application.
        // The way the getSnapshotBeforeUpdate lifecycle method works is that when it is invoked, it gets passed the previous "props" and "state" as arguments.
        // NOTE : Within this method, you’re expected to either return a value or null ex : // return value || null
        // Whatever value is returned here is then passed on to another lifecycle method "componentDidUpdate"
        
            // constructor(props){
            //     console.log('GRAND_CHILD constructor')
            //     super(props);
            //     this.state={toy : 'toy_car', fruit : 'banana', booleanValue : false, planets : ['mercury', 'veneus', 'earth', 'mars']}
            //     this.planetThreadRef = React.createRef();
            // }

            // getSnapshotBeforeUpdate(prevProps,prevState){
            //     console.log('GRAND_CHILD getSnapshotBeforeUpdate');
            //     if(prevState.planets.length < this.state.planets.length){
            //         const planetThreadRef  = this.planetThreadRef.current;
            //         return {toBeScrolled : planetThreadRef.scrollHeight - planetThreadRef.scrollTop}
            //     }
            //     return null;                
            // }

    // 5. ­React updates ­D­O­M and refs

    // 6. componentDidUpdate(prevProps, prevState, snapShot)
        //This lifecycle method is invoked after the "getSnapshotBeforeUpdate" is invoked. As with the "getSnapshotBeforeUpdate" method it receives the previous "props" and "state" and Whatever value is returned from the getSnapshotBeforeUpdate lifecycle method is passed as the third argument to the "componentDidUpdate" method.
            
            // componentDidUpdate(prevProps,prevState,snapShot){
            //     console.log('GRAND_CHILD componentDidUpdate');
            //     if(snapShot && snapShot.toBeScrolled){
            //         const planetThreadRef  = this.planetThreadRef.current;
            //         planetThreadRef.scrollTop = planetThreadRef.scrollHeight - snapShot.toBeScrolled;
            //     }
            // }

// UNMOUNTING PHASE
    // 1. componentWillUnmount()
    // The "componentWillUnmount" lifecycle method is invoked immediately before a component is unmounted and destroyed. 
    // This is the ideal place to perform any necessary cleanup such as clearing up timers, cancelling network requests, or cleaning up any subscriptions that were created in componentDidMount() as shown below:
    // e.g add event listener
        // componentDidMount() {
        //     el.addEventListener()
        // }
        // // e.g remove event listener 
        // componentWillUnmount() {
        //     el.removeEventListener()
        //  }


// ERROR HANDLING PHASE
    // Sometimes things go bad, errors are thrown. The following methods are invoked when an error is thrown by a "descendant"(Child) component i.e a component below them.
    // Let’s implement a simple component to catch errors in the demo app. For this, we’ll create a new component called ErrorBoundary.
    
    // 1. static getDerivedStateFromError(error)
        // Whenever an error is thrown in a descendant component, this method is called first, and the error thrown passed as an argument.
        // Whatever value is returned from this method is used to update the state of the component.
            // static getDerivedStateFromError(error) {
            //     console.log(`Error log from getDerivedStateFromError: ${error}`);
            //     return { hasError: true };
            //  }
    // 2. componentDidCatch(error, errorInfo)
        // The componentDidCatch method is also called after an error in a descendant component is thrown. Apart from the error thrown, it is passed one more argument which represents more information about the error
        // In this method, you can send the error or info received to an external logging service. Unlike getDerivedStateFromError, the componentDidCatch allows for side-effects
            // componentDidCatch(error, info) {
            //     logToExternalService(error, info) // this is allowed. 
            //         //Where logToExternalService may make an API call.
            // }
        // Final look of component
            // static getDerivedStateFromError(error) {
            //     console.log(`Error log from getDerivedStateFromError: ${error}`);
            //     return { hasError: true };
            //   }
            
            //   componentDidCatch(error, info) {
            //     console.log(`Error log from componentDidCatch: ${error}`);
            //     console.log(info);
            //   }
            
            //   render() {
            //     if (this.state.hasError) {
            //         return <h1>Something went wrong.</h1>;
            //       }
              
            //       return this.props.children;
            //    }
            // }
            // export default ErrorBoundary;

        // Usage:
            // <ErrorBoundary>
            //   <BuggyCOmponent />
            // </ErrorBoundary> 

        // Producing an error:
        // componentDidMount() {
        //     throw new Error("An error has occured in Buggy component!");
        //     // or
        //     console.log(this.props.dummy.toUpperCase()) // produces error, because we are accessing uppercase() on undefined value.
        //  }  
            
            


