import time
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import json
JSON_FILE = "data.json"

# Настройки
URL = "https://api.hashmate-bot.com/v1/mining/pools"
URL_TG = "https://web.telegram.org/a/#7560219861"
INTERVAL = 900  #  (в секундах)
BUTTON_CLASS = "bot-menu"

chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"  # Путь к Chrome
subprocess.Popen([
    chrome_path,
    "--remote-debugging-port=9222",
    "--user-data-dir=C:/selenium_chrome_profile",  # Уникальный профиль для сессии
    "--new-window"
])

time.sleep(2)

# Подключаемся к уже открытому браузеру
options = webdriver.ChromeOptions()
options.debugger_address = "localhost:9222"  # Подключение к уже запущенному Chrome

driver = webdriver.Chrome(options=options)

def open_telegram():
    """Открывает Telegram Web в уже запущенном браузере."""
    print("🌐 Открытие Telegram Web...")
    driver.get(URL_TG)
    time.sleep(5)  # Ждем загрузки страницы
    # global tg_window
    # tg_window = driver.current_window_handle  # Запоминаем вкладку с Telegram




def click_button():
    """Ищет и нажимает на кнопку."""
    try:
        time.sleep(3)  # Ждем загрузки
        button = driver.find_element(By.CLASS_NAME, BUTTON_CLASS)  # Ищем кнопку по классу
        if button:
            button.click()
            print("✅ Кнопка нажата.")
        else:
            print("❌ Кнопка не найдена.")
    except Exception as e:
        print(f"Ошибка при нажатии на кнопку: {e}")


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

def main():
    """Основной цикл обновления страницы и нажатия на кнопку."""  
    while True:
        open_telegram()
        time.sleep(5)
        click_button()

        time.sleep(15)

        existing_data = load_existing_data()
        new_data = scrape_data()

        existing_block_numbers = {item["lastBlockNumber"] for item in existing_data}
        for entry in new_data:
            
            if isinstance(entry, dict):  # Убедись, что entry — это словарь
             if entry["lastBlockNumber"] not in existing_block_numbers:
                if entry["lastBlockNumber"] not in existing_block_numbers:
                 existing_data.append(entry)
            else:
                print("entry не является словарем:", entry)

        save_data(existing_data)
        print(f"✅ Данные обновлены. Следующее обновление через {INTERVAL // 60} минут.")
        time.sleep(INTERVAL)  # Ждем 10 минут

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("⛔ Скрипт остановлен пользователем.")
    finally:
        driver.quit()
