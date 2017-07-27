#https://habrahabr.ru/post/280238/
#http://www.stoloto.ru/ruslotto/game
#-*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import sys
#import lxml
#import requests


try:
    #f=open('/home/user/work/parsers/lot/raw3.html','r')
    f=open('raw3.html','r', encoding='utf-8')
except Error:
    sys.exit("Could not open file!")

  
s=f.read()
soup = BeautifulSoup(s,'html.parser')

tr_class = soup.find('tr',{'class': 'numbers'}).select("td")
#tr_class = soup.find_next('tr',{'class': 'numbers'})#.select("td")
res=[]

for item in tr_class:
    x=str(item)[4:-5]
    if x!='': res.append(x)
print('res type: ',res,'\n') #это список спарсеных значений
print('res type: ',type(res),'\n')

##Тут мы запоняем словарь ключами 1-90 и нулевыми значениями

my_dict={}
my_dict.items
keys=[]
for i in range(1,91):
    keys.append(i)
    my_dict[keys[i-1]]=0
#print(my_dict)

#Тут мы деламе другую херню
for j in res:
    j=int(j)
    my_dict[j]=my_dict.get(j)+1
print(my_dict)

        
