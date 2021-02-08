<template>
  <div class="footer">
    <div class="foot-container">
      <div class="share-us">
        <h2 class="title">了解实时动态，请关注：</h2>
        <div class="icon-list-style">
          <el-popover placement="top-start" width="200" trigger="hover">
            <img style="width: 200px;height: 200px;" src="../../assets/img/index/shareIcon/wechart.jpg"/>
            <font-awesome-icon slot="reference" :icon="['fab', 'weixin']" class="icon-style"></font-awesome-icon>
          </el-popover>
          <font-awesome-icon :icon="['fab', 'twitter']" class="icon-style"></font-awesome-icon>
          <font-awesome-icon :icon="['fab', 'weibo']" class="icon-style"></font-awesome-icon>
        </div>
      </div>
      <div class="friendly-link" @click="listControl($event)">
        <div class="title-area">
          <h2 class="title">友情链接</h2>
          <i class="icon el-icon-arrow-down"></i>
        </div>
        <ul class="friendly-link-list">
          <li v-for="(item,index) in joinList" :key="index">
            <a :href="item.path">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="cooperation" @click="listControl($event)">
        <div class="title-area">
          <h2 class="title">商务合作</h2>
          <i class="icon el-icon-arrow-down"></i>
        </div>
        <ul class="cooperation-list">
          <li v-for="(item,index) in contactList" :key="index">
            <a :href="item.path">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="legal-info" @click="listControl($event)">
        <div class="title-area">
          <h2 class="title">法律信息</h2>
          <i class="icon el-icon-arrow-down"></i>
        </div>
        <ul class="legal-info-list">
          <li v-for="(item,index) in legalList" :key="index">
            <a :href="item.path">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="logo">
        <img style="height: 100%;" v-lazy="require('../../assets/img/largePE.png')">
      </div>
      <div class="bottom-area">
        <div class="copyright">Copyright © 2020 - 2021 www.xiaoyuanpe.com<br/> 青岛新体创体育产业集团有限公司 版权所有</div>
        <div style="width: 100%;height: auto;">
          <div class="mobile-left-link-container">
            <div class="left-link" v-for="(item,index) in linkList" :key="index">
              <a :href="item.path" target="_blank">{{item.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexFooter',
  data () {
    return {
      contactList: [
        {
          name: '产品购买',
          path: '#'
        },
        {
          name: '客户服务',
          path: '#'
        },
        {
          name: '广告推广',
          path: '#'
        }
      ],
      legalList: [
        {
          name: '隐私政策',
          path: '#'
        },
        {
          name: '服务协议',
          path: '#'
        },
        {
          name: '知识产权',
          path: '#'
        },
        {
          name: '法律声明',
          path: '#'
        }
      ],
      joinList: [
        {
          name: '网站A',
          path: '#'
        },
        {
          name: '网站B',
          path: '#'
        },
        {
          name: '网站C',
          path: '#'
        },
        {
          name: '网站D',
          path: '#'
        }
      ],
      linkList: [
        {
          name: '站点地图',
          path: 'http://beian.miit.gov.cn/'
        },
        {
          name: '鲁ICP备20031781号-1',
          path: 'http://beian.miit.gov.cn/'
        }
      ]
    }
  },
  methods: {
    listControl (e) {
      e.target.parentNode.parentNode.classList.toggle('show-sublist')
      e.target.parentNode.childNodes[2].classList.toggle('el-icon-arrow-down')
      e.target.parentNode.childNodes[2].classList.toggle('el-icon-arrow-up')
    }
  }
}
</script>

<style lang="less" scoped>

  .footer {
    width: 100%;
    height: 480px;
    background: #fbfbfb;
    z-index: 1;
    display: flex;
    position: relative;
  }

  .foot-container {
    width: 1150px;
    margin: 0 auto;
    padding: 0;
    height: 480px;
    position: relative;

    .title {
      display: block;
      font-size: 20px;
      color: #5f6464;
      font-weight: normal;
      margin-bottom: 30px;
    }

    .icon-list-style {
      float: left;
    }
  }

  .icon-style {
    display: block;
    float: left;
    height: 28px;
    width: 28px;
    margin-left: 28px;
    color: #5f6464;
  }

  .share-us {
    display: block;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ebecf0;
    padding-top: 35px;
    margin-bottom: 40px;

    .title {
      float: left;
    }
  }

  .friendly-link, .cooperation, .legal-info {
    float: left;
    width: 220px;

    ul li a {
      display: block;
      font-size: 16px;
      color: #5f6464;
      font-weight: normal;
      margin-bottom: 18px;
    }
  }

  .bottom-area {
    display: block;
    width: 100%;
    position: absolute;
    bottom: 40px;
  }

  .left-link {
    float: left;
    margin-right: 20px;
    a {
      font-size: 16px;
      color: #4d5d5d;
      margin-bottom: 0;
    }
  }

  .copyright {
    font-size: 16px;
    color: #5a5f5f;
    float: right;

    br {
      display: none;
    }
  }

  .friendly-link, .cooperation, .legal-info {
    .icon {
      display: none;
    }
  }

  .logo {
    display: block;
    height: 50px;
    position: absolute;
    right: 120px;
    top: 50%;
    transform: translate(0, -50%);
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {

    .foot-container {
      width: 95%;
    }

    .friendly-link, .cooperation, .legal-info {
      width: 18%;
    }

    .left-link {
      a {
        font-size: 14px;
      }
    }

    .copyright {
      width: 100%;
      overflow: hidden;
    }

  }

  @media screen and (max-width: 768px) {

    .footer {
      height: auto;
    }

    .foot-container {
      height: auto;
      width: 100%;
    }

    .share-us {
      display: block;
      height: 30px;
      width: 100%;
      border-bottom: none;
      padding-top: 30px;
      margin-bottom: 20px;

      .title {
        font-size: 16px;
        margin-left: 25px;
      }
    }

    .friendly-link, .cooperation, .legal-info {
      width: 100%;
      float: none;
      overflow: hidden;
      cursor: pointer;

      .title-area {
        display: block;
        height: 52px;
        line-height: 52px;
        position: relative;
      }

      ul li a {
        font-size: 14px;
      }

      .friendly-link-list, .cooperation-list, .legal-info-list {
        display: block;
        height: 0;
        transition: height 0.3s ease-out;
        li {
          margin-left: 50px;
        }
      }

      .title {
        font-size: 16px;
        margin-left: 25px;
        margin-right: 25px;
        margin-bottom: 0;
      }

      .icon {
        display: block;
        height: 12px;
        width: 12px;
        background-size: contain;
        position: absolute;
        right: 25px;
        top: 20px;
        transition: transform 0.2s ease-out;
      }
    }

    .friendly-link.show-sublist ul {
      height: 150px;
    }

    .cooperation.show-sublist ul {
      height: 110px;
    }

    .legal-info.show-sublist ul {
      height: 150px;
    }

    .icon-style {
      display: block;
      float: left;
      height: 16px;
      width: 16px;
      margin: 5px 0 0 28px;
      color: #5f6464;
    }

    .logo {
      display: none;
    }

    .copyright {
      float: none;
      font-size: 12px;
      br {
        display: block;
      }
    }

    .bottom-area {
      position: static;
      text-align: center;

      .mobile-left-link-container {
        width: 310px;
        margin: 10px auto;
        height: auto;
      }

      .left-link {
        margin: 0 0 20px 30px;
      }
    }
  }
</style>
