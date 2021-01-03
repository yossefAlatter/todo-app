<template>
  <div id="app">
    <!-- AppBg -->
    <!-- start -->
    <app-bg />
    <!-- end -->

    <!-- MainBody -->
    <!-- start -->
    <main-body />
    <!-- end -->
    <error-msg id="myerror" />
  </div>
</template>

<script>
//== import components ==//
//== start ==//
import AppBg from './components/AppBg.vue'
import MainBody from './components/MainBody.vue'
//== end ==//

//== import jquery ==//
import $ from 'jquery';
import ErrorMsg from './components/ErrorMsg.vue';

export default {
  components: { AppBg, MainBody, ErrorMsg },

  name: 'App',

  mounted(){

    //== add niceScroll to all document ==//
    //== start ==//
    $('#app').niceScroll({
      cursorcolor: 'var(--color1)',
      cursorwidth: '5px',
      cursorborder: 'none',
      cursorfixedheight: 400 ,
    })
    $("#app").getNiceScroll().resize();
    //== end ==//

  }
  
}
</script>

<style lang="scss">
#app{
  height: 100vh;
  overflow-y: auto;
}
#myerror{
display: none;
}
//== media of app ==//
//== start ==//
@media screen and (max-width: 630px) {
   #app{
     padding: 24px;
   } 
}
@media screen and (max-width: 360px) {
   #app{
     padding: 17px;
   } 
}
@media screen and (max-width: 320px) {
   #app{
     padding: 13px;
   } 
}
//== end ==//

</style>
