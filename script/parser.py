import requests
import json
import os
import time

# API-адрес
url = "https://api.hashmate-bot.com/v1/mining/pools/"
cookies = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjg4NywiaWF0IjoxNzQ1MTQ1MjIzLCJleHAiOjE3NDU0NDUyMjN9.IiLnCPwFZrNr7Fdv1rH_ei5HsWNhTgVFPhb7yWPOW9E"
}


headers = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Authorization": f"Bearer {cookies['accessToken']}",  # Добавляем токен в заголовок
    "Accept-Language": "ru,en;q=0.9",
    "Cache-Control": "max-age=0"
}

# Файл для сохранения данных
file_path = "data.json"
INTERVAL = 900  # 15 минут в секундах

def fetch_data():
    """Получает данные с API"""
    try:
        response = requests.get(url, cookies=cookies, headers=headers)  # Добавляем headers
        response.raise_for_status()  # Проверим на ошибки HTTP
        return response.json()  # Конвертируем ответ в JSON
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при запросе: {e}")
        return []  # Возвращаем пустой список при ошибке

def load_existing_data():
    """Загружает уже сохраненные данные"""
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            try:
                return json.load(file)  # Загружаем существующие данные
            except json.JSONDecodeError:
                return []  # Если файл пустой или поврежден, возвращаем пустой список
    return []  # Если файл не существует, возвращаем пустой список

def save_data(data):
    """Сохраняет данные в файл"""
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)  # Красиво форматируем JSON

def update_data():
    """Основная логика обновления данных"""
    print("🔄 Запрос новых данных...")

    # Загружаем старые данные
    existing_data = load_existing_data()

    # Получаем новые данные
    new_data = fetch_data()

    if not new_data:
        print("⚠ Нет новых данных, ждем следующий запуск...")
        return

    # Объединяем старые и новые данные, убирая дубликаты по lastBlockNumber
    all_data = {item["lastBlockNumber"]: item for item in existing_data + new_data}.values()

    # Сохраняем в файл
    save_data(list(all_data))
    print("✅ Данные обновлены и сохранены!")

# Основной цикл обновления данных каждые 15 минут
print("⏳ Скрипт запущен, обновление каждые 15 минут...")

while True:
    update_data()
    time.sleep(INTERVAL)  # Задержка на 15 минут
