<template>
<div class="">
	<div class="l-vehicle-manager-apikey">
		<div class="m-vehicle-manager-apikey">
			<form @submit.prevent="setApiKey">
				Api key:
				<input
					type="text"
					placeholder="(api key goes here)"
					v-model="apiKey"
				>
				<button type="submit">Go</button>
				<span class="alert--error" :error="error">{{ error }}</span>
			</form>
		</div>
	</div>

	<div
		class="l-vehicle-manager"
		v-show="show.vehicleManager"
	>
		<div class="l-vehicle-manager__sidebar">
			<VehicleList
				:vehicles="vehicles"
				@getVehicleRawData="getVehicleRawData"
			/>
			<RouteInfo
				:waypoints="vehicleRawData"
				:key="selectedVehicle"
				:setSelectedVehicleDate="setSelectedVehicleDate"
				v-show="show.routeInfo"
			/>
		</div>

		<div class="l-vehicle-manager__map">
			<GmapMap
				:center="{lat: 58.3769992, lng: 26.72499}"
				:zoom="12"
				map-type-id="terrain"
				class="m-vehicle-manager__map"
			>

			<GmapMarker
				:key="index"
				v-for="(m, index) in vehicles"
				:position="m.geocode"
				:clickable="true"
				:draggable="false"
				@click="mapCenter=m.geocode"
			/>
			</GmapMap>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import RouteInfo from './RouteInfo.vue'
import VehicleList from './VehicleList.vue'

export default {
	name: 'VehicleManager',
	components: {
		RouteInfo,
		VehicleList,
	},
	data() {
		return {
			apiKey: '',
			selectedVehicle: null,
			selectedVehicleDate: {
				begTimestamp: '',
				endTimestamp: '',
			},
			vehicles: [],
			vehicleRawData: [],
			show: {
				routeInfo: false,
				vehicleManager: false,
			},
			error: '',
		}
	},
	methods: {
		setApiKey() {
			this.getVehicleLastData()
		},
		renderError(error) {
			this.error = error
			this.$forceUpdate();
		},
		getVehicleLastData() {
			const searchParams = String(
				new URLSearchParams([
					['key', this.apiKey],
				])
			) + '&json'

			// this should work on Netlify
			const endopointUrl = `https://app.ecofleet.com/seeme/Api/Vehicles/getLastData?key=${this.apiKey}&json`

			axios.get(
				endpointUrl,
				{
					// searchParams,
					responseType: 'json',
				}
			)
			.then(response => {
				this.vehicles = response.data.map(this.addVehicleGeocode)
				this.show.vehicleManager = true
			})
			.catch(error => (
				this.error = error.response.data.message
			))
		},
		getVehicleRawData(
			vehicleId
		) {
			this.setVehicleDate()

			const searchParams = String(
				new URLSearchParams([
					['key', this.apiKey],
					['objectId', vehicleId],
					['begTimestamp', this.selectedVehicleDate.begTimestamp],
					['endTimestamp', this.selectedVehicleDate.endTimestamp],
				])
			) + '&json'

			// this should work on Netlify
			const endpointUrl = `https://app.ecofleet.com/seeme/Api/Vehicles/getRawData?key=${this.apiKey}&objectId=${objectId}&begTimestamp=${this.selectedVehicleDate.begTimestamp}&endTimestamp=${this.selectedVehicleDate.endTimestamp}&json`

			axios.get(
				endpointUrl,
				{
					// searchParams,
					responseType: 'json',
				}
			)
			.then(response => {
				this.show.routeInfo = true
				this.vehicleRawData = response.data
				this.selectedVehicle = vehicleId
				this.mapCenter = this.addVehicleGeocode(response.data[0])
			})
			.catch(error => (
				this.error = error.response.data.message
			))
		},
		setVehicleDate(begTimestamp = moment()) {
			this.selectedVehicleDate.begTimestamp =  moment(begTimestamp).format("DD-MM-YYYY")
			this.selectedVehicleDate.endTimestamp =  moment(begTimestamp).add(1, 'day').format("DD-MM-YYYY")
		},
		addVehicleGeocode(vehicle) {
			vehicle.geocode = {
				lat: vehicle.latitude,
				lng: vehicle.longitude
			}
			return vehicle
		},
	},
}
</script>

<style lang="scss" scoped>
.m-vehicle-manager-apikey {
	border-bottom: 1px solid black;
	margin-bottom: .8rem;
	padding-bottom: .8rem;
	padding-top: .8rem;
}
</style>
