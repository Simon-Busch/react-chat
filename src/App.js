import React, { Component } from 'react'
import './App.css'
import Formulaire from './components/Formulaire'
import Message from './components/Message'

//firebase
import base from './base'


class App extends Component {
  //we will store all messages in the object message
  // important to store all messages in app because it's the
  // highest component
  state = {
    messages: {},
    //have access to the router
    pseudo: this.props.match.params.pseudo
  }

  componentDidMount () {
    // synchronyze state with db
    // '/' means storing everything
    base.syncState('/')
  }

  addMessage = (message) => {
    const messages = {...this.state.messages }
    // give the message a unique key - timestamp
    messages[`message-${Date.now()}`] = message
    this.setState({ messages })
  }

  render () {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <Message 
          key={key}
          pseudo={this.state.messages[key].pseudo}
          message={this.state.messages[key].message}
        />
      ))

    return (
      <div className='box'>
        <div>
          <div className="messages">
            <div className="message">
              { messages }
            </div>
          </div>

          <Formulaire  
            // give acces to the method addMessage to Formulaire
            addMessage={this.addMessage}
            pseudo={this.state.pseudo}
            length={200}
          />
        </div>
      </div>
    )
  }
}

export default App
