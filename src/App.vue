<template>
	<div id="app">
		<h1 class="heading">ycloud school individual project</h1>

		<div class="left-container">
			<points-list/>
			<points-new/>
			<points-geo/>
		</div>

		<div class="right-container">
			<the-map/>
		</div>


	</div>
</template>

<script>
    import pointsList from "./components/pointsList";
    import pointsNew from "./components/pointsNew";
    import pointsGeo from "./components/pointsGeo";
    import theMap from "./components/theMap";

    export default {
        name: 'App',
        components: {
            pointsList,
            pointsNew,
            pointsGeo,
            theMap,
        },
        data() {
            return {


                placemarks: [],
            }
        },
        computed: {


            returnPlacemarkCoordsArr: function () {
                return [
                    this.geolocationData.latitude,
                    this.geolocationData.longitude
                ]
            },
        },
        methods: {},

    }
</script>

<style>
	#app {
		margin: 100px auto;
		width: 1200px;

		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;

		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.heading {
		width: 100%;
	}

	.left-container,
	.right-container {
		width: 50%;

		box-sizing: border-box;
	}

	.left-container {
		padding-right: 25px;
	}

	.right-container {
		padding-left: 25px;
	}
</style>
