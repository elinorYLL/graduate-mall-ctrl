<template>
  <div id="app" class="g-container">
    <div class="g-heder-container">
      <c-header></c-header>
    </div>
    <div class="g-main-container">
      <div class="g-left-container">
       <c-tab></c-tab>
      </div>
      <div class="g-right-container">
         <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CTab from "./components/tab/index.vue";
import CHeader from "./components/header/index.vue";
export default {
  name: 'App',
  components: {
    CTab,
    CHeader
  }
}
</script>

<style>
.g-heder-container{
  width: 100%;
  height: 50px;
}
.g-main-container{
  display: flex;
  /* border: 1px solid red; */
}
.g-left-container{
  width: 202px;
  overflow: hidden;
  height: 100vh;
  /* border: 1px solid red; */
}
.g-right-container{
  flex-grow: 1;
  height:100vh;
  overflow: hidden;
  /* border: 1px solid red; */
}

</style>
