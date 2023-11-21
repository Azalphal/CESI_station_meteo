import requests
import time
import random

while True:
    data = {'temperature': random.uniform(-50, 50), 'humidite': random.uniform(0, 100)}

    print(f"sending data {data}")

    response = requests.post('http://127.0.0.1:5000/api', json=data)

    # Check the status code and print the description
    if response.status_code in requests.status_codes._codes:
        description = requests.status_codes._codes[response.status_code][0]
        print(f"Status Code: {response.status_code} - {description}")
    else:
        print(f"Status Code: {response.status_code} - Unknown description")

    time.sleep(5)
