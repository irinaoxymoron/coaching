if ($('.js-contacts-map').length) {
    var map;

    function initMap() {
        map = new google.maps.Map(document.querySelector('.map'), {
            center: {lat: 60.030556, lng: 30.440983},
            zoom: 11,
            scrollwheel: false
        });

        var iconImage = {
            url: '/static/img/map-pin.png',
            size: new google.maps.Size(59, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 50)
        };

        var offices = [
            {
                position: new google.maps.LatLng(60.008408, 30.480409),
                content: '<div class="balloon__title">Цветной город</div>' +
                '<div class="balloon__descr">Пискаревский проспект <br> (Красногвардейский район)</div>'
            },
            {
                position: new google.maps.LatLng(60.033820, 30.450489),
                content: '<div class="balloon__title">Новая Охта</div>' +
                '<div class="balloon__descr">Пискаревский проспект <br> (Красногвардейский район)</div>'
            }
        ];

        var infowindow = new google.maps.InfoWindow();

        offices.forEach(function (office) {
            var marker = new google.maps.Marker({
                position: office.position,
                icon: iconImage,
                map: map
            });

            google.maps.event.addListener(marker, 'click', function(){
                infowindow.close();
                infowindow.setContent(office.content);
                infowindow.open(map, marker);
            });
        });

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }
}