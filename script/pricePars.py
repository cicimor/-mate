import time
import json
import requests

tokens = ["CATI", "TON", "NOT", "DOGS", "PX", "MAJOR"]
api_url = "https://api.coingecko.com/api/v3/simple/price?ids={}&vs_currencies=usd"

# Сопоставление тикеров с идентификаторами в API CoinGecko
TOKEN_IDS = {
    "CATI": "catizen",
    "TON": "the-open-network",
    "NOT": "notcoin",
    "DOGS": "dogs",
    "PX": "not-pixel",
    "MAJOR": "major"
}

def fetch_prices():
    token_ids_str = ",".join(TOKEN_IDS.values())
    response = requests.get(api_url.format(token_ids_str))
    if response.status_code == 200:
        data = response.json()
        prices = {token: data.get(TOKEN_IDS[token], {}).get("usd", "N/A") for token in tokens}
        return prices
    else:
        print("Ошибка запроса к API:", response.status_code)
        return {}

def save_prices(prices):
    with open("price.json", "w") as file:
        json.dump(prices, file, indent=4)

def main():
    while True:
        prices = fetch_prices()
        save_prices(prices)
        print("Обновлены цены:", prices)
        time.sleep(3600)  # Обновление каждый час

if __name__ == "__main__":
    main()