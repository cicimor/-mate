
const switchInput = document.getElementById('switch-input');

butt.onclick = function() {
    var val_Tp = document.getElementById('input-1').value;
    var val_Yp = document.getElementById('input-2').value;
    var val_Br = document.getElementById('input-3').value;
    var result = (val_Br*0.5)*(val_Yp/val_Tp);
    document.getElementById('str').innerHTML=result.toFixed(4) + ' TOKENS';
};

async function loadJson() {
    try {
        const response = await fetch('data.json');  // Указывайте путь к вашему JSON
        const data = await response.json();  // Преобразует JSON в объект
        return data;  // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null;  // Возвращаем null в случае ошибки
    }
}


async function loadJsonPrice() {
    try {
        const response = await fetch('price.json');  // Указывайте путь к вашему JSON
        const data = await response.json();  // Преобразует JSON в объект
        return data;  // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null;  // Возвращаем null в случае ошибки
    }
}


async function processDataPrice(pNamePrice,tokenName) {
    const dataPrice = await loadJsonPrice();  // Дожидаемся завершения загрузки
    
    const price = dataPrice[tokenName];



    const data = await loadJson();  // Дожидаемся завершения загрузки
    let token = processTokenData(data, `${tokenName}`);
    const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
    const average = sum / token.length;  // Делим сумму на количество элементов         console.log(token)

    document.getElementById(`${pNamePrice}`).innerText = ` $${(average * price).toFixed(2)} USD`;
}

async function processDataPriceStars() {
    
    const data = await loadJson();  // Дожидаемся завершения загрузки
        let token = processTokenData(data, `STARS`);
        const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        var starPrice = 0.028
        var Starsp = document.getElementById('STARS-p').innerText = ` $${(average * starPrice).toFixed(2)} USD`;
        return Starsp
        
    

}

// Пример использования данных в другой функции
async function processData(pName,tokenName) {
    const data = await loadJson();  // Дожидаемся завершения загрузки
        let token = processTokenData(data, `${tokenName}`);
        const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        document.getElementById(`${pName}`).innerHTML = average.toFixed(4);
}

// Функция для обработки данных по токену
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




