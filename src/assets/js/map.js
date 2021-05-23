document.addEventListener('DOMContentLoaded', function() {
    if (!window.ymaps) return;

    ymaps.ready(init);

    function init() {
        const Map = new ymaps.Map(
            'map',
            {
                center: [55.685021, 37.618435],
                zoom: 15,
                controls: [],
                type: 'yandex#map'
            },
            {
                autoFitToViewport: 'always',
                suppressMapOpenBlock: true,
                yandexMapAutoSwitch: false
            }
        );

        createBalloon(Map);
    }

    function createBalloon(Map) {
        let markerSize = 32,
            markerSizeActive = 80,
            balloonHeader = 'Москва',
            balloonContent = `
              <a class="contacts__map-balloon-link" href="mailto:team@x-guide.ru">Email: team@x-guide.ru</a>
              <a class="contacts__map-balloon-link" href="tel:+79991550470">Tel: 8 999 155-04-70</a>
              <p class="contacts__map-balloon-text">117105, Россия, г.Москва, Варшавское шоссе, д.28 A.</p>`;

        // <a class="contacts__map-balloon-close" href="#">&times;</a>
        let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="contacts__map-balloon"><div class="contacts__map-balloon-arrow"></div><div class="contacts__map-balloon-in">$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]</div></div>',
            {
                build: function() {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.contacts__map-balloon', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                },
                clear: function() {
                    this._$element.find('.contacts__map-balloon-close').off('click');
                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function() {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },
                applyElementOffset: function() {
                    if (window.innerWidth >= 1024) {
                        //this._$element.css({
                        // top: '-65px',
                        //  left: '70px'
                        //});
                    } else {
                        //this._$element.css({
                        //  top: '-' + (this._$element[0].offsetWidth + 35) + 'px',
                        //  left:  '-' + (this._$element.outerWidth()) + 'px'
                        //});
                    }
                },
                onCloseClick: function(e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },
                getShape: function() {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    if (window.innerWidth >= 1024) {
                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top],
                                [
                                    position.left + this._$element[0].offsetWidth,
                                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                ]
                            ])
                        );
                    } else {
                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle(
                                [position.left, position.top],
                                [
                                    position.left - this._$element[0].offsetWidth,
                                    position.top - (this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                                ]
                            )
                        );
                    }
                    /*
                
      
                */
                },
                _isElement: function(element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }
        );

        let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="contacts__map-balloon-header">$[properties.balloonHeader]</div><div class="contacts__map-balloon-content">$[properties.balloonContent]</div>'
        );

        let placemark = new ymaps.Placemark(
            [55.683021, 37.618435],
            {
                // Зададим содержимое основной части балуна.
                balloonHeader: balloonHeader,
                balloonContent: balloonContent
            },
            {
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/map-marker.svg?v=1',
                // Размеры метки.
                iconImageSize: [markerSize, markerSize],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [markerSize / -2, markerSize / -2],
                hideIconOnBalloonOpen: false,
                balloonOffset: [0, -40],
                balloonPanelMaxMapArea: 0
            }
        );
        // Добавим метку на карту.
        Map.geoObjects.add(placemark);

        // Меняем размер активной метки
        placemark.events.add('balloonopen', function() {
            placemark.options.set('iconImageSize', [markerSizeActive, markerSizeActive]);
            placemark.options.set('iconImageOffset', [markerSizeActive / -2, markerSizeActive / -2]);
        });
        placemark.events.add('balloonclose', function() {
            placemark.options.set('iconImageSize', [markerSize, markerSize]);
            placemark.options.set('iconImageOffset', [markerSize / -2, markerSize / -2]);
        });

        // Закрывае балун при клике на карту
        Map.events.add('click', function() {
            placemark.balloon.close();
        });

        // Откроем балун на метке.
        placemark.balloon.open();
    }
});
