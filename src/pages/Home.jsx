import React, { Component } from 'react'
import Swiper from '../components/Swiper'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1
    }
  }

  inputIndex (e) {
    this.setState({ index: e.target.value })
  }

  goto () {
    let index = parseInt(this.state.index)
    index = this.refs.swiper.goto(index)
    this.setState({ index })
  }

  render () {
    return (
      <div>
        <Swiper
          urlList={[
            'https://dummyimage.com/375x100/FB8A80?text=1',
            'https://dummyimage.com/375x100/29A90F?text=2',
            'https://dummyimage.com/375x100/6F9DFF?text=3'
          ]}
          showCounter={true}
          click={(i) => { console.log('click', i) }}
          change={(i) => { console.log('change', i) }}
          ref="swiper">
        </Swiper>
        <input type="number" onChange={this.inputIndex.bind(this)} value={this.state.index}></input>
        <button onClick={this.goto.bind(this)}>goto</button>
      </div>)
  }
}

export default Home