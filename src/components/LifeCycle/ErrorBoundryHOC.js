//ErrorBoundryHOC

import React from 'react';

// https://blog.pusher.com/react-error-boundaries/

// class ErrorBoundryHOC extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         hasError: false,
//         error: null,
//         info: null
//       };
//     }
//     componentDidCatch(error, info) {
//       this.setState({
//         hasError: true,
//         error: error,
//         info: info
//       });
//     }
//     render() {
//       if (this.state.hasError) {
//         return (
//           <div>
//             <h1>Oops, something went wrong :(</h1>
//             <p>The error: {this.state.error.toString()}</p>
//             <p>Where it occured: {this.state.info.componentStack}</p>
//           </div>
//         );
//       }
//       return this.props.children;
//     }
//   }

// https://css-tricks.com/handling-errors-with-error-boundary/

class ErrorBoundryHOC extends React.Component {
    state = {hasError: false, error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
        this.setState({
        hasError: true,
        error: error,
        errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
        return (
            <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: "pre-wrap" }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
            </details>
            </div>
        );
        }

        return this.props.children;
    }
}
export default ErrorBoundryHOC;