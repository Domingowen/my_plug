<template>
  <div class="contact_list">
    <slider-touch>
      <ul class="contact_content">
        <li v-for="(item, index) in contactSort" v-if="item.data.length!==0">
         <h1>{{item.letter}}</h1>
          <ul>
            <li v-for="(item, index) in item.data">
              {{item}}
            </li>
          </ul>
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
import pinyin from 'tiny-pinyin';
export default {
  name: 'we-chat-contact',
  data () {
    return {
      contactList: [
        {
          name: '沈',
          imgUrl: ''
        },
        {
          name: '曾国藩',
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
          name: '长',
          imgUrl: ''
        },
        {
          name: '好',
          imgUrl: ''
        },
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
          name: '就',
          imgUrl: ''
        },
        {
          name: 'AMXMEI',
          imgUrl: ''
        },
        {
          name: 'B',
          imgUrl: ''
        },
        {
          name: 'C',
          imgUrl: ''
        },
        {
          name: 'D',
          imgUrl: ''
        },
        {
          name: 'E',
          imgUrl: ''
        },
        {
          name: 'F',
          imgUrl: ''
        },
        {
          name: 'G',
          imgUrl: ''
        },
        {
          name: 'H',
          imgUrl: ''
        },
        {
          name: 'I',
          imgUrl: ''
        },
        {
          name: 'J',
          imgUrl: ''
        },
        {
          name: 'K',
          imgUrl: ''
        },
        {
          name: 'L',
          imgUrl: ''
        },
        {
          name: 'N',
          imgUrl: ''
        },
        {
          name: 'M',
          imgUrl: ''
        },
        {
          name: 'O',
          imgUrl: ''
        },
        {
          name: 'P',
          imgUrl: ''
        },
        {
          name: 'Q',
          imgUrl: ''
        },
        {
          name: 'R',
          imgUrl: ''
        },
        {
          name: 'S',
          imgUrl: ''
        },
        {
          name: 'T',
          imgUrl: ''
        },
        {
          name: 'U',
          imgUrl: ''
        },
        {
          name: 'V',
          imgUrl: ''
        },
        {
          name: 'W',
          imgUrl: ''
        },
        {
          name: 'S',
          imgUrl: ''
        },
        {
          name: 'Y',
          imgUrl: ''
        },
        {
          name: 'Z',
          imgUrl: ''
        }
      ],
      contactPinyin: [],
      currentIndex: 0,
      contactSort: []
    };
  },
  mounted () {
    // let co = new Intl.Collator(["zh-Hans-CN"]);
    // console.log(co.compare("温广城", "曾国藩"));
    // co.compare("a", "b"); // Returns -1
    // pinyin.parse()
    for (let i = 65; i < 91; i++) {
      this.contactPinyin.push(String.fromCharCode(i));
    }
    this.contactPinyin.forEach((oVal, oIndex, arr) => {
      let obj = {letter: oVal, data: []};
      this.contactList.forEach((val, index, arr) => {
        // console.log(pinyin.parse(val.name));
        // if ((!oVal || oVal.localeCompare(pinyin.parse(val.name)[0].target) <= 0) && pinyin.parse(val.name)[0].target.localeCompare(oVal) == -1) {
        //   obj.data.push(val.name);
        // }
        // if (oVal === pinyin.parse(val.name)[0].target) {
          // obj.data.push(val)
        // }
        // console.log(oVal.localeCompare(pinyin.parse(val.name)[0].target) <= 0 && pinyin.parse(val.name)[0].target.localeCompare(oVal) === -1)
        if (oVal === pinyin.parse(val.name)[0].target.split('')[0]) {
          obj.data.push(val.name)
        }
      });
      this.contactSort.push(obj);
    });
    console.log(this.contactSort);

    // this.contactList.sort((param1, param2) => {
    //   return pinyin.parse(param1.name)[0].target.localeCompare(pinyin.parse(param2.name)[0].target)
    // })
    // this.contactSort = this.contactList.sort((param1, param2) => {
    //   return param1.name.localeCompare(param2.name, 'zh-Hans-CN', {sensitivity: 'accent'});
    // });
    //
    // console.log('长'.localeCompare('温广城','zh-Hans-CN'));
    // console.log(this.contactSort);
  },
  components: {
    SliderTouch
  }
}
</script>
<style scoped lang="scss">
  .contact_content{
    li{
      line-height: 1rem;
      font-size: 0.4rem;
      /*border-bottom: 1px solid #f0f0f0;*/
      h1{
        font-size: 0.4rem;
        background-color: #e75297;
        color: #ffffff;
      }
      li{
        padding-left: 0.4rem;
      }
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
