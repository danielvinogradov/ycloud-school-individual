import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        server: {
            url: `http://84.201.172.69:3000/`
        },

        currentLocation: {
            latitude: null,
            longitude: null,
        },

        points: [],
    },
    getters: {
        returnPoints: function (state) {
            return state.points
        },

        returnCoords: function (state) {
            return state.currentLocation
        },

        returnReferencePoints: function (state) {
            let result = [[state.currentLocation.latitude, state.currentLocation.longitude]];

            state.points.forEach(item => result.push(item.title))

            return result;
        }
    },
    mutations: {
        resetPoints: function (state) {
            state.points = []
        },

        setPoints: function (state, data) {
            state.points = data
        },

        setCurrentLocation: function (state, data) {
            state.currentLocation.latitude = data.coords.latitude.toFixed(4)
            state.currentLocation.longitude = data.coords.longitude.toFixed(4)
        }
    },
    actions: {
        clearData: async function (context) {
            await fetch(`${context.state.server.url}clear`, {
                method: "GET"
            })
                // .then(context.commit('resetPoints'))
                .then(res => console.log(res.status))
                .catch(e => console.log(e))

            await context.dispatch('getPoints');
        },

        getPoints: async function (context) {
            await fetch(`${context.state.server.url}jsondata`, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => context.commit('setPoints', res))
                .catch(e => console.log(e))
        },

        addPoint: async function (context, data) {
            await fetch(`${context.state.server.url}test`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(res => console.log(res))
                .catch(e => console.log(e))

            await context.dispatch('getPoints');
        },

        getCurrentLocation: async function (context) {
            await navigator.geolocation.getCurrentPosition(data => context.commit('setCurrentLocation', data));
        },
    },
})
