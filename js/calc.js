const checkbox = document.querySelectorAll('.cheakbox__item__btn label');
const priceInfo = document.querySelectorAll('.price__info__item');
const humanCountList = document.querySelectorAll('#human__count div label');
const childrenCountList = document.querySelectorAll('#children__count div label');
const humanInput = humanCountList[10].parentElement.parentElement.getElementsByClassName('input-human')[0];
const childrenInput = childrenCountList[10].parentElement.parentElement.getElementsByClassName('input-human')[0];
const calculateBtn = document.querySelector('.calculate__item');
const totalPriceOut = document.querySelector('.total__price p');
const fullInfo = document.querySelectorAll('.full__information__list__item');
const resetBtn = document.querySelector('.price__reset');
const openCloseBtn = document.querySelectorAll('.calc__card__title button');
let price, childrenPrice, duration;
let place;
let humanCount = 0;
let childrenCount = 0;
let totalPrice;
let allInfo;


resetBtn.addEventListener('click', resetCalc);
calculateBtn.addEventListener('click', calculateTotalPrice);
openCloseBtn.forEach((item) => {
    item.addEventListener('click', closeOpenCard, false)
    item.link = item;

    function closeOpenCard (item) {
        const btn = (item.currentTarget.link);
        btn.parentElement.parentElement.querySelectorAll('div')[1].classList.toggle('none');

        if (btn.querySelector('img').getAttribute('src') == './img/calc/btn-close.svg') {
            btn.querySelector('img').src = './img/calc/btn-open.svg';
        } else {
            btn.querySelector('img').src = './img/calc/btn-close.svg';
        }

    }
})


// function closeOpenCard (item) {
//     console.log(item.target);
//     console.log(item.tag)
//     const btnItem = item.target.parentElement;
//     btnItem.parentElement.parentElement.querySelectorAll('div')[1].classList.toggle('none')
//     console.log(btnItem.parentElement.parentElement)
// }


humanCountList.forEach ((item, index) => {
    if (index !== 10) {
        item.addEventListener('click', () => {
            humanCount = Number(item.getAttribute('count'));
            humanInput.classList.add('none');
        })
    } else {
        item.addEventListener('click', openInputHuman)
    }
})

childrenCountList.forEach ((item, index) => {
    if (index !== 10) {
        item.addEventListener('click', () => {
            childrenCount = Number(item.getAttribute('count'));
            childrenInput.classList.add('none');
        })
    } else {
        item.addEventListener('click', openInputChildren)
    }
})

function openInputHuman () {
    humanInput.classList.remove('none');
    humanCount = Number(humanInput.getElementsByTagName('input')[0].value)
    humanInput.getElementsByTagName('input')[0].addEventListener('input', function() {
        humanCount = Number(humanInput.getElementsByTagName('input')[0].value)
    })
}

function openInputChildren () {
    childrenInput.classList.remove('none');
    childrenCount = Number(childrenInput.getElementsByTagName('input')[0].value)
    childrenInput.getElementsByTagName('input')[0].addEventListener('input', function() {
        childrenCount = Number(childrenInput.getElementsByTagName('input')[0].value)
    })
}



getInfo(checkbox);


function getInfo (items) {
    items.forEach((item) => {
        item.addEventListener('click', function() {
            if (item.getAttribute('full-info-data') == 'price') {
                price = item.getAttribute('price');
                childrenPrice = item.getAttribute('children-price');
                place = item.innerHTML;
                priceInfoFilling()
            } else if (item.getAttribute('full-info-data') == 'duration') {
                duration = Number( item.getAttribute('duration'))/24
            }
        })
        
    })
}

function priceInfoFilling () {
    priceInfo.forEach ((item) => {
        item.classList.remove('none')
    })
    priceInfo[0].getElementsByTagName('span')[0].innerHTML = price;
    priceInfo[1].getElementsByTagName('span')[0].innerHTML = childrenPrice
}

function calculateTotalPrice () {
    totalPrice = (price * humanCount + childrenPrice * childrenCount) * duration;
    if (totalPrice || totalPrice == 0) {
        totalPriceOut.innerHTML = totalPrice;
        const fullInfoData = [place, duration, humanCount, childrenCount, totalPrice];
        fullInfo.forEach((item, index) => {
            item.getElementsByTagName('span')[0].innerHTML = fullInfoData[index]
        })
    }
}

function resetCalc () {


    checkbox.forEach((item) => {
        item.parentElement.getElementsByTagName('input')[0].checked = false;
    })


    priceInfo.forEach((item) => {
        item.classList.add('none')
    })


    humanCountList[0].parentElement.getElementsByTagName('input')[0].checked = true;
    childrenCountList[0].parentElement.getElementsByTagName('input')[0].checked = true;


    [humanInput, childrenInput].forEach((item) => {
        item.classList.add('none')
    })


    totalPriceOut.innerHTML = 0;


    fullInfo.forEach((item, index) => {
        item.getElementsByTagName('span')[0].innerHTML = ['', '0', '', '', 0][index]
    })

    price = '';
    humanCount = 0;
    childrenPrice = '';
    childrenCount = 0;
    duration = '0';
    place = ''
}
