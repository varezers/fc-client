import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBrI4_uiUK-90QRz7znumj5ROfERq0qS5E',
		libraries: 'places', // This is required if you use the Autocomplete plugin
	},

	installComponents: true
})

Vue.use(require('vue-moment'))

new Vue({
	render: h => h(App),
}).$mount('#app')
