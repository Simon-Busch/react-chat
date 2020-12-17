import React, { Component } from 'react'

class Formulaire extends Component {
  state = {
      message: '',
      length: this.props.length
  }

  createMessage = () => {
    const { addMessage, pseudo, length } = this.props

    const message = {
      // = to pseudo: pseudo
      pseudo,
      message: this.state.message
    }

    addMessage(message)
    //reset
    this.setState({message: '', length })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.createMessage()
  }

  handleChange = (event) => {
    const message = event.target.value

    // As we are in handle change function, it make sens to define
    // length here
    const length = this.props.length - message.length

    // we can then set length here and update the state
    this.setState({ message, length })
  }

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      // launch the sumbit
      this.createMessage()
    }
  }

  render () {
    
    return (
      <form className="form"
      onSubmit={this.handleSubmit}
      >
        <textarea
        value={this.state.message}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        required
        maxLength={this.props.length}/>
        <div className="info">
        {/* {state will be updated by handleChange funcrion} */}
          { this.state.length }
        </div>
        <button type='submit'>
          Send
        </button>
      </form>
    )
  }
}

export default Formulaire