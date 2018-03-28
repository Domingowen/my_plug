<template>
  <div class="contact_list">
    <slider-touch>
      <ul class="contact_content">
        <li v-for="(item, index) in contactList">
          {{item.name}}
        </li>
      </ul>
    </slider-touch>
    <ul class="contact_sidebar">
      <li v-for="(item, index) in contactPinyin" :class="currentIndex === index?'active':''">
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
import SliderTouch from './slider-touch';

export default {
  name: 'we-chat-contact',
  data () {
    return {
      contactList: [
        {
          name: '啊',
          imgUrl: ''
        },
        {
          name: '吧',
          imgUrl: ''
        },
        {
          name: '才',
          imgUrl: ''
        },
        {
          name: '的',
          imgUrl: ''
        },
        {
          name: '额',
          imgUrl: ''
        },
        {
          name: '发',
          imgUrl: ''
        },
        {
          name: '个',
          imgUrl: ''
        },
        {
          name: '好',
          imgUrl: ''
        },
        {
          name: '就',
          imgUrl: ''
        },
        {
          name: 'AMXMEI',
          imgUrl: ''
        },
        {
          name: 'BMXMEI',
          imgUrl: ''
        },
        {
          name: 'CMXMEI',
          imgUrl: ''
        }, {
          name: 'DMXMEI',
          imgUrl: ''
        },
        {
          name: 'EMXMEI',
          imgUrl: ''
        },
        {
          name: 'FMXMEI',
          imgUrl: ''
        },
        {
          name: 'GMXMEI',
          imgUrl: ''
        },
        {
          name: 'HMXMEI',
          imgUrl: ''
        },
        {
          name: 'IMXMEI',
          imgUrl: ''
        },
        {
          name: 'JMXMEI',
          imgUrl: ''
        },
        {
          name: 'KMXMEI',
          imgUrl: ''
        },
        {
          name: 'LMXMEI',
          imgUrl: ''
        },
        {
          name: 'NMXMEI',
          imgUrl: ''
        },
        {
          name: 'MMXMEI',
          imgUrl: ''
        },
        {
          name: 'OMXMEI',
          imgUrl: ''
        },
        {
          name: 'PMXMEI',
          imgUrl: ''
        },
        {
          name: 'QMXMEI',
          imgUrl: ''
        },
        {
          name: 'RMXMEI',
          imgUrl: ''
        },
        {
          name: 'SMXMEI',
          imgUrl: ''
        },
        {
          name: 'TMXMEI',
          imgUrl: ''
        },
        {
          name: 'UMXMEI',
          imgUrl: ''
        },
        {
          name: 'VMXMEI',
          imgUrl: ''
        },
        {
          name: 'WMXMEI',
          imgUrl: ''
        },
        {
          name: 'SMXMEI',
          imgUrl: ''
        },
        {
          name: 'YMXMEI',
          imgUrl: ''
        },
        {
          name: 'ZMXMEI',
          imgUrl: ''
        }
      ],
      contactPinyin: [],
      currentIndex: 0,
      contactSort: []
    };
  },
  mounted () {
    for (let i = 65; i < 91; i++) {
      this.contactPinyin.push(String.fromCharCode(i));
    }

    this.contactPinyin.forEach((val, index, arr) => {
      let obj = {letter : val, data:[]};

    });
    this.contactSort = this.contactList.sort((param1, param2) => {
      return param1.name.localeCompare(param2.name, 'zh');
    });
    console.log(this.contactSort);
  },
  components: {
    SliderTouch
  }
}
</script>
<style scoped lang="scss">
  .contact_content{
    li{
      height: 1rem;
      line-height: 1rem;
      padding-left: 0.2rem;
      font-size: 0.4rem;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .contact_sidebar{
    position: absolute;
    right: 0;
    top: 50%;
    width: 0.5rem;

    color: #666666;
    font-size: 0.4rem;
    text-align: center;
    transform: translate3d(0,-50%,0);
    li{
      list-style: none;
    }
    li.active{
      background-color: #1abc9c;
      color: #fff;
    }
  }
</style>
