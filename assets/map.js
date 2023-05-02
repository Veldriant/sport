// Пример реализации боковой панели на основе наследования от collection.Item.
// Боковая панель отображает информацию, которую мы ей передали.
ymaps.modules.define('Panel', [
    'util.augment',
    'collection.Item'
], function (provide, augment, item) {
    // Создаем собственный класс.
    var Panel = function (options) {
        Panel.superclass.constructor.call(this, options);
    };

    // И наследуем его от collection.Item.
    augment(Panel, item, {
        onAddToMap: function (map) {
            Panel.superclass.onAddToMap.call(this, map);
            this.getParent().getChildElement(this).then(this._onGetChildElement, this);
            // Добавим отступы на карту.
            // Отступы могут учитываться при установке текущей видимой области карты,
            // чтобы добиться наилучшего отображения данных на карте.
            map.margin.addArea({
                bottom: 100,
                right: 100,
                width: '100%',
                height: 0
            })
        },

        onRemoveFromMap: function (oldMap) {
            if (this._$control) {
                this._$control.remove();
            }
            Panel.superclass.onRemoveFromMap.call(this, oldMap);
        },

        _onGetChildElement: function (parentDomContainer) {
            // Создаем HTML-элемент с текстом.
            // По-умолчанию HTML-элемент скрыт.
            this._$control = $('<div class="customControl"><div class="content"></div><div class="closeButton"></div></div>').appendTo(parentDomContainer);
            this._$content = $('.content');
            // При клике по крестику будем скрывать панель.
            $('.closeButton').on('click', this._onClose);
        },
        _onClose: function () {
            $('.customControl').css('display', 'none');
        },
        // Метод задания контента панели.
        setContent: function (text) {
            // При задании контента будем показывать панель.
            this._$control.css('display', 'flex');
            this._$content.html(text);
        }
    });

    provide(Panel);
});


var myMap;
ymaps.ready(['Panel']);
ymaps.ready(init);

function init () {
    console.log('done')
    myMap = new ymaps.Map('map', {
        center: [55.751244, 37.618423],
        zoom: 10,
        controls: [],
    }, {
        suppressMapOpenBlock: true
    }),
    


    newServiceMarkLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="maps-point" style="margin: 0px 0px 0px 7px; padding:5px; background: white; width:1000%; font-width: 700; border-radius: 10px;" >$[properties.iconContent]</div>`
    ),
    newBalloon = ymaps.templateLayoutFactory.createClass(
        `<div style="position: absolute; left: 0; left: 0;"> $[properties.balloonContentBody] </div>`
    ),
    myMap.options.set({balloonPanelMaxMapArea:'Infinity',layout: 'newBalloon' });
    serviceCenters.forEach((element, i) => {
        newServiceCenterMark = new ymaps.Placemark(element.coords, {
            // iconContent: element.shortTitle,
            content: i,
            balloonContent: [
                "<div style='min-height: 100px; max-width: 340px; padding: 20px 30px;'><h2 style='margin: 0px 0 10px; text-transform: uppercase;'>" + element.title + "</h2><p style='margin: 0 0 20px;'>" + element.shortTitle + "</p><button target='_blank' style='font-size: 32px;color: #2D74CA;text-decoration: none;border: none; background: #FFF;padding: 10px 20px;' onclick='backToMain()'>ПОНЯТНО</button></div>"
            ],
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'https://i.pinimg.com/originals/7a/80/c9/7a80c9fbeb2158487b68c827a17bbbea.png',
            iconImageSize: [30, 30],
            iconImageOffset: [0, 0],
            hasBalloon: false,
            hideIconOnBalloonOpen: false,
        })
        myMap.geoObjects.add(newServiceCenterMark)
    })
    // myMap.geoObjects.events.add('click', chooseMain(element))
    addBalloon()
    }

    function backToMain () {
        myMap.geoObjects.removeAll()
        rmBalloon()
        serviceCenters.forEach((element, i) => {
            newServiceCenterMark = new ymaps.Placemark(element.coords, {
                content: i,
                balloonContent: [
                    "<div style='min-height: 100px; max-width: 340px; padding: 20px 30px;'><h2 style='margin: 0px 0 10px; text-transform: uppercase;'>" + element.title + "</h2><p style='margin: 0 0 20px;'>" + element.shortTitle + "</p><button target='_blank' style='font-size: 32px;color: #2D74CA;text-decoration: none;border: none;background: #FFF;padding: 10px 20px;' onclick='backToMain()'>ПОНЯТНО</button></div>"
                ],
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'https://i.pinimg.com/originals/7a/80/c9/7a80c9fbeb2158487b68c827a17bbbea.png',
                iconImageSize: [30, 30],
                iconImageOffset: [0, 0],
                hasBalloon: false,
                hideIconOnBalloonOpen: false,
            })
            myMap.geoObjects.add(newServiceCenterMark)
            myMap.setBounds(myMap.geoObjects.getBounds(), {checkZoomRange:true}).then(function(){ if(myMap.getZoom() > 10) myMap.setZoom(10);})
        })
        addBalloon()
    }

    function chooseMain (obj) {
        if(serviceCenters[obj].hasOwnProperty('childs')) {
            myMap.geoObjects.removeAll()
            const element = serviceCenters[obj].childs
            console.log(element)
            element.forEach(el => {
                childMarks = new ymaps.Placemark(el.coords, {
                    iconContent: el.title,
                },{
                    preset: 'islands#blackStretchyIcon',
                    hasBalloon: false,
                    hideIconOnBalloonOpen: false,
                })
                myMap.geoObjects.add(childMarks)
                myMap.setBounds(myMap.geoObjects.getBounds(), {checkZoomRange:true})
                // myMap.geoObjects.events.remove()
            })
                    // addBalloon()
        }else {
            console.log('selected child')
        }
    }

function addBalloon () {
    var panel = new ymaps.Panel()
    if ($(window).width() < 960) {
        // console.log('low')
        myMap.controls.add(panel, {
            float: 'right',
            position: {
                bottom: 0,
                left: 0
            }
        });
        myMap.geoObjects.events.add('click', function (e) {
            console.log('qwe')
            // Получим ссылку на геообъект, по которому кликнул пользователь.
            var target = e.get('target');
            console.log(target)
            chooseMain(target.properties.get("content"))
            // Зададим контент боковой панели.
            panel.setContent(target.properties.get('balloonContent'));
            // Переместим центр карты по координатам метки с учётом заданных отступов.
            myMap.panTo(target.geometry.getCoordinates(), {useMapMargin: false});
        });
    }else {
        // console.log('hight')
        myMap.controls.add(panel, {
            float: 'right',
            position: {
                bottom: 30,
                right: '10%'
            }
        });
        myMap.geoObjects.events.add('click', function (e) {
            // console.log('qwe')
            // Получим ссылку на геообъект, по которому кликнул пользователь.
            var target = e.get('target');
            console.log(target)
            if(target.properties.get('preset') != 'islands#blackStretchyIcon') {
                chooseMain(target.properties.get("content"))
            }
            // Зададим контент боковой панели.
            panel.setContent(target.properties.get('balloonContent'));
            // Переместим центр карты по координатам метки с учётом заданных отступов.
            myMap.panTo(target.geometry.getCoordinates(), {useMapMargin: true});
        });
    }
            
            
}
function rmBalloon () {
    var panel = new ymaps.Panel()
    panel._onClose()
}
rmBalloon()