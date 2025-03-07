


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


async function processDataPrice(pNamePrice,tokenName, tokenN) {
    
    const data = await loadJson();  // Дожидаемся завершения загрузки
        let token = processTokenData(data, `${tokenName}`);
        const sum = token.reduce((acc, value) => acc + value, 0);  // Суммируем все элементы массива
        const average = sum / token.length;  // Делим сумму на количество элементов
        




        let url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenN}&vs_currencies=usd`;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await axios.get(url);
        const price = response.data[tokenN]?.usd;

        if (!price) {
            document.getElementById(`${pNamePrice}`).innerText = "Ошибка: токен не найден!";
            return;
        }

        document.getElementById(`${pNamePrice}`).innerText = ` $${(1 * price).toFixed(6)} USD`;
    } catch (error) {
        document.getElementById(`${pNamePrice}`).innerText = "Ошибка при получении данных!";
        console.error(error);
    }
}


processDataPrice("CATI-pPrice","CATI","catizen")
processDataPrice("TON-pPrice","TON","the-open-network")
processDataPrice("NOT-pPrice","NOT","notcoin")
processDataPrice("DOGS-pPrice","DOGS","dogechain")
processDataPrice("PX-pPrice","PX","not-pixel")
processDataPrice("MAJOR-pPrice","MAJOR","major")


