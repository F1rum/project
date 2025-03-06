import requests
from bs4 import BeautifulSoup
from bs4 import Tag
from js2py import eval_js  # pip install js2py

def scrape_data_with_javascript(url):
    
    try:
        # 1. Загрузка HTML
        response = requests.get(url)
        response.raise_for_status()  # Проверка на ошибки HTTP

        html = response.text
        soup = BeautifulSoup(html, 'html.parser')

        # 2. Поиск и извлечение JavaScript-кода
        scripts = soup.find_all('script')
        javascript_code = ""
        for script in scripts:
          if script.string: #Check if script has content.
            javascript_code += script.string + '\n' # Append content
          elif script.has_attr('src'):
            try:
              script_url = script['src'] # if source attribute exists
              script_response = requests.get(script_url)
              script_response.raise_for_status()
              javascript_code += script_response.text + '\n'

            except requests.exceptions.RequestException as e:
              print(f"Error fetching script from {script_url}: {e}")


        # 3. Выполнение JavaScript (с использованием js2py)
        try:
            #Создаем пустой объект для DOM
            dom = {}
            #Создадим функцию, которая будет находить элементы
            def querySelector(selector):
                if not selector.startswith('.'):
                    return None
                class_name = selector[1:]
                elements = []
                for element in soup.find_all(class_=class_name):
                    if isinstance(element, Tag):
                        elements.append(element)
                return elements[0] if elements else None
            #Выполняем JavaScript
            eval_js(javascript_code, dom=dom, querySelector=querySelector)

            # 4. Извлечение данных из "DOM" (или из глобальных переменных, если JavaScript изменяет их)
            # Попытка извлечь данные через DOM
            #This can vary depending on the JS code.  Needs to be adapted
            #title = dom.get('title')
            #description = dom.get('description')

            # If JS code is modifying global variables, extract from them
            #  (Adapt variable names based on the site's JS)
            title = dom.get("title")
            description = dom.get("description")
            #Example
            #if (title == None): #Example for different situation
            #  title = soup.find('h1').text

            # Если данные не найдены, пробуем искать по тегам
            if title is None:
                try:
                    title = soup.find('h1').text.strip()
                except AttributeError:
                    title = None
            if description is None:
                try:
                    description = soup.find('p', class_='description').text.strip()
                except AttributeError:
                    description = None

            return {"title": title, "description": description}

        except Exception as e:
            print(f"Ошибка при выполнении JavaScript или извлечении данных: {e}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при загрузке страницы: {e}")
        return None
    except Exception as e:
        print(f"Неизвестная ошибка: {e}")
        return None

# Example Usage (Replace with your target URL)
target_url = "https://5ka.ru/" # You should use a site with dynamic content loaded by javascript
scraped_data = scrape_data_with_javascript(target_url)

if scraped_data:
    print("Извлеченные данные:")
    for key, value in scraped_data.items():
        print(f"{key}: {value}")
else:
    print("Не удалось извлечь данные.")