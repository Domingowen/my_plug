<template>
  <div class="slider_touch">
    <!--<div class="slider_touch_content" ref="sliderTouch">-->
    <!--<div class="slider_touch_refresh" v-show="isLoading">刷新页面...</div>-->
    <div class="slider_wrapper" :style="{height:defaultConfig.configHeight}" ref="sliderTouch">
      <div class="slider_touch_content" ref="sliderContent" @touchstart="sliderStart" @touchmove="sliderMove"
           @touchend="sliderEnd">
        <slot></slot>
      </div>
    </div>
    <!--<div class="slider_touch_loading" v-show="getMore">加载更多...</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import transform from '../api/transform';
export default {
  name: 'slider_touch',
  data () {
    return {
      startY: null,
      startX: null,
      pointY: null,
      pointX: null,
      distY: null,
      distX: null,
      el: null,
      elContent: null,
      transformVal: {},
      defaultConfig: {
        sliderY: this.config.sliderY, //  true是Y,false是X,
        configHeight: this.config.configHeight // 这个是可以自定义的
      },
      minY: null,
      minX: null,
      lastTimeDis: null,
      lastDisY: null,
      lastDisX: null,
      lastY: null,
      lastX: null,
      isMove: true,
      isFirst: true,
      step: 1,
      deltaX: 0,
      deltaY: 0,
      isRun: true,
      lastTime: 0,
      startTime: 0,
      endTime: 0
    };
  },
  props: {
    config: {
      type: Object,
      default () {
        return {
          sliderY: true,
          configHeight: '100%'
        };
      }
    }
  },


  /*
  * 1.所有的滑动只是过程,滑动结束才是对滑动的情况作出预测
  * 2.滑动的动画控制都在结束之后才执行,滑动的过程中不执行动画
  * 3.滑动数据都是在开始和过程生存储
  * */
  methods: {
    sliderStart () {
      this.getClient();
      let changedTouches = event.changedTouches[0];
      this.pointY = changedTouches.pageY;
      this.pointX = changedTouches.pageX;
      // this.lastY = this.pointY;
      // this.lastX = this.pointX;
      this.isMove = true;
      this.isFirst = true;
      this.el.style.transitionDuration = '0ms';
      this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
      this.distY = 0;
      this.distX = 0;
      this.startTime = new Date().getTime();
      this.startY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.startX = transform(this.el, this.transformVal, 'translate3d').X;
    },
    /*滑动过程*/
    sliderMove (e) {
      if (!this.isMove) {
        return;
      }
      let timeStamp = new Date().getTime();
      let newY = transform(this.el, this.transformVal, 'translate3d').Y;
      let newX = transform(this.el, this.transformVal, 'translate3d').X;
      let changedTouches = event.changedTouches[0];
      let deltaY = changedTouches.pageY - this.pointY;
      let deltaX = changedTouches.pageX - this.pointX;
      this.pointY = changedTouches.pageY;
      this.pointX = changedTouches.pageX;
      this.distY += deltaY;
      this.distX += deltaX;
      let absDeltaY = Math.abs(deltaY);
      let absDeltaX = Math.abs(deltaX);
      let totalY = newY + deltaY;
      let totalX = newX + deltaX;
      if (this.isFirst) {
        this.isFirst = false;
        if (this.defaultConfig.sliderY) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.isMove = false;
          }
        } else {
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            this.isMove = false;
          }
        }
      }
      if (timeStamp - this.endTime > 300 && (absDeltaX < 10 && absDeltaY < 10)) {
        return;
      }

      if (this.defaultConfig.sliderY) {
        if (totalY > 0 || totalY < this.minY) {
          totalY = newY + deltaY / 3;
        }
      } else {
        if (totalX > 0 || totalX < this.minX) {
          totalX = newX + deltaX / 3;
        }
      }
      if (this.isMove) {
        if (this.defaultConfig.sliderY) {
          transform(this.el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
        } else {
          transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
        }
      }
      if (timeStamp - this.startTime > 300) {
        this.startTime = timeStamp;
        this.startX = newX;
        this.startY = newY;
      }
    },
    /*滑动结束*/
    sliderEnd () {
      this.endTime = new Date().getTime();
      let newY = transform(this.el, this.transformVal, 'translate3d').Y;
      let newX = transform(this.el, this.transformVal, 'translate3d').X;
      // let totalY = newY;
      // let totalX = newX;
      let duration = new Date().getTime() - this.startTime;
      let distanceY = Math.abs(newY - this.startY);
      let distanceX = Math.abs(newX - this.startX);
      let time = 0;
      let momentumY = null;
      let momentumX = null;
      // console.log(newY);
      if (newY > 0) {
        newY = 0;
        this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
        this.el.style.transitionDuration = '600ms';
        transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
        return;
      } else if (newY < this.minY) {
        newY = this.minY;
        this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
        this.el.style.transitionDuration = '600ms';
        transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
        return;
      }

      if (duration < 300) {
        // momentumX = this.getMomentum(newX, this.startX, duration, this.minX, this.elContent.clientWidth);
        momentumY = this.getMomentum(newY, this.startY, duration, this.minY, this.elContent.clientHeight);
        // newX = momentumX.destination;
        newY = momentumY.destination;
        console.log(momentumY);
        time = Math.max(momentumY.duration);
        this.isInTransition = 1;
      }
      // console.log(newY);
      if (newX != transform(this.el, this.transformVal, 'translate3d').X || newY != transform(this.el, this.transformVal, 'translate3d').Y) {
        // console.log(newY);
        // console.log(this.maxScrollY);
        // change easing function when scroller goes out of the boundaries
        if (newX > 0 || newX < this.minX || newY > 0 || newY < this.minY) {
          // easing = utils.ease.quadratic;
        }
        // console.log(newX);
        // console.log(newY);
        if (this.defaultConfig.sliderY) {
          this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
          this.el.style.transitionDuration = '600ms';
          transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
          // this.el.style.transform = 'translate3d(0,'+newY +'px,0)'
        } else {
          this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
          this.el.style.transitionDuration = '600ms';
          transform(this.el, this.transformVal, 'translate3d', '' + newX + ',0,0');
          // this.el.style.transform = 'translate3d('+newX+',0,0)'
        }
        this.transitionEnd()
        return;
      }

    },
    getMomentum (current, start, time, lowerMargin, wrapperSize, deceleration) {
      // console.log(current, start, time, lowerMargin, wrapperSize);
      let distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;
      deceleration = deceleration === undefined ? 0.0006 : deceleration;
      destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
      duration = speed / deceleration;
      if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }
      return {
        destination: Math.round(destination),
        duration: duration
      };
    },
    refreshFn () {
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
    loadingData () {
      // setTimeout(() => {
      //   this.getMore = false;
      // }, 1000);
    },
    getClient () {
      this.minY = this.elContent.clientHeight - this.el.offsetHeight <= 0 ? this.elContent.clientHeight - this.el.offsetHeight : 0;
      this.minX = this.elContent.clientWidth - this.el.offsetWidth <= 0 ? this.elContent.clientWidth - this.el.offsetWidth : 0;
    },
    transitionEnd () {

      this.el.addEventListener('transitionend', () => {
        // console.log(true);
        let newY = transform(this.el, this.transformVal, 'translate3d').Y;
        let newX = transform(this.el, this.transformVal, 'translate3d').X;
        // console.log(newY);

        if (newY > 0) {
          newY = 0;
          this.el.style.transitionDuration = '600ms';
          this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
          // this.el.style.transform = 'translate3d(0,'+newY +'px,0)';
          transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
          return;
        } else if (newY < this.minY) {
          newY = this.minY;
          this.el.style.transitionDuration = '600ms';
          this.el.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
          // this.el.style.transform = 'translate3d(0,'+newY +'px,0)';
          transform(this.el, this.transformVal, 'translate3d', '0,' + newY + ',0');
          return;
        }
      }, false)
    }
  },
  mounted () {
    this.el = this.$refs.sliderContent;
    this.elContent = this.$refs.sliderTouch;
    transform(this.el, this.transformVal, 'translate3d', '0,0,0');

    document.addEventListener('touchstart', () => {
      event.preventDefault();
    });
  }
};
</script>

<style scoped lang="scss">
  .slider_touch {
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 0;
    .slider_touch_refresh {
      font-size: 0.5rem;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
    }
    .slider_touch_loading {
      font-size: 0.5rem;
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }
    .slider_wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .slider_touch_content {

    }
  }
</style>
