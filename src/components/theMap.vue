<template>
	<div>
		<button @click="renderMap">Отрендерить карту</button>
		<div id="map" style="width: 600px; height: 400px"></div>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "theMap",
        computed: {
            returnMapObj: function () {
                return {
                    center: [this.$store.state.currentLocation.latitude, this.$store.state.currentLocation.longitude],
                    zoom: 15,
                }
            },

            ...mapGetters([
                "returnReferencePoints"
            ])
        },
        methods: {
            renderMap: function () {
                window.ymaps.ready(this.init);
            },

            init: function () {
                let myMap = new window.ymaps.Map("map", this.returnMapObj);
                // let myPlacemark = new window.ymaps.Placemark(this.returnMapObj.center, {
                //     content: 'Мое местоположение',
                //     balloonContent: 'Санкт-Петербург - культурная столица России'
                // });
                //
                // myMap.geoObjects.add(myPlacemark);

                // var myGeocoder = window.ymaps.geocode("Санкт-Петербург Малая балканская 20");
                // myGeocoder.then(function (res) {
                //     myMap.geoObjects.add(res.geoObjects);
                // });

                // let myPlacemark2 = new window.ymaps.Placemark([55.76, 37.64], {
                //     content: 'Москва, заданные координаты',
                //     balloonContent: 'Москоу сити'
                // });

                // myMap.geoObjects.add(myPlacemark2);

                let multiRoute = new window.ymaps.multiRouter.MultiRoute({
                    referencePoints: this.returnReferencePoints,
                }, {
                    editorDrawOver: false,
                    wayPointDraggable: true,
                    viaPointDraggable: true,
                    // Зададим собственное оформление линий мультимаршрута.
                    routeStrokeColor: "000088",
                    routeActiveStrokeColor: "ff0000",
                    pinIconFillColor: "ff0000",
                    boundsAutoApply: true,
                    zoomMargin: 30,
                });

                myMap.geoObjects.add(multiRoute);

                // let start = new window.ymaps.Placemark([35, 65], {
                //     iconCaption: 'start'
                // })


                // let points = [
                //     new window.ymaps.Placemark([35, 66], {
                //         iconCaption: '35-66'
                //     }),
                //     new window.ymaps.Placemark([34, 62],
                //         {
                //             iconCaption: '34-62'
                //         }),
                //     new window.ymaps.Placemark([34, 63],
                //         {
                //             iconCaption: '34-63'
                //         }),
                // ]


                // var result = window.ymaps.geoQuery(points).addToMap(myMap);
                // let  = new window.ymaps.Placemark([35, 65]);
                // myMap.geoObjects.add(start);
                // var closestObject = result.getClosestTo(start);

                // console.log(closestObject)
                // myMap.geoObjects.add(closestObject)
            },
        }
    }
</script>

<style scoped>

</style>
