import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './swiper.css'

// 滚动容器的宽度
let clientW = 375
let criticalWidth = 0
// 用户标识当前的滑动状态
let touchStatus = 0

// 单指操作 - 滑动坐标相关
// touchStart 点击坐标
let stStartX = 0
// 上个周期中的tranlateX 坐标
let stPrevX = 0
// 当前是否需要自动滑动到下一张图片
let stAutoNext = 0
// 滑动的方向，-1 为右滑，1 为左滑
let stDirectionFlag = 0

// 当前正在预览的图片次序，用于位置计算
let activeIndex = 0
// sliderWrapper上的触摸点数量
let touchCount = 0
// 用于取消自动轮播（如果指定了的话）
let _autoPlayTimer = null
// getBoundingClientRect的兼容性
const isSupportGetBoundingClientRect = typeof document.documentElement.getBoundingClientRect === 'function'

class Swiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 当前显示在DOM中的图片列表
      currentList: [],
      // 单指滑动的位移
      transX: 0,
      // 当前正在预览的图片次序，用于给模板渲染计数器使用
      activeIndex: 1,
      // 正在自动滚动到固定位置的过程中
      isTransToX: false,
      firstSwiperItem: null,
      lastSwiperItem: null,
      swiperItemCount: 0
    }
  }

  static defaultProps = {
    urlList: [],
    backgroundSize: 'cover',
    clientW: document.documentElement.clientWidth,
    clientH: 200,
    showCounter: false,
    counterStyle: null,
    startIndex: 0,
    criticalValue: 1 / 4,
    autoPlayDelay: null,
    duration: 350,
    click: null,
    change: null,
  }

  componentWillMount () {
    let { urlList } = this.props
    if (!this.isMobile()) {
      urlList = ['https://dummyimage.com/375x100/FB8A80?text=please+browse+on+mobile']
    }
    let currentList = urlList.length > 1
      ? urlList.slice(-1).concat(urlList, urlList.slice(0, 1)).map((url, index) => ({ url, _id: index }))
      : urlList.map((url, index) => ({ url, _id: index }))
    clientW = this.props.clientW
    criticalWidth = clientW * this.props.criticalValue
    if (currentList.length > 1) {
      // 因为首尾都多加了一个swiperItem元素，所以顺延一位
      activeIndex = this.getActiveIndex(this.props.startIndex + 1)
      let transX = stPrevX = -clientW * activeIndex
      this.setState({ activeIndex, transX })
    }
    // 自动轮播
    clearTimeout(_autoPlayTimer)
    _autoPlayTimer = setTimeout(() => {
      this.autoPlayFn()
    }, 14)
    this.setState({ swiperItemCount: currentList.length, currentList })
  }

  componentWillUnmount () {
    clearTimeout(_autoPlayTimer)
  }

  touchstartFn (e) {
    // 取消还没结束的自动轮播（如果指定了轮播的话）
    clearTimeout(_autoPlayTimer)
    if (this.ignoreTouch()) return
    if (this.state.isTransToX) {
      if (!isSupportGetBoundingClientRect) {
        return touchStatus = 0
      }
      stPrevX = this.refs.sliderWrapper.getBoundingClientRect().left - this.refs.swiperContainer.getBoundingClientRect().left
      this.setState({ isTransToX: false, transX: stPrevX })
    }
    touchStatus = 1
    touchCount = e.touches.length
    this.singleTouchStartFn(e)
  }

  touchmoveFn (e) {
    e.preventDefault()
    if (this.ignoreTouch() || touchStatus !== 1) return
    if (this.state.swiperItemCount !== 1) {
      this.singleTouchMoveFn(e)
    }
  }

  touchendFn (e) {
    touchCount = e.touches.length
    if (this.ignoreTouch() || touchStatus !== 1) return
    if (touchCount !== 0) {
      stStartX = e.touches[touchCount - 1].clientX
      stPrevX = this.state.transX
      return
    }
    this.singleTouchEndFn(e)
  }

  getSingleTouchEndMultipleChildToX () {
    let toX = 0
    let diffX = this.state.transX + clientW * activeIndex
    const wholeBlock = Math.floor(diffX / clientW)
    // 如果连续滑过超过一个 swiperItem 块，当做一个来处理
    if (Math.abs(diffX) > clientW) {
      activeIndex = Math.ceil(-this.state.transX / clientW)
      diffX = diffX - clientW * wholeBlock
    }
    // diffX 大于0 说明是右滑，小于0 则是左滑
    if (diffX > 0) {
      stDirectionFlag = -1
      stAutoNext = diffX > criticalWidth
      toX = stAutoNext ? -clientW * (activeIndex - 1) : -clientW * activeIndex
    } else if (diffX < 0) {
      stDirectionFlag = 1
      stAutoNext = Math.abs(diffX) > criticalWidth
      toX = stAutoNext ? -clientW * (activeIndex + 1) : -clientW * activeIndex
    } else {
      stDirectionFlag = 0
      stAutoNext = false
      toX = -clientW * activeIndex
    }
    activeIndex = this.getActiveIndex(activeIndex + (stAutoNext ? stDirectionFlag : 0))
    this.setState({ activeIndex })
    return toX
  }

  singleTouchStartFn (e) {
    stStartX = e.touches[touchCount - 1].clientX
    if (touchCount > 1) {
      stPrevX = this.state.transX
    }
  }

  singleTouchMoveFn (e) {
    let transX = e.touches[touchCount - 1].clientX - stStartX + stPrevX
    if (transX > 0) {
      // 滑动到到第一个了
      stStartX = e.touches[touchCount - 1].clientX
      // 矫正到正确位置
      stPrevX = transX = -clientW * (this.state.swiperItemCount - 2)
    } else if (transX < -clientW * (this.state.swiperItemCount - 1)) {
      // 滑动到最后一个了
      stStartX = e.touches[touchCount - 1].clientX
      // 矫正到正确位置
      stPrevX = transX = -clientW
    }
    this.setState({ transX })
  }

  singleTouchEndFn (e) {
    let toX = this.state.swiperItemCount === 1 ? 0 : this.getSingleTouchEndMultipleChildToX()
    this.gotoX(toX)
  }

  transEndFn () {
    activeIndex = this.getActiveIndex(activeIndex)
    stPrevX = -clientW * activeIndex
    this.setState({ activeIndex, transX: stPrevX })
    // setTimeout是为了避免当 autoPlayDelay值被指定为 0 时无限轮播出现问题
    // 16.7 是 1000/60 的大约值
    clearTimeout(_autoPlayTimer)
    _autoPlayTimer = setTimeout(() => {
      this.autoPlayFn()
    }, 16.7)
  }

  transitionendFn (e) {
    if (e.target.className === 'swiper-wrapper') {
      if (this.state.isTransToX) {
        this.setState({ isTransToX: false })
        // 单指操作 - 自动滑动结束
        this.transEndFn()
        this.props.change && this.props.change(activeIndex)
      }
    }
  }

  getActiveIndex (index) {
    if (this.state.swiperItemCount === 1) return 0
    if (index >= this.state.swiperItemCount - 1) return 1
    if (index <= 0) return this.state.swiperItemCount - 2
    return index
  }

  autoPlayFn () {
    // 判断是否满足自动轮播的条件
    if (this.state.swiperItemCount > 1 && (typeof this.props.autoPlayDelay === 'number' && this.props.autoPlayDelay >= 0) && touchCount === 0 && this.state.transX % clientW === 0) {
      clearTimeout(_autoPlayTimer)
      _autoPlayTimer = setTimeout(() => {
        activeIndex = activeIndex + 1
        this.setState({ transX: -clientW * activeIndex, isTransToX: true })
        this.correctDurationAct()
      }, this.props.autoPlayDelay)
    }
  }

  ignoreTouch () {
    return this.state.swiperItemCount <= 1
  }

  correctDurationAct () {
    if (typeof this.props.duration !== 'number' || this.props.duration <= 0) {
      this.setState({ isTransToX: false })
      this.transEndFn()
    }
  }

  swipeClick (e) {
    e.preventDefault()
    this.props.click && this.props.click(this.state.activeIndex)
  }

  gotoX (toX) {
    if (this.state.transX === toX) {
      // 已经手动滑到正确的位置
      this.transEndFn()
    } else {
      // 自由滚动到合适的位置
      this.setState({ isTransToX: true, transX: toX })
      this.correctDurationAct()
    }
  }

  goto (index) {
    clearTimeout(_autoPlayTimer)
    if (index < 1 || this.state.swiperItemCount === 1) {
      activeIndex = 1
    } else if (index > this.state.swiperItemCount - 2) {
      activeIndex = this.state.swiperItemCount - 2
    } else {
      activeIndex = index
    }
    if (this.state.activeIndex !== activeIndex) {
      this.setState({ activeIndex }, this.gotoX(-clientW * activeIndex))
    } else {
      this.autoPlayFn()
    }
    return activeIndex
  }

  isMobile () {
    return navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) !== null;
  }

  render () {
    return (
      <div className="active-swiper-container" ref="swiperContainer"
        style={{ width: clientW + 'px', height: this.props.clientH + 'px' }}
        onClick={this.swipeClick.bind(this)} >
        <div className="swiper-wrapper" ref="sliderWrapper"
          style={{
            transform: `translate3d(${this.state.transX}px, 0, 0)`,
            transition: this.state.isTransToX ? `transform ${this.props.duration}ms cubic-bezier(0,0,0.25,1)` : '',
          }}
          onTouchStart={this.touchstartFn.bind(this)}
          onTouchMove={this.touchmoveFn.bind(this)}
          onTouchEnd={this.touchendFn.bind(this)}
          onTransitionEnd={this.transitionendFn.bind(this)}>
          {
            this.state.currentList.map((item, index) => {
              return <div className="img-box" style={{ backgroundImage: `url(${item.url})`, backgroundSize: this.props.backgroundSize }} key={item._id}></div>
            })
          }
        </div>
        {
          this.props.showCounter && this.state.swiperItemCount > 1
          && <div className="swiper-pagination" style={this.props.counterStyle}>
            {`${this.state.activeIndex}/${this.state.swiperItemCount - 2}`}
          </div>
        }
      </div>
    )
  }
}

export default Swiper

Swiper.propTypes = {
  urlList: PropTypes.array.isRequired,
  // 图片以何种缩放的形式铺在 滑动容器框内，只有当指定了 urlList 时才有效
  backgroundSize: PropTypes.string,
  // swiperContainer容器的宽度
  clientW: PropTypes.number,
  // swiperContainer容器的高度
  clientH: PropTypes.number,
  // 是否需要默认的计数器
  showCounter: PropTypes.bool,
  // 自定义默认计数器的样式 
  counterStyle: PropTypes.object,
  // 起始index
  startIndex: PropTypes.number,
  // 临界点的比例值，当超过这个临界点，则需要自动滑动到下一张图片
  criticalValue: PropTypes.number,
  // 自动滚动到稳定位置所需的时间，单位是秒(ms)
  duration: PropTypes.number,
  // 如果指定了此参数，并且值 >= 0，则将会将此值当做 delay的时间(单位为 ms)进行自动轮播；
  // 不指定或指定值小于 0 则不自动轮播
  // 如果想要指定此值，一般建议设置为 3000
  autoPlayDelay: PropTypes.number
}