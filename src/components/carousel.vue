<template>
<div class="carousel_module">
  <div class="carousel_content">
    <ul class="carousel_list" ref="carousel" @mousedown="carouselDown">
      <li><img src="http://temp.im/750x350/4CF111/fff" alt=""></li>
      <li><img src="http://temp.im/750x350/4CC222/fff" alt=""></li>
      <li><img src="http://temp.im/750x350/4CA333/fff" alt=""></li>
      <li><img src="http://temp.im/750x350/000444/fff" alt=""></li>
      <li><img src="http://temp.im/750x350/333555/fff" alt=""></li>
    </ul>
  </div>
</div>
</template>
<script>
import transform from '@/api/transform';
export default {
  name: 'carousel',
  data () {
    return {
      startX: null,
      currentStartX: null,
      startY: null,
      currentStartY: null,
      iNow: 0,
      el: null,
      transformVal: {},
      controlStyle: 'shade',
      isMove: true,
      elWidth: null
    };
  },
  methods: {
    carouselDown () {
      event.preventDefault();
      this.elWidth = this.el.offsetWidth;
      document.addEventListener('mousemove', this.carouselMove);
      document.addEventListener('mouseup', this.carouselUp);
      console.log(event);
      // console.log(this.elWidth);
      this.startX = event.pageX;
      this.startY = event.pageY;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
      this.currentStartY = transform(this.el, this.transformVal, 'translate3d').Y;
      this.isMove = true;
    },
    carouselMove () {
      // console.log(event);
      if (!this.isMove) {
        return;
      }
      let disX = event.pageX - this.startX;
      let totalX = disX + this.currentStartX;
      let disY = event.pageY - this.startY;
      // let totalY = disY + this.currentStartY;
      if (Math.abs(disX) < Math.abs(disY)) {
        this.isMove = false;
      }
      // console.log(disX);
      console.log(this.el.clientWidth / 2);
      if (Math.abs(disX) > this.el.clientWidth / 2) {

        this.changePage(disX);
      }
      let dir = disX / Math.abs(disX);
      this.iNow -= dir;
      if (this.iNow >= Array.prototype.slice.call(this.el.children).length) {
        this.iNow = 0;
      } else if (this.iNow < 0) {
        this.iNow = (Array.prototype.slice.call(this.el.children).length - 1);
      }
      // let shadeVal = (disX / this.el.children[0].offsetWidth);
      // console.log(dir);
      console.log(this.iNow);
      // console.log(shadeVal);
      if (this.controlStyle === 'slide') {
        transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
      }
      if (this.controlStyle === 'shade') {
      }
    },
    carouselUp () {
      document.removeEventListener('mousemove', this.carouselMove);
      document.removeEventListener('mousemove', this.carouselUp);
    },
    changePage (disX) {

    }

  },
  mounted () {
    this.el = this.$refs.carousel;
    console.log(this.el);
    transform(this.el, this.transformVal, 'translate3d', '0,0,0');
  }
};
</script>

<style scoped lang="scss">
  .carousel_module{
    .carousel_content{
      width: 750px;
      height: 350px;
      overflow: hidden;
      margin: 0 auto;
      .carousel_list{
        width: 100%;
        height: 100%;
        display: flex;
        cursor: grab;
        li {
          list-style: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          font-size: 0;
        }
      }
    }
  }
</style>
