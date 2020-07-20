<template>
<div>
	<div class="m-vehicle-date">
		<form @submit.prevent="setVehicleDate()">
			Date:
			<input
				type="date"
				v-model="vehicleRouteDate"
			>
			<button type="submit">Go</button>
		</form>
	</div>
	<div class="m-table">
		<div class="m-table-row">
			<div class="m-table-row__cell">
				Total Distance
			</div>
			<div class="m-table-row__cell">
				{{totalDistance}}
				<span v-if="Number(totalDistance)"> km</span>
			</div>
		</div>
		<div class="m-table-row">
			<div class="m-table-row__cell">
				Number of stops
			</div>
			<div class="m-table-row__cell">
				{{numberOfStops}}
			</div>
		</div>
		<div class="m-table-row">
			<div class="m-table-row__cell">
				Shortest possible distance
			</div>
			<div class="m-table-row__cell">
				{{shortestPossibleDistance}}
				<span v-if="Number(shortestPossibleDistance)"> km</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'RouteInfo',
	props: {
		waypoints: Array,
		totalDistance: String,
		numberOfStops: String,
		shortestPossibleDistance: String,
	},
	mounted() {
		this.getTotalDistance()
		this.getNumberOfStops()
		this.getShortestPossibleDistance()
	},
	methods: {
		getTotalDistance() {
			const firstWaypoint = this.waypoints[0]
			const lastWaypoint = this.waypoints[this.waypoints.length -1]

			if (
				!('Distance' in firstWaypoint) ||
				!('Distance' in lastWaypoint)
			) {
				this.totalDistance = 'N/A'
				return
			}

			this.totalDistance = Math.round(
				lastWaypoint.Distance - firstWaypoint.Distance
			)
		},
		getNumberOfStops() {
			this.numberOfStops = this.waypoints.length
		},
		getShortestPossibleDistance() {
			this.shortestPossibleDistance = 0
		},
		setVehicleDate(vehicleRouteDate) {
			this.$emit(
				'setVehicleDate',
				vehicleRouteDate
			)
		}
	}
}
</script>

<style lang="scss" scoped>
	.m-table-row {
		display: grid;
		grid-template-columns: auto 20ch;
	}
</style>
