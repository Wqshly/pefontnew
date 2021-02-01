<template>
  <div>
    <div class="banner-area">
      <video poster="../../assets/img/preMp4.png" loop autoplay muted playsinline>
        <source src="../../assets/video/indexVideo.mp4" type="video/mp4">
      </video>
      <div class="mask"></div>
      <div class="index-title">
        <h1>校园体育,提升健康</h1>
        <p>每天锻炼一小时，健康工作50年，幸福生活一辈子</p>
        <p>{{getTime()}}</p>
      </div>
    </div>
    <div class="description-area">
      <div class="description-container">
        <ul class="detail-list">
          <li v-for="(item,index) in descriptionPicList" :key="index">
            <a href="https://www.tencent.com/zh-cn/about.html#about-con-1">
              <p>{{item.name}}</p>
              <img v-lazy="require('../../assets/img/index/description/' + item.imgPath)"/>
            </a>
          </li>
        </ul>
      </div>
      <h1>PE校园-健康生活每一天</h1>
      <p>校园PE，由青岛新体创体育产业集团有限公司研发，青岛指尖跃动科技有限公司提供技术支持。</p>
      <p>校园PE旨在促进学生每天锻炼一小时，用运动时长获取PE体育学分，从而保证学生运动时长，乐享健康生活。</p>
    </div>
    <div class="detail-area">
      <h1>多元运动，畅享生活</h1>
      <div class="detail-container">
        <template v-for="(items,index) in detailPicList">
          <ul class="detail-list" :key="index">
            <li v-for="(item,index) in items" :key="index">
              <a href="https://www.tencent.com/zh-cn/about.html#about-con-1">
                <p>{{item.name}}</p>
                <img v-lazy="require('../../assets/img/index/sport/' + item.imgPath)"/>
              </a>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div class="link-area"></div>
  </div>
</template>

<script>
import {formatDate} from '@/commons/date'

export default {
  name: 'home',
  data () {
    return {
      detailPicList: [
        [
          {
            name: '帆船',
            imgPath: 'sailboat.jpg'
          },
          {
            name: '骑行',
            imgPath: 'bicycle.jpg'
          },
          {
            name: '游泳',
            imgPath: 'swimming.jpg'
          }
        ],
        [
          {
            name: '足球',
            imgPath: 'football.jpg'
          },
          {
            name: '篮球',
            imgPath: 'basketball.jpg'
          },
          {
            name: '排球',
            imgPath: 'volleyball.jpg'
          }
        ],
        [
          {
            name: '跨栏',
            imgPath: 'hurdle.jpg'
          },
          {
            name: '乒乓球',
            imgPath: 'tableTennis.jpg'
          },
          {
            name: '羽毛球',
            imgPath: 'badminton.jpg'
          }
        ]
      ],
      descriptionPicList: [
        {
          name: '公司简介',
          imgPath: 'company.png'
        },
        {
          name: '企业文化',
          imgPath: 'culture.png'
        },
        {
          name: '办公地点',
          imgPath: 'address.png'
        }
      ]
    }
  },
  methods: {
    getTime () {
      var date = new Date()
      return formatDate(date, 'yyyy年MM月dd日 星期w')
    }
  },
  created () {
  }
}
</script>

<style lang="less">

  .banner-area {
    position: relative;
    width: 100%;

    video {
      width: 100%;
      height: 100%;
    }

    .mask {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: -1px;
      opacity: .7;
      background: #1C1D21;
    }
  }

  .index-title {
    display: none;
  }

  .description-area {
    width: 100%;
    background-color: #efeff0;
    text-align: center;

    .description-container {
      display: block;
      width: 1260px;
      margin: 0 auto;
      height: 250px;
      padding: 80px 0;
    }
  }

  @media screen and (min-width: 1921px) {
  }

  @media screen and (min-width: 1441px) and (max-width: 1920px) {

    .index-title {
      position: absolute;
      display: inherit;
      top: 35%;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      font-weight: 200;

      h1 {
        font-size: 80px;
        color: #fff;
      }

      p {
        margin-top: 20px;
        font-size: 20px;
        color: #898888;
      }
    }

    .description-area {
      height: 1024px;
    }
  }

  .detail-area {
    width: 100%;
    height: 1024px;
    background-color: #f7f7f7;
    text-align: center;

    h1 {
      padding: 40px 0;
      font-size: 40px;
    }

    .detail-container {
      display: block;
      width: 1260px;
      margin: 0 auto;
      height: 250px;
    }
  }

  .detail-list {
    display: block;
    height: 250px;
    margin-bottom: 40px;

    li {
      display: inline-block;
      float: left;
      height: 100%;
      width: 400px;
      text-align: center;
      margin: 0 10px;
      position: relative;
      overflow: hidden;

      p {
        display: block;
        float: left;
        font-size: 30px;
        height: 40px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -20px;
        z-index: 3;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        transform: translate(-50%, 0);
        transition: border-bottom 0.3s ease-out;
        padding-bottom: 5px;
      }

      p:after {
        content: '';
        width: 0;
        height: 2px;
        background: #fff;
        bottom: -2px;
        left: 0;
        position: absolute;
        opacity: 0;
        -webkit-transition: all 0.2s linear;
      }

      img {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        transform: scale(1);
        transition: transform 0.3s ease-out;
      }

      a {
        display: block;
        height: 100%;
        width: 100%;
      }

      a:after {
        display: block;
        content: '';
        height: 100%;
        width: 100%;
        background: rgba(0, 82, 217, 0.7);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }

      a:hover {
        img {
          transform:scale(1.024);
        }
        &:after {
          opacity: 0.5;
        }
        p:after {
          opacity: 1;
          left: 0;
          width: 100%;
        }
      }
    }
  }

  .link-area {
    width: 100%;
    height: 500px;
    background-color: #efeff0;
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
  }

  @media screen and (min-width: 801px) and (max-width: 1024px) {
  }

  @media screen and (max-width: 375px) {
  }
</style>
