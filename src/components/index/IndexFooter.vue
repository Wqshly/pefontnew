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
        <div class="contact-us">
          <div class="title-area">
            <h2 class="title">商务合作</h2>
            <i class="icon el-icon-arrow-down"></i>
          </div>
          <ul class="contact-list">
            <li v-for="(item,index) in contactList" :key="index">
              <a :href="item.path">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="legal-info">
          <div class="title-area">
            <h2 class="title">法律信息</h2>
            <i class="icon el-icon-arrow-down"></i>
          </div>
          <ul class="legal-list">
            <li v-for="(item,index) in legalList" :key="index">
              <a :href="item.path">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="join-us">
          <div class="title-area">
            <h2 class="title">友情链接</h2>
            <i class="icon el-icon-arrow-down"></i>
          </div>
          <ul class="join-list">
            <li v-for="(item,index) in joinList" :key="index">
              <a :href="item.path">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="logo">
          <img style="height: 100%;" v-lazy="require('../../assets/img/largePE.png')">
        </div>
        <div class="bottom-area">
          <div class="left-link-area">
            <div class="left-link">
              <a href="http://beian.miit.gov.cn/">鲁ICP备20031781号-1</a>
            </div>
            <div class="left-link">
              <a href="http://beian.miit.gov.cn/">鲁ICP备20031781号-1</a>
            </div>
            <div class="left-link">
              <a href="http://beian.miit.gov.cn/">鲁ICP备20031781号-1</a>
            </div>
          </div>
          <div class="copyright">Copyright © 2018 - 2021 青岛新体创体育产业集团有限公司 版权所有</div>
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
      ]
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
    width: 1200px;
    margin: 0 auto;
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

      .icon-style {
        display: block;
        float: left;
        height: 28px;
        width: 28px;
        margin-left: 28px;
        color: #5f6464;
      }
    }
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

  .join-us, .contact-us, .legal-info {
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
    left: 0;

    .left-link-area .left-link {
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
    }
  }

  @media screen and (min-width: 768px){
    .join-us, .contact-us, .legal-info {
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
  }
</style>
