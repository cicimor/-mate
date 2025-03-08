import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By

# Настройки
URL = "https://api.hashmate-bot.com/v1/mining/pools"
URLTG = "https://web.telegram.org/a/"  
JSON_FILE = "data.json"
INTERVAL = 600  # 30 минут (в секундах)

# Подключаемся к уже открытому браузеру
options = webdriver.ChromeOptions()
options.debugger_address = "localhost:9222"  # Подключение к уже запущенному Chrome
driver = webdriver.Chrome(options=options)

def load_existing_data():
    """Загружает данные из файла, если он есть."""
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_data(data):
    """Сохраняет обновленные данные в JSON."""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def scrape_data():
    """Собирает данные с уже открытой страницы."""
    try:
        driver.get(URL)  # Загружаем сайт
        time.sleep(3)  # Ждем загрузки

        pre_element = driver.find_element(By.TAG_NAME, "pre")
        raw_data = pre_element.text  # Получаем JSON из <pre>

        return json.loads(raw_data)  # Преобразуем текст в JSON
    except Exception as e:
        print(f"Ошибка при парсинге: {e}")
        return []
    



def refresh_page():
    """Перезагружает страницу."""
    print("🔄 Перезагрузка страницы...")
    driver.refresh()  # Обновляем страницу
    time.sleep(3)  # Даем немного времени на обновление страницы

def main():
    """Основной цикл парсинга."""
    while True:
        
        # Перезагружаем страницу
        refresh_page()

        existing_data = load_existing_data()  # Загружаем старые данные
        new_data = scrape_data()  # Получаем новые данные

        # Объединяем новые данные со старыми, избегая дублирования
        existing_block_numbers = {item["lastBlockNumber"] for item in existing_data}
        for entry in new_data:
            
            if isinstance(entry, dict):  # Убедись, что entry — это словарь
             if entry["lastBlockNumber"] not in existing_block_numbers:
                if entry["lastBlockNumber"] not in existing_block_numbers:
                 existing_data.append(entry)
            else:
                print("entry не является словарем:", entry)

        # Сохраняем обновленный список
        save_data(existing_data)
        print(f"✅ Данные обновлены. Следующее обновление через {INTERVAL // 60} минут.")

        
        # Ждем 30 минут перед следующим запуском
        time.sleep(INTERVAL)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("⛔ Скрипт остановлен пользователем.")
    finally:
        driver.quit()