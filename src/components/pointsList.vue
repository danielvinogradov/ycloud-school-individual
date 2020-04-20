<template>
	<section class="points">
		<h2 class="points__heading">
			Список точек:
			<button class="points__delete" @click="deleteAllPoints">удалить все точки</button>
		</h2>
		<ul class="points__list">
			<li class="points__item" v-for="item in returnPoints" :key="item.id">{{item.title}}</li>
		</ul>
	</section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "pointsList",
        computed: {
            ...mapGetters([
                "returnPoints"
            ])
        },
        methods: {
            deleteAllPoints: function () {
                this.$store.dispatch('clearData')
            }
        },

        mounted() {
            this.$store.dispatch('getPoints')
        }
    }
</script>

<style scoped>
	.points__list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.points__item {
		text-align: left;
	}

	.points__delete {
		padding: 5px;

		font-size: 12px;
		color: #fff;
		border: none;
		background-color: #000;
		border-radius: 3px;

		cursor: pointer;
	}
</style>
