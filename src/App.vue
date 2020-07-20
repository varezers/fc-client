<template>
<div id="app">
	<VehicleManager/>
</div>
</template>

<script>
import VehicleManager from './components/VehicleManager.vue'

export default {
	name: 'App',
	components: {
		VehicleManager,
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
