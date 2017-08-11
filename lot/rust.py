#-*- coding: utf-8 -*-
#http://www.stoloto.ru/ruslotto/game
from bs4 import BeautifulSoup
import urllib.request


##sauce=urllib.request.urlopen('http://www.stoloto.ru/ruslotto/game').read()
sauce=open('raw4.html','r').read()
soup=BeautifulSoup(sauce,'lxml')

table = soup.table

print(table)
