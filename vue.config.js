module.exports = {
	devServer: {
		proxy: {
			"/api": {
				target: "https://stark-thicket-32896.herokuapp.com:8081",
				ws: true,
				changeOrigin: true
			}
		},
		disableHostCheck: true
	}
}
