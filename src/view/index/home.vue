<template>
  <div>
    <div class="banner-area">
      <video poster="../../assets/img/preMp4.png" loop autoplay muted playsinline webkit-playsinline="true" preload>
        <source src="../../assets/video/indexVideo.mp4" type="video/mp4">
      </video>
      <div class="mask"></div>
      <div class="index-title">
        <h1>校园体育<span class="title-interval"></span>提升健康</h1>
        <p>{{getTime()}}</p>
      </div>
    </div>
    <div class="pic-area">
      <h1>多元运动&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;畅享生活</h1>
      <p>每天锻炼一小时，健康工作50年，幸福生活一辈子</p>
      <div class="pic-container">
        <template v-for="(items,index) in detailPicList">
          <ul class="pic-list" :key="index">
            <li v-for="(item,index) in items" :key="index">
              <a href="#">
                <p>{{item.name}}</p>
                <img v-lazy="require('../../assets/img/index/sport/' + item.imgPath)"/>
              </a>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div class="description-area">
      <p class="description-slogan">校园PE，由青岛新体创体育产业集团有限公司研发，<span class="tablet"></span>青岛指尖跃动科技有限公司提供技术支持。<span class="pc"></span>校园PE旨在促进学生每天锻炼一小时，用运动时长获取PE体育学分，<span class="tablet"></span>保证学生运动时长，乐享健康生活。</p>
      <div class="description-container">
        <ul class="description-list">
          <li v-for="(item,index) in descriptionPicList" :key="index">
            <a href="#">
              <p>{{item.name}}</p>
              <img v-lazy="require('../../assets/img/index/description/' + item.imgPath)"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="carousel-area">
      <div class="carousel-container">
        <div class="carousel-font">
          <h3 class="title">校园PE<br/>健康生活每一天<br/>图片需替换掉！！</h3>
        </div>
      </div>
      <el-carousel :height="carouselHeight + 'px'" arrow="never">
        <el-carousel-item v-for="(item,index) in carouselList" :key="index">
          <img style="width: 100%;z-index: 0;" v-lazy="require('../../assets/img/index/carousel/' + item.imgPath)" />
        </el-carousel-item>
      </el-carousel>
    </div>
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
      ],
      carouselHeight: 600,
      carouselList: [
        {
          imgPath: 'bg1.jpg'
        },
        {
          imgPath: 'bg2.jpg'
        },
        {
          imgPath: 'bg3.jpg'
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
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        this.carouselHeight = 600
      } else if (window.innerWidth <= 1200) {
        this.carouselHeight = 0.5 * window.innerWidth
      }
    }, false)
  }
}
</script>

<style lang="less">

  .banner-area {
    position: relative;
    width: 100%;

    video {
      display: block;
      width: 100%;
      height: 100%;
    }

    .mask {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      right: 0;
      opacity: .5;
      background: #1C1D21;
    }
  }

  .index-title {
    position: absolute;
    display: inherit;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 200;

    h1 {
      font-size: 70px;
      color: #ffffff;
    }

    p {
      margin-top: 20px;
      font-size: 22px;
      color: #edecec;
    }
  }

  .title-interval {
    margin-left: 25px;
  }

  .pic-area {
    width: 100%;
    height: 975px;
    background-color: #efeff0;
    text-align: center;

    h1 {
      padding-top: 40px;
      font-size: 40px;
      color: #606464;
      font-family: 'siyuan',serif;
    }

    p {
      padding: 20px 0;
      font-size: 22px;
      font-style: italic;
      color: #5b6664;
    }
  }

  .pic-container {
    display: block;
    width: 1200px;
    margin: 0 auto;
  }

  .pic-list {
    display: block;
    height: 240px;
    margin-bottom: 15px;

    li {
      display: inline-block;
      float: left;
      height: 100%;
      width: 380px;
      text-align: center;
      margin: 0 10px;
      position: relative;
      overflow: hidden;

      p {
        display: block;
        float: left;
        font-size: 30px;
        height: auto;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 3;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        transform: translate(-50%, -50%);
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

  .description-area {
    width: 100%;
    background-color: #f7f7f7;
    text-align: center;
    height: 700px;
  }

  .description-slogan {
    text-align: center;
    font-size: 22px;
    font-style: italic;
    color: #606563;
    line-height: 60px;
    padding: 100px 0 80px 0;
    font-family: 'siyuan',serif;
    .pc {
      display: block;
    }
  }

  .description-container {
    display: block;
    width: 1200px;
    margin: 0 auto;
    padding: 0 0 80px 0;
  }

  .description-list {
    display: block;
    height: 240px;
    margin-bottom: 40px;

    li {
      display: inline-block;
      float: left;
      height: 100%;
      width: 380px;
      text-align: center;
      margin: 0 10px;
      position: relative;
      overflow: hidden;

      p {
        display: block;
        float: left;
        font-size: 30px;
        height: auto;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 3;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        transform: translate(-50%, -50%);
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

  .carousel-area {
    display: block;
    width: 100%;
    margin: 0 auto;
    position: relative;

    .carousel-container {
      width: 1240px;
      margin: 0 auto;
    }
  }

  .carousel-font {
    display: block;
    width: 450px;
    position: absolute;
    left: 6.6%;
    top: 16%;
    z-index: 666;

    .title {
      display: block;
      color: #2a2e2e;
      width: 450px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 36px;
      margin-bottom: 20px;
      font-style: italic;
    }
  }

  @media screen and (max-width: 1200px) {

    .title-interval {
      display: block;
    }
    .pic-area {
      height: calc(100vw * 7.5/12 + 160px);
    }

    .pic-container {
      width: 100%;
    }

    .pic-list {
      height: calc(100vw * 0.18);
      li {
        width: calc(33.33% - 20px);
        height: calc(100vw * 0.18);

        p {
          font-size: 24px;
        }
      }
    }

    .description-area {
      height: auto;
    }

    .description-list {
      height: calc(100vw * 0.18);
      li {
        width: calc(33.33% - 20px);
        height: calc(100vw * 0.18);

        p {
          font-size: 24px;
        }
      }
    }

    .description-slogan {
      font-size: 16px;
      padding: 60px 0 50px 0;
      line-height: 50px;
    }

    .description-container {
      width: 100%;
      padding-bottom: 60px;
    }

    .description-list {
      height: calc(100vw * 0.18);
      li {
        width: calc(33.33% - 20px);
        height: calc(100vw * 0.18);
      }
    }

    .carousel-font {
      .title {
        font-size: 30px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .index-title {
      display: none;
    }

    .pic-area {
      h1 {
        font-size: 32px;
      }
      p {
        font-size: 16px;
      }
    }

    .pic-list {
      li {
        p {
          font-size: 16px;
        }
      }
    }

    .description-container {
      padding-bottom: 40px;
    }

    .description-list {
      li {
        width: calc(33.33% - 10px);
        margin: 0 5px;
        p {
          font-size: 16px;
        }
      }
    }

    .description-slogan {
      font-size: 16px;
      line-height: 40px;
    }

    .tablet {
      display: block;
    }

    .carousel-font {
      .title {
        font-size: 24px;
      }
    }
  }

  @media screen and (max-width: 500px) {

    .pic-area {
      height: calc(100vw * 7.5/12 + 140px);
      h1 {
        font-size: 24px;
      }
      p {
        padding: 10px 0;
        font-size: 14px;
      }
    }

    .pic-list {
      li {
        p {
          font-size: 12px;
        }
      }
    }

    .description-list {
      margin-bottom: 20px;
      li {
        p {
          font-size: 12px;
        }
      }
    }

    .description-slogan {
      padding: 50px 0 40px 0;
      font-size: 12px;
      margin: 0 20px;
      line-height: 30px;
    }

    .tablet {
      display: none;
    }

    .carousel-font {
      .title {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 375px) {

    .pic-area {
      height: calc(100vw * 7.5/12 + 85px);
      h1 {
        padding-top: 25px;
        font-size: 18px;
      }
      p {
        padding: 10px 0;
        font-size: 10px;
      }
    }

    .pic-list {
      margin-bottom: 5px;
      li {
        width: calc(33.33% - 6px);
        margin: 0 3px;
      }
    }

    .description-list {
      margin-bottom: 10px;
    }

    .description-slogan {
      padding: 40px 0 30px 0;
      margin: 0 10px;
      font-size: 12px;
      line-height: 20px;
    }
  }
</style>
