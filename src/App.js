import React, { Component, createRef } from 'react'
import './App.css'
import './animations.css'

import Formulaire from './components/Formulaire'
import Message from './components/Message'

//firebase
import base from './base'

//animation
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

class App extends Component {
  //we will store all messages in the object message
  // important to store all messages in app because it's the
  // highest component
  state = {
    messages: {},
    //have access to the router
    pseudo: this.props.match.params.pseudo
  }

  messageRef = createRef()

  componentDidMount () {
    // synchronyze state with db
    // '/' means storing everything
    base.syncState('/', { 
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate() {
    // set up the scroll
    // current refer to the instant T reference in the message div
    const ref = this.messageRef.current
    // set up the anchor
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = (message) => {
    const messages = {...this.state.messages }
    // give the message a unique key - timestamp
    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      //keep the last 10 messages
      .slice(0,-10)
      .forEach(key => {
        //message above 20 set to null => delete in firebase
        messages[key] = null
      })

    this.setState({ messages })
  }

  isUser = (pseudo) => pseudo === this.state.pseudo
    // is the sender the same person as the owner of the message ?

  render () {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <CSSTransition 
          key={key}
          timeout={1000}
          classNames='fade'>
            <Message 
              
              isUser={this.isUser}
              pseudo={this.state.messages[key].pseudo}
              message={this.state.messages[key].message}
            />
        </CSSTransition>
      ))

    return (
      <div className='box'>
        <div>
          <div className="messages"
              ref={this.messageRef}
              >
            <TransitionGroup className="message">
              { messages }
            </TransitionGroup>
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
