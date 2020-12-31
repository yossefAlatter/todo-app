import Vue from 'vue'
import App from './App.vue'

//== import jquery ==//
//== start ==//
import 'jquery'
//== end ==//

//== import jquery.niceScroll ==//
//== start ==//
import 'jquery.nicescroll'
//== end ==//

//== import jquery.ui ==//
//== start ==//
import 'jquery-ui';
import 'jquery-ui/ui/jquery-1-7';
//== end ==//

//== import bootstrap ==//
//== start ==//
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//== import general style ==//
//== start ==//
import './general_style/main.scss'
//== end ==//

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
