# -*- coding: utf-8 -*-
import requests

url = 'http://www.stoloto.ru/ruslotto/game'
headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh;Intel Mac OS X 10.9; rv:45.0)Gecko/20100101 Firefox/45.0'
      }

r = requests.get(url, headers = headers)
with open('tick.html','w') as output_file:
    output_file.write(r.text.encode('utf-8'))
print("Parsing complete")
    
