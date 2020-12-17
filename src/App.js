import React, { Component } from 'react'
import './App.css'
import Formulaire from './components/Formulaire'
import Message from './components/Message'

class App extends Component {
  //we will store all messages in the object message
  // important to store all messages in app because it's the
  // highest component
  state = {
    messages: {},
    //have access to the router
    pseudo: this.props.match.params.pseudo
  }

  addMessage = (message) => {
    const messages = {...this.state.messages }
    // give the message a unique key - timestamp
    messages[`message-${Date.now()}`] = message
    this.setState({ messages })
  }

  render () {
    return (
      <div className='box'>
        <div>
          <div className="messages">
            <Message />
            <Message />
            <Message />

          </div>
          <Formulaire  
            // give acces to the method addMessage to Formulaire
            addMessage={this.addMessage}
            pseudo={this.state.pseudo}
          />
        </div>
      </div>
    )
  }
}

export default App
