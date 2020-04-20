<template>
	<form @submit.prevent="setNewPoint" class="form">
		<input v-model="currentVal.title" class="form__input" type="text" placeholder="Город, улица, дом" min="5">
		<button class="form__button">Добавить точку</button>
	</form>
</template>

<script>
    export default {
        name: "pointsNew",
        data() {
            return {
                currentVal: {
                    title: ''
                },
            }
        },
        methods: {
            setNewPoint: function () {
                this.$store.dispatch('addPoint', this.currentVal)
                this.currentVal.title = ''
            }
        },
    }
</script>

<style scoped>
	.form {
		margin: 25px 0;
		width: 100%;

		display: flex;
	}

	.form__input {
		padding: 10px;
		width: 60%;

		font-size: 16px;
		border-radius: 3px;
	}

	.form__button {
		padding: 10px;
		margin-left: auto;
		width: 33%;

		font-size: 16px;
		color: #fff;

		border: none;
		background-color: #000;
		border-radius: 3px;

		cursor: pointer;

		transition: .4s;
	}

	.form__button:hover {
		opacity: .8;
	}

	.form__button:active {
		transition: 0s;
		opacity: .4;
	}
</style>
