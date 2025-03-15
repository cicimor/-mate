import time
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains


# Настройки
START_TG = "https://web.telegram.org"
URL_TG = "https://web.telegram.org/a/#7560219861"
INTERVAL = 900  # (в секундах)
QUESTS_LINK = 'https://hashmate-bot.com/quests'
BUTTON_CLASS = "#MiddleColumn > div.messages-layout > div.Transition > div > div.middle-column-footer > div.Composer.shown.mounted > div.composer-wrapper > div > button.Button.bot-menu.open.default.translucent.round"
ADS_BUTTON = "quests__tasks-button"
START_BUTTON_CLASS = "bot-menu"
DOWN_BUTTON = "icon-down"

# Пути
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
    """Открывает Telegram Web."""
    print("🌐 Открытие Telegram Web...")
    driver.get(URL_TG)
    time.sleep(3)

def start_telegram():
    """Открывает Telegram Web на стартовой странице."""
    print("🌐 Открытие Telegram Web...")
    driver.get(START_TG)
    time.sleep(3)

def open_bot():
    """Открывает Бота по ссылке."""
    print("🌐 Копирует ссылку на mate")
    iframe_element = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/div/div/div[2]/div[10]/div/iframe")
    URL_BOT = iframe_element.get_attribute("src")
    time.sleep(1)
    print("Открывает MATE")
    driver.get(URL_BOT)
    time.sleep(5)  # Ждем загрузки страницы
    print("Заходит в раздел с заданиями ")
    driver.get(QUESTS_LINK)

def click_button():
    """Ищет и нажимает на кнопку."""
    try:
        time.sleep(4)
        button = driver.find_element(By.CLASS_NAME, START_BUTTON_CLASS)  # Ищем кнопку по классу
        if button:
            button.click()
            print("✅ Кнопка нажата.")
        else:
            print("❌ Кнопка не найдена.")
    except Exception as e:
        print(f"Ошибка при нажатии на кнопку: {e}")

def click_button_quests(retries=5, delay=2):
    """Ищет и нажимает на кнопку заданий, повторяя попытки."""
    for attempt in range(1, retries + 1):
        try:
            time.sleep(delay)
            # Проверяем, есть ли кнопка на странице
            buttons = driver.find_elements(By.CLASS_NAME, ADS_BUTTON)
            if not buttons:
                print(f"⏳ Кнопка не найдена. Попытка {attempt}/{retries}.")
                continue
            button = buttons[0]
            driver.execute_script("arguments[0].click();", button)
            time.sleep(2)
            return True
        except Exception as e:
            print(f"⚠️ Попытка {attempt}/{retries} не удалась. Ошибка: {e}")

    print("❌ Не удалось найти кнопку после всех попыток.")
    return False

def click_button_down(retries=5, delay=2):
    """Ищет и нажимает на кнопку заданий, повторяя попытки."""
    for attempt in range(1, retries + 1):
        try:
            time.sleep(delay)
            # Проверяем, есть ли кнопка на странице
            buttons = driver.find_elements(By.CLASS_NAME, DOWN_BUTTON)
            if not buttons:
                print(f"⏳ Кнопка не найдена. Попытка {attempt}/{retries}.")
                continue
            button = buttons[0]
            driver.execute_script("arguments[0].click();", button)
            time.sleep(2)
            return True
        except Exception as e:
            print(f"⚠️ Попытка {attempt}/{retries} не удалась. Ошибка: {e}")

    print("❌ Не удалось найти кнопку после всех попыток.")
    return False

start_time = time.time()

def main():
    """Основной цикл обновления страницы и нажатия на кнопку."""
    start_telegram()
    input("Перед началом войдите в телеграм, затем нажмите Enter. p.s чтобы скрипт исправно работал НЕЛЬЗЯ СВОРАЧИВАТЬ БРАУЗЕР.")
    
    while True:
        open_telegram()
        click_button()
        time.sleep(6)
        click_button_down()
        time.sleep(1)
        open_bot()

        start_time = time.time()

        while time.time() - start_time < 60 * 60: #время в секундах
            click_button_quests()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("⛔ Скрипт остановлен пользователем.")
    finally:
        driver.quit()
