<template>
<div class="m-table">
	<div class="m-table-row m-table-row__title">
		<div class="m-table-row__cell m-table-row__cell__name">
			Name
		</div>
		<div class="m-table-row__cell m-table-row__cell__value">
			Speed
		</div>
		<div class="m-table-row__cell m-table-row__cell__value">
			Last update
		</div>
	</div>
	<div
		v-for="vehicle in vehicles"
		:key="vehicle.objectId"
		@click="getVehicleRawData(vehicle.objectId)"
		class="m-table-row"
	>
		<div class="m-table-row__cell m-table-row__cell__name">
			{{vehicle.plate}}
		</div>
		<div class="m-table-row__cell m-table-row__cell__value">
			{{vehicle.speed}}
			<span v-if="Number(vehicle.speed)"> km/h</span>
		</div>
		<div class="m-table-row__cell m-table-row__cell__value">
			{{vehicle.timestamp | moment("dddd, MMMM Do YYYY")}}
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'VehicleList',
	props: {
		vehicles: Array,
	},
	methods: {
		getVehicleRawData(vehicleId) {
			this.$emit(
				'getVehicleRawData',
				vehicleId
			)
		}
	}
}
</script>

<style lang="scss" scoped>
	.m-table-row {
		display: grid;
		grid-template-columns:  10ch 10ch auto;
	}
</style>
