import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Connection extends Component {

  state = {
    //default empty because we don't know the user's pseudo
    pseudo: '',
    goToChat: false
  }

  handleChange = (e) => {
    const pseudo = e.target.value
    this.setState ({pseudo})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState ({goToChat: true})
  }
  
  render() {
    if (this.state.goToChat) {
      return <Redirect to={`/pseudo/${this.state.pseudo}`}></Redirect>
    }

    return (
      <div className='connexionBox'>
        <form className="connexion" onSubmit={this.handleSubmit}>
          <input 
            value={this.state.pseudo}
            onChange={this.handleChange}
            type="text"
            placeholder="pseudo"
            required
          />
          <button type="submit">Go!</button>
        </form>
      </div>
    )
  }
}

export default Connection
