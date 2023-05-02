var serviceCenters = [
    {
        id: 1,
        title: 'Лужники',
        // shortTitle: 'Описание Лужники',
        coords: [55.712177, 37.559804],
        childs: [
            {
                title: 'Лужники',
                coords: [55.712177, 37.559804]
            }
        ]
    },
    {
        id: 2,
        title: 'Музеон',
        // shortTitle: 'Описание музеон',
        coords: [55.736330, 37.607984],
        childs: [
            {
                title: 'Массовый стреичинг с smsstretching',
                coords: [55.735598, 37.605116]
            },
            {
                title: 'Тренировки с world class',
                coords: [55.736330, 37.607984]
            },
            {
                title: 'Танцевальные мастер-классы',
                coords: [55.735200, 37.604503]
            },
            {
                title: 'Сайклинг',
                coords: [55.736307, 37.609725]
            }
        ]
    },
    {
        id: 3,
        title: 'Ночной забег парк Горького',
        // shortTitle: 'Описание парки',
        coords: [55.912597, 37.331998],
        childs: [
            {
                title: 'Ночной забег парк Горького',
                coords: [55.731573, 37.603572]
            },
        ]
    },
    {
        id: 4,
        title: 'Ночной забег ВДНХ',
        coords: [55.826919, 37.638019],
        childs: [
            {
                title: 'Ночной забег ВДНХ',
                coords: [55.826919, 37.638019]
            },
        ]
    },
    {
        id: 5,
        title: 'Ночной забег парк Сокольники',
        coords: [55.792554, 37.677212],
        childs: [
            {
                title: 'Ночной забег парк Сокольники',
                coords: [55.792554, 37.677212]
            },
        ]
    },
    {
        id: 6,
        title: 'Ночной забег парк Коломенское',
        coords: [55.669133, 37.666037],
        childs: [
            {
                title: 'Ночной забег парк Коломенское',
                coords: [55.669133, 37.666037]
            }
        ]
    },
    {
        id: 7,
        title: 'Ночной забег парк Фили',
        coords: [55.738068, 37.462209],
        childs: [
            {
                title: 'Ночной забег парк Фили',
                coords: [55.738068, 37.462209]
            }
        ]
    }     
]

// let citySelect = document.getElementById('citySelect'),
    // searchInput = document.getElementById('searchMap'),
    // result = document.querySelector('.result'),
    // resultSearch = document.getElementById('resultSearch'),
   let timer,
    interval = 2000

let cityCollection = new Set()
// let thisCity = citySelect.value

serviceCenters.forEach(item => cityCollection.add(item.city))
console.log(serviceCenters)




// function selectedCity (obj) {
//     // thisCity = obj.value
//     chooseServiceCenter(thisCity)
// }
// function chooseServiceCenter (value) {
//     let newCoords = []
//     if(value == '') {
//         newCoords = serviceCenters
//     }else {
//         newCoords = serviceCenters.filter(item => item.city == value)
//     }
//     searchInput.value = ''
//     ChangeCity(newCoords)
// }

// searchInput.addEventListener('keyup', function () {
//     clearTimeout(timer);
//     timer = setTimeout(searchMap, interval);
//     resultSearch.innerHTML = ``
// })
// searchInput.addEventListener('keydown', function () {
//     clearTimeout(timer);
// })

  
// function searchMap () {
//     let listCompany = serviceCenters.filter(item => item.title.toLowerCase().match(searchInput.value.toLowerCase()))
//     listCompany.forEach(el => {
//         let p = document.createElement('p')
//         p.innerHTML = el.title
//         p.classList.add('card')
//         resultSearch.appendChild(p)
//         resultSearch.classList.add('_active')
//         p.addEventListener('click', function () {
//             ChooseMark(el)
//             listCompany = []
//             resultSearch.classList.remove('_active')
//             resultSearch.innerHTML = ``
//         })
//         if(searchInput.value == ''){
//             ChangeCity(serviceCenters)
//             resultSearch.classList.remove('_active')
//             resultSearch.innerHTML = ``
//         }

//     })
    
//     console.log(listCompany)

// }




// let choosenSlide = citySelect[0].value
// chooseServiceCenter(choosenSlide)