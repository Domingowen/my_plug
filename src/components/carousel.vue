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
      iNow: 0,
      el: null,
      transformVal: {},
      controlStyle: 'drag'
    };
  },
  methods: {
    carouselDown () {
      event.preventDefault();
      document.addEventListener('mousemove', this.carouselMove);
      document.addEventListener('mouseup', this.carouselUp);
      console.log(event);
      this.startX = event.pageX;
      this.currentStartX = transform(this.el, this.transformVal, 'translate3d').X;
    },
    carouselMove () {
      // console.log(event);
      let disX = event.pageX - this.startX;
      let totalX = disX + this.currentStartX;
      console.log(totalX);
      // console.log(totalX);
      if (this.controlStyle === 'drag') {
        transform(this.el, this.transformVal, 'translate3d', '' + totalX + ',0,0');
      }

    },
    carouselUp () {
      document.removeEventListener('mousemove', this.carouselMove);
      document.removeEventListener('mousemove', this.carouselUp);
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
      height: 100%;
      overflow: hidden;
      margin: 0 auto;
      .carousel_list{
        width: 100%;
        height: 100%;
        display: flex;
        cursor: grab;
        li {
          list-style: none;
          font-size: 0;
        }
      }
    }
  }
</style>
