<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img src="@/assets/images/logo.svg" alt="">
          <p class="logo-name">一页倾言</p>
        </div>
        <p class="top-p">一页倾言是本人独自开发，为便于与用户交流的留言平台</p>
        <p class="top-p">用户将留言和照片贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。</p>
        <p class="state"><span>声明</span><span>备案/许可证xxxxxxxxx</span><span>备案/许可证xxxxxxxxx</span> </p>
      </div>
      <dvi class="link">
        <p class="title">链接</p>
        <div class="line-inner">
          <a href="#" target="_self" class="link-name">一页倾言</a>
          <a href="#" target="_self" class="link-name">b站</a>
          <a href="#" target="_self" class="link-name">github</a>
        </div>
      </dvi>
      <div class="foot-right">
        <p class="title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="@/assets/images/wx.jpg" alt="">
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="@/assets/images/zfb.jpg" alt="">
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.foot-bar {
  width: 100%;
  height: 185px;
  background-color: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 40px;

  .foot-bar-inner {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    // align-items: center;

    p {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .foot-left {
    padding-left: 100px;

    .logo {
      display: flex;
      margin-bottom: 24px;

      .logo-name {
        font-size: 20px;
        color: @gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }

    .top-p {
      font-size: @size-12;
      padding-bottom: 4px;
      width: 400px;
    }

    .state {
      font-size: @size-12;
      padding-top: 10px;

      span {
        padding-right: 20px;
      }
    }
  }

  .link {
    padding-left: 100px;
    flex: 1;

    .line-inner {
      margin-top: 10px;

      a {
        color: rgba(255, 255, 255, 0.5);
        padding-right: 20px;
      }
    }
  }

  .foot-right {
    .title {
      font-size: @size-16;
      padding-bottom: 10px;
    }

    .right-inner {
      display: flex;

      img {
        width: 100px;
        height: 100px;
        padding-right: 60px;
      }

      .ds-title {
        font-size: @size-12;
        // padding-right: 40px;
      }
    }
  }
}
</style>