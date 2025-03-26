import requests
import json
import os
import time


# API-адрес
url = "https://api.hashmate-bot.com/v1/mining/pools/"
cookies = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjg4NywiaWF0IjoxNzQyOTM1MjE1LCJleHAiOjE3NDMyMzUyMTV9.O6_DaGx-FproShpqVaqDUhYmNVVgCV9kQcP1eiMq5n8"
}

# Файл для сохранения данных
file_path = "data.json"
INTERVAL = 900  #  (в секундах)

def fetch_data():
    """Получает данные с API"""
    try:
        response = requests.get(url, cookies=cookies)
        response.raise_for_status()
        return response.json()  # Конвертируем в JSON
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при запросе: {e}")
        return []

def load_existing_data():
    """Загружает уже сохраненные данные"""
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            try:
                return json.load(file)  # Загружаем существующие данные
            except json.JSONDecodeError:
                return []  # Если файл пустой или поврежден
    return []

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
    time.sleep(INTERVAL)

print("⏳ Скрипт запущен, обновление каждые 15 минут...")

# Бесконечный цикл для выполнения задач по расписанию
while True:
    update_data()
