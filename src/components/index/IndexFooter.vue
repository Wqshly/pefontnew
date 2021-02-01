<template>
    <div class="footer">
      <div class="foot-container">
        <h2 class="row" style="color: white;">联系PE校园</h2>
        <p class="row">高校入驻，定制业务，商务合作</p>
        <div class="row icon-group">
          <el-popover placement="top" trigger="hover">
            <div class="popover-content">
              <div>联系电话： 15315510691‬</div>
            </div>
            <font-awesome-icon class="icon-style" :icon="['fas', 'phone-alt']" slot="reference"></font-awesome-icon>
          </el-popover>
          <el-popover placement="top" trigger="hover">
            <div class="popover-content">
              <div>联系电话： 15315510691‬</div>
            </div>
            <font-awesome-icon class="icon-style" :icon="['fas', 'map-marker-alt']" slot="reference"></font-awesome-icon>
          </el-popover>
          <el-popover placement="top" trigger="hover">
            <div class="popover-content">
              <div>联系电话： 15315510691‬</div>
            </div>
            <font-awesome-icon class="icon-style" :icon="['fas', 'handshake']" slot="reference"></font-awesome-icon>
          </el-popover>
        </div>
        <p>
          青岛新体创体育产业集团有限公司 版权所有 鲁ICP备20031781号-1
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'IndexFooter'
}
</script>

<style scoped>

  .footer {
    width: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1B1C20;
    color: #8B8B8B;
    overflow: hidden;
    height: 400px;
  }

  .foot-container {
    width: 500px;
    height: fit-content;
  }

  .row{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }

  .icon-group {
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .icon-style {
    font-size: 30px;
    margin: 0 20px;
  }

  p {
    margin: 10px 0;
    text-align: center;
    color: #60606d;
    font-size: 12px;
  }
</style>
