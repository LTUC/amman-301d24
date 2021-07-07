import React, { Component } from 'react'

export class Cat extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.catname}</h1>
            </div>
        )
    }
}

export default Cat
