<template>
  <div class="wall-index">
    <TopBar></TopBar>
    <div class="bg-color"></div>
    <router-view></router-view>
    <FootBar></FootBar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { signIpApi } from '../api/index.js'
import store from '../store/index.js'


const getUser = () => {
  signIpApi().then((res: any) => {
    // console.log(res);
    let user = {
      id: res.ip,
    }
    store.commit('getUser', user);
    // console.log(user.id);
  })
}

onMounted(() => {
  getUser();
})

</script>

<style scoped lang="less"></style>