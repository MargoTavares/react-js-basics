import React from 'react';

class Gif extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="gif-container">
                <input onChange={event => this.onInputChange(event.target.value)} />
            </div>
        )
    }
}

export default Gif;
