
const switchInput = document.getElementById('switch-input');

butt.onclick = function() {
    var val_Tp = document.getElementById('input-1').value;
    var val_Yp = document.getElementById('input-2').value;
    var val_Br = document.getElementById('input-3').value;
    var result = (val_Br*0.5)*(val_Yp/val_Tp);
    document.getElementById('str').innerHTML=result.toFixed(4) + ' TOKENS';
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



async function processDataPrice(pNamePrice,tokenName) {
    const dataPrice = await loadJson('price.json');  // Дожидаемся завершения загрузки
    
    const price = dataPrice[tokenName];



    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов         console.log(token)

    document.getElementById(`${pNamePrice}`).innerText = ` $${(average * price).toFixed(2)} USD`;
}

async function processDataPriceStars() {
    
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
        let token = processTokenData(data, `STARS`);
        const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        var starPrice = 0.028
        var Starsp = document.getElementById('STARS-p').innerText = ` $${(average * starPrice).toFixed(2)} USD`;
        return Starsp
        
    

}


async function processData(pName,tokenName) {
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
        let token = processTokenData(data, `${tokenName}`);
        const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        document.getElementById(`${pName}`).innerHTML = average.toFixed(2);
}

async function processDataPower(pName,tokenName) {
    const data = await loadJson('data.json');  // Дожидаемся завершения загрузки
        let token = processTokenDataPower(data, `${tokenName}`);
        const sum = token.reduce((acc, value) => acc + value/1000000000, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        document.getElementById(`${pName}`).innerHTML = 'Hash rate: ' + average.toFixed(2) + " Ph/s";
}

// Функция для обработки данных по токену
function processTokenDataPower(data, tokenName) {
    const filteredData = data.filter(item => item.token === tokenName);
    const rewards = filteredData.map(item => item.powerBN);
    const reward = (`${tokenName} rewards:`, rewards);
    return reward
}


function processTokenData(data, tokenName) {
    const filteredData = data.filter(item => item.token === tokenName);
    const rewards = filteredData.map(item => item.lastBlockReward);
    const reward = (`${tokenName} rewards:`, rewards);
    return reward
}


processData("CATI-p","CATI");
processData("TON-p","TON");
processData("NOT-p","NOT");
processData("STARS-p","STARS");
processData("DOGS-p","DOGS");
processData("PX-p","PX");
processData("MAJOR-p","MAJOR");
processData("MATE-p","MATE");


processDataPower("CATI-hr", 'CATI')
processDataPower("TON-hr", 'TON')
processDataPower("NOT-hr", 'NOT')
processDataPower("STARS-hr", 'STARS')
processDataPower("DOGS-hr", 'DOGS')
processDataPower("PX-hr", 'PX')
processDataPower("MAJOR-hr", 'MAJOR')
processDataPower("MATE-hr", 'MATE')





switchInput.addEventListener('change', function() {
    if (switchInput.checked) {
        processDataPriceStars()
        processDataPrice("CATI-p","CATI")
        processDataPrice("TON-p","TON")
        processDataPrice("NOT-p","NOT")
        processDataPrice("DOGS-p","DOGS")
        processDataPrice("PX-p","PX")
        processDataPrice("MAJOR-p","MAJOR")
    } else {
        processData("CATI-p","CATI");
        processData("TON-p","TON");
        processData("NOT-p","NOT");
        processData("STARS-p","STARS");
        processData("DOGS-p","DOGS");
        processData("PX-p","PX");
        processData("MAJOR-p","MAJOR");
        processData("MATE-p","MATE");
    }
    
  });




