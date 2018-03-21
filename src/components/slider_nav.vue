<template>
  <div class="slider_nav">
    <!--<div class="slider_nav_header">-->
      <!--<ul class="nav_header_list" ref="sliderNav" @touchstart="sliderStart(elNav)" @touchmove="sliderMove(elNav)"-->
          <!--@touchend="sliderEnd(elNav)">-->
        <!--<li @touchend="navFn(0)" :class="navActive===0?'active':''">-->
          <!--<span>手机</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(1)" :class="navActive===1?'active':''">-->
          <!--<span>电器</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(2)" :class="navActive===2?'active':''">-->
          <!--<span>家居家装</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(3)" :class="navActive===3?'active':''">-->
          <!--<span>家居家装</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(4)" :class="navActive===4?'active':''">-->
          <!--<span>母婴</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(5)" :class="navActive===5?'active':''">-->
          <!--<span>美妆</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(6)" :class="navActive===6?'active':''">-->
          <!--<span>鞋子</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(7)" :class="navActive===7?'active':''">-->
          <!--<span>衣服</span>-->
        <!--</li>-->
        <!--<li @touchend="navFn(8)" :class="navActive===8?'active':''">-->
          <!--<span>外套</span>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<span class="line_bottom"></span>-->
    <!--</div>-->
    <div class="slider_nav_content">
      <div class="loading" v-show="loading">
        内容正在加载中.....
      </div>
      <ul class="nav_content_list" ref="sliderContent" @touchstart="sliderStart(elContent)" @touchmove="sliderMove(elContent)"
          @touchend="sliderEnd(elContent)">
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
        <li>
          <div>
            <img
              src="http://yanxuan.nosdn.127.net/2f5e870593c18043e80a21ad885b0616.png?imageView&quality=65&thumbnail=330x330"
              alt="沙发">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import transform from '@/api/transform';

export default {
  name: 'slider_nav',
  data () {
    return {
      elNav: null,
      elContent: null,
      transformVal: {},
      startX: null,
      startY: null,
      currentTransformY: null,
      currentTransformX: null,
      lastTime: null,
      lastTimeDis: null,
      lastDisX: null,
      lastX: null,
      minY: null,
      minX: null,
      isMove: true,
      isFirst: true,
      step: 1,
      navActive: 3,
      loading: false,
      isActive: true,
      iNow: 0,
      defaultConfig: {
        sliderY: false
      }
    };
  },
  methods: {
    sliderStart (el) {
      if (this.loading) {
        return;
      }
      this.minY = document.documentElement.clientHeight - el.offsetHeight;
      this.minX = document.documentElement.clientWidth - el.offsetWidth;
      // console.log(this.minX);
      // console.log(this.minY);
      let changedTouches = event.changedTouches[0];
      this.startY = changedTouches.pageY;
      this.startX = changedTouches.pageX;
      this.currentTransformY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.currentTransformX = transform(this.el, this.transformVal, 'translate3d').X;
      this.lastTime = new Date().getTime();
      this.step = 1;
      this.isMove = true;
      this.isFirst = true;
      this.lastX = this.startX;
      el.style.transition = 'none';
      this.isActive = true;
    },
    sliderMove (el) {
      this.isActive = false;
      if (this.loading) {
        return;
      }
      if (!this.isMove) {
        return;
      }
      let changedTouches = event.changedTouches[0];
      let disY = changedTouches.pageY - this.startY;
      let disX = changedTouches.pageX - this.startX;
      let totalY = disY + this.currentTransformY;
      let totalX = disX + this.currentTransformX;

      this.lastTimeDis = new Date().getTime() - this.lastTime;
      this.lastDisX = changedTouches.pageX - this.lastX;
      this.lastX = changedTouches.pageX;
      this.lastTime = new Date().getTime();

      if (this.isFirst) {
        this.isFirst = false;
        if (this.defaultConfig.sliderY) {
          if (Math.abs(disX) > Math.abs(disY)) {
            this.isMove = false;
          }
        } else {
          if (Math.abs(disY) > Math.abs(disX)) {
            this.isMove = false;
          }
        }
      }

      // if (this.defaultConfig.sliderY) {
      //   if (totalY > 0) {
      //   }
      // } else {
      //   if (totalX > 0) {
      //     this.step = 1 - totalX / document.documentElement.clientWidth;
      //     totalX = parseInt(totalX * this.step);
      //   }
      //   if (totalX < this.minX) {
      //     // console.log(this.minX - totalX);
      //     let over = this.minX - totalX;
      //     this.step = 1 - over / document.documentElement.clientWidth;
      //     over = parseInt(this.step * over);
      //     totalX = this.minX - over;
      //   }
      // }
      if (this.isMove) {
        if (this.defaultConfig.sliderY) {
          transform(el, this.transformVal, 'translate3d', '0,' + totalY + ',0');
        } else {
          transform(el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
        }
      }
      if (Math.abs(disX) > el.clientWidth / 2) {
        this.changePage(disX, el);
      }
    },
    sliderEnd (el) {
      if (this.loading) {
        return;
      }
      let speedX = (this.lastDisX / this.lastTimeDis) * 100;
      let transformX = transform(el, this.transformVal, 'translate3d').X;
      // let transformY = transform(el, this.transformVal, 'translate3d').Y;
      let targetX = transformX + speedX;
      // let time = Math.abs(speedX * .9);
      // time = time < 300 ? 300 : time;
      // console.log(targetX);
      // console.log(this.minX);
      if (targetX > 0) {
        targetX = 0;
      } else if (targetX < this.minX) {
        targetX = this.minX;
      }

      el.style.transition = 0.5 + 's';
      if (this.defaultConfig.sliderY) {
        transform(el, this.transformVal, 'translate3d', '0,' + 0 + ',0');
      } else {
        transform(el, this.transformVal, 'translate3d', '' + targetX + ',0,0');
      }
    },
    navFn (num) {
      if (this.isActive) {
        this.navActive = num;
      } else {
        return false;
      }
    },
    changePage (disX, el) {
      let dir = disX / Math.abs(disX);
      console.log(dir);
      let target = dir > 0 ? 1 * el.clientWidth : -1 * el.clientWidth;
      this.iNow -= dir;
      // console.log(this.iNow);
      // console.log(target);
      let arrChild = Array.prototype.slice.call(el.children);
      if (this.iNow < 0) {
        this.iNow = arrChild.length - 1;
      }
      if (this.iNow >= arrChild.length) {
        this.iNow = 0;
      }
      el.style.transition = '.5s all';
      transform(el, this.transformVal, 'translate3d', ' ' + target + ',0,0');
      this.loading = true;
      el.addEventListener('webkitTransitionEnd', this.tranEnd(el));
    },
    tranEnd (el) {
      setTimeout(() => {
        el.style.transition = 'none';
        this.loading = false;
        transform(el, this.transformVal, 'translate3d', '0,0,0');
      }, 1000);
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.elNav = this.$refs.sliderNav;
      this.elContent = this.$refs.sliderContent;
      // transform(this.elNav, this.transformVal, 'translate3d', '0,0,0');
      transform(this.elContent, this.transformVal, 'translate3d', '0,0,0');
      document.addEventListener('touchstart', () => {
        event.preventDefault();
      });
    });
  }
};
</script>

<style scoped lang="scss">
  .slider_nav {
    .slider_nav_header {
      width: 100%;
      overflow: hidden;
      position: relative;
      .nav_header_list {
        display: flex;
        align-items: center;
        width: 14rem;
        li {
          font-size: 0.4rem;
          list-style: none;
          margin-left: 0.5rem;
          height: .8rem;
          line-height: .8rem;
          margin-bottom: .3rem;
          text-align: center;
        }
        li.active{
          color: #ff0000;
        }
      }
      .line_bottom{
        position: absolute;
        left: 0;
        bottom: 5px;
        width: .9rem;
        border-bottom: 2px solid #ff0000;
        -webkit-transition: .5s all;
        -moz-transition: .5s all;
        -ms-transition: .5s all;
        -o-transition: .5s all;
        transition: .5s all;
      }
    }
    .slider_nav_content {
      position: relative;
      overflow: hidden;
      .loading {
        text-align: center;
        font-size: 0.5rem;
        transition: 0.5s all;
      }
      .nav_content_list {
        display: flex;
        list-style: none;
        flex-wrap: wrap;

        li {
          width: 50%;
          div {
            padding: 0.2rem;
          }
          img {
            border-radius: 5px;
            background-color: #f4f4f4;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
