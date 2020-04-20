<template>
	<section class="geo">
		<p class="geo__para">lat: {{returnCoords.latitude}}</p>
		<p class="geo__para">lon: {{returnCoords.longitude}}</p>
		<button class="geo__button" @click="getGeo">Получить геолокацию</button>
	</section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "pointsGeo",
        data() {
            return {}
        },
        methods: {
            getGeo: function () {
                this.$store.dispatch("getCurrentLocation")
            }
        },
        computed: {
            ...mapGetters([
                "returnCoords"
            ])
        }
    }
</script>

<style scoped>
	.geo {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.geo__para {
		margin: 0;
		padding: 0;

		width: 30%;
		text-align: left;
	}

	.geo__button {
		margin-left: auto;

		background-color: #000;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 3px;

		cursor: pointer;

		transition: .4s;
	}

	.geo__button:hover {
		opacity: .7;
	}

	.geo__button:active {
		transition: 0s;
		opacity: .4;
	}
</style>
