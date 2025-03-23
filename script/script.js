
const switchInput = document.getElementById('switch-input');

butt.onclick = function () {
    var val_Tp = document.getElementById('input-1').value;
    var val_Yp = document.getElementById('input-2').value;
    var val_Br = document.getElementById('input-3').value;
    var result = (val_Br * 0.7) * (val_Yp / val_Tp);
    document.getElementById('str').innerHTML = result.toFixed(4) + ' TOKENS';
};

async function loadJson(jsonName) {
    try {
        const response = await fetch([jsonName]);  // Указывайте путь к вашему JSON
        const data = await response.json();  // Преобразует JSON в объект
        return data;  // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null;  // Возвращаем null в случае ошибки
    }
}



async function processDataPrice(pNamePrice, tokenName) {
    const dataPrice = await loadJson('price.json');  // Дожидаемся завершения загрузки

    const price = dataPrice[tokenName];



    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов         console.log(token)

    document.getElementById(`${pNamePrice}`).innerText = ` $${(average * price).toFixed(2)} USD`;
}

async function processDataPriceL24(pNamePrice, tokenName) {
    const dataPrice = await loadJson('price.json');  // Дожидаемся завершения загрузки

    const price = dataPrice[tokenName];



    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenDataL24(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов         console.log(token)

    document.getElementById(`${pNamePrice}`).innerText = ` $${(average * price).toFixed(2)} USD`;
}

async function processDataPriceToOnePh(pName, tokenName) {
    const dataPrice = await loadJson('price.json');  // Дожидаемся завершения загрузки
    const price = dataPrice[tokenName];
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов         console.log(token)
    const pricePool = price * average


    let tokenph = processTokenDataPower(data, `${tokenName}`);
    const sumph = tokenph.reduce((acc, value) => acc + value / 1000000000, 0);  // Суммируем все элементы массива
    const averageph = sumph / tokenph.length;  // Делим сумму на количество элементов
    priceToOnePh = ((1 / (averageph + 1)) * (pricePool * 0.7))
    document.getElementById(`${pName}`).innerHTML = priceToOnePh.toFixed(2) + "$ at 1Ph/s";
}


async function processDataPriceStars() {

    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `STARS`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    var starPrice = 0.028
    document.getElementById('STARS-p').innerText = ` $${(average * starPrice).toFixed(2)} USD`;


}

async function processDataPriceStarsL24() {

    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenDataL24(data, `STARS`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    var starPrice = 0.028
    document.getElementById('STARS-p24').innerText = ` $${(average * starPrice).toFixed(2)} USD`;


}


async function processDataPriceStarsToOnePh() {

    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `STARS`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    var starPrice = 0.028
    var totalStarPrice = average * starPrice;

    let tokenph = processTokenDataPower(data, `STARS`);
    const sumph = tokenph.reduce((acc, value) => acc + value / 1000000000, 0);  // Суммируем все элементы массива
    const averageph = sumph / tokenph.length;  // Делим сумму на количество элементов
    const priceToOnePh = (1 / (averageph + 1)) * (totalStarPrice * 0.7);
    document.getElementById("STARS-hr").innerHTML = priceToOnePh.toFixed(2) + "$ at 1Ph/s";



}


async function processData(pName, tokenName) {
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    document.getElementById(`${pName}`).innerHTML = average.toFixed(2);
}

async function processDataL24(pName, tokenName) {
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenDataL24(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    document.getElementById(`${pName}`).innerHTML = average.toFixed(2);
}

async function processDataPower(pName, tokenName) {
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenDataPower(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value / 1000000000, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов
    document.getElementById(`${pName}`).innerHTML = average.toFixed(2) + " Ph/s";
}

// Функция для обработки данных по токену
function processTokenDataPower(data, tokenName) {
    const filteredData = data.filter(item => item.token === tokenName);
    const rewards = filteredData.slice(-480).map(item => item.powerBN);
    const reward = (`${tokenName} rewards:`, rewards);
    return reward
}

function processTokenDataL24(data, tokenName) {
    const filteredData = data.filter(item => item.token === tokenName);
    const rewards = filteredData.slice(-48).map(item => item.lastBlockReward);
    const reward = (`${tokenName} rewards:`, rewards);
    return reward
}

function processTokenData(data, tokenName) {
    const filteredData = data.filter(item => item.token === tokenName);
    const rewards = filteredData.slice(-480).map(item => item.lastBlockReward);
    const reward = (`${tokenName} rewards:`, rewards);
    return reward
}


processData("CATI-p", "CATI");
processData("TON-p", "TON");
processData("NOT-p", "NOT");
processData("STARS-p", "STARS");
processData("DOGS-p", "DOGS");
processData("PX-p", "PX");
processData("MAJOR-p", "MAJOR");
processData("MATE-p", "MATE");


processDataL24("CATI-p24", "CATI");
processDataL24("TON-p24", "TON");
processDataL24("NOT-p24", "NOT");
processDataL24("STARS-p24", "STARS");
processDataL24("DOGS-p24", "DOGS");
processDataL24("PX-p24", "PX");
processDataL24("MAJOR-p24", "MAJOR");
processDataL24("MATE-p24", "MATE");


processDataPower("CATI-hr", 'CATI')
processDataPower("TON-hr", 'TON')
processDataPower("NOT-hr", 'NOT')
processDataPower("STARS-hr", 'STARS')
processDataPower("DOGS-hr", 'DOGS')
processDataPower("PX-hr", 'PX')
processDataPower("MAJOR-hr", 'MAJOR')
processDataPower("MATE-hr", 'MATE')





switchInput.addEventListener('change', function () {
    if (switchInput.checked) {
        processDataPriceStars()
        processDataPrice("CATI-p", "CATI")
        processDataPrice("TON-p", "TON")
        processDataPrice("NOT-p", "NOT")
        processDataPrice("DOGS-p", "DOGS")
        processDataPrice("PX-p", "PX")
        processDataPrice("MAJOR-p", "MAJOR")


        processDataPriceStarsL24()
        processDataPriceL24("CATI-p24", "CATI")
        processDataPriceL24("TON-p24", "TON")
        processDataPriceL24("NOT-p24", "NOT")
        processDataPriceL24("DOGS-p24", "DOGS")
        processDataPriceL24("PX-p24", "PX")
        processDataPriceL24("MAJOR-p24", "MAJOR")

        processDataPriceStarsToOnePh()
        processDataPriceToOnePh("CATI-hr", "CATI")
        processDataPriceToOnePh("TON-hr", 'TON')
        processDataPriceToOnePh("NOT-hr", 'NOT')
        processDataPriceToOnePh("DOGS-hr", 'DOGS')
        processDataPriceToOnePh("PX-hr", 'PX')
        processDataPriceToOnePh("MAJOR-hr", 'MAJOR')
    } else {
        processData("CATI-p", "CATI");
        processData("TON-p", "TON");
        processData("NOT-p", "NOT");
        processData("STARS-p", "STARS");
        processData("DOGS-p", "DOGS");
        processData("PX-p", "PX");
        processData("MAJOR-p", "MAJOR");
        processData("MATE-p", "MATE");


        processDataL24("CATI-p24", "CATI");
        processDataL24("TON-p24", "TON");
        processDataL24("NOT-p24", "NOT");
        processDataL24("STARS-p24", "STARS");
        processDataL24("DOGS-p24", "DOGS");
        processDataL24("PX-p24", "PX");
        processDataL24("MAJOR-p24", "MAJOR");
        processDataL24("MATE-p24", "MATE");

        processDataPower("CATI-hr", 'CATI')
        processDataPower("TON-hr", 'TON')
        processDataPower("NOT-hr", 'NOT')
        processDataPower("STARS-hr", 'STARS')
        processDataPower("DOGS-hr", 'DOGS')
        processDataPower("PX-hr", 'PX')
        processDataPower("MAJOR-hr", 'MAJOR')
        processDataPower("MATE-hr", 'MATE')




    }

});




