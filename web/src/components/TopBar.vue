<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/logo.svg" alt="" class="logo-img">
      <p class="logo-name">一页倾言</p>
    </div>
    <div class="menu">
      <Btn size="base" :nom="id == 0 ? 'cprimary' : 'csecondary'" class="menu-message" @click="changeWall(0)">留言墙</Btn>
      <Btn size="base" :nom="id == 1 ? 'cprimary' : 'csecondary'" class="menu-photo" @click="changeWall(1)">照片墙</Btn>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// const max = ref<string>('base');
// const primary = ref<string>('primary');
// const secondary = ref<string>('secondary');
import { useRoute, useRouter } from 'vue-router'


// 路由
const $route = useRoute()
const $router = useRouter()
const id = ref(Number($route.query.id));

// 切换留言墙或照片墙
const changeWall = (e: number) => {
  $router.push({ query: { id: e } })
}

// 监听 $route 变化，更新 id
watch(() => $route.query.id,
  (newId) => {
    id.value = Number(newId);
  }
);

</script>

<style scoped lang="less">
// @import '@/styles/commons.less';

.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  .logo {
    display: flex;
    align-items: center;
    width: 200px;

    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }

  .menu {

    .menu-message {
      margin-right: 24px;
    }
  }

  .user {
    width: 200px;
    display: flex;
    justify-content: end;

    .user-head {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-image: linear-gradient(1808deg, #3BE7EE 2%, #1EB5E2 3%);
    }
  }
}
</style>