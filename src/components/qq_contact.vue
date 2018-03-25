<template>
<div class="qq_content">
  <slider-touch>
    <ul class="qq_container">
      <li v-for="(item, index) in contactList">
        <div class="wrap">
          <div class="qq_avatar">
            <img src="../assets/avatar.jpg" alt="">
          </div>
          <div class="qq_middle">
            <p class="title">domingo开车群</p>
            <p class="text">domingo这周打算去哪里浪??</p>
          </div>
          <div class="time">
            <p>20180325</p>
            <span>13</span>
          </div>
        </div>
        <div class="control">
          <ul class="control_content">
            <li>置顶</li>
            <li>删除</li>
          </ul>
        </div>
      </li>
    </ul>
  </slider-touch>
</div>
</template>

<script>
import SliderTouch from './slider-touch';
export default {
  name: 'qq_contact',
  data () {
    return {
      contactList: [
        {
          id: 1,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 2,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 3,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 4,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 5,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 6,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 7,
          title: 'domingo开车群',
          text: 'domingo 周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        },
        {
          id: 8,
          title: 'domingo开车群',
          text: 'domingo周末要去哪里浪??',
          time: '20180325',
          isRead: false,
          isPerson: false
        }
      ]
    };
  },
  components: {
    SliderTouch
  }
};
</script>

<style scoped lang="scss">
  .qq_content{
    .qq_container{
      li{
        width: 100%;
        height: 2.5rem;
        position: relative;
        .wrap{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          background-color: #fff;
          z-index: 20;
          align-items: center;
          .qq_avatar{
            width: 2.066rem;
            height: 2.0666rem;
            flex: 1;
            padding-left: 0.1rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .qq_middle{
            width: 11.3rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 3;
            padding-left: 0.2rem;
            .title{
              font-size: 0.50666rem;
              font-weight: bold;
              padding-bottom: 0.2666rem;
            }
            .text {
              font-size: 0.42666rem;
              color: #777777;
            }
          }
          .time{
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 2.24rem;
            height: 100%;
            justify-content: center;
            font-size: 0.42666rem;
            color: #bebdbe;
            p{
              padding-bottom: 0.266rem;
            }
            span{
              text-align: center;
            }
          }
        }
        .control{
          width: 5.333rem;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 10;
          .control_content{
            display: flex;
            li{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50%;
              font-size: 0.6666rem;
              color: #fff;
              margin-top: -1px;
              margin-bottom: -1px;
              &:nth-child(1) {
                background-color: #c7c7cb;
              }
              &:nth-child(2) {
                background-color: #eb4e3d;
              }
            }
          }
        }
      }
    }
  }

</style>
