#https://habrahabr.ru/post/280238/
#http://www.stoloto.ru/ruslotto/game
#-*- coding: utf-8 -*-

from bs4 import BeautifulSoup
#import lxml
#import requests


try:
    #f=open('/home/user/work/parsers/lot/raw3.html','r')
    f=open('raw3.html','r', encoding='utf-8')
except IOError:
    sys.exit("Could not open file!")

   
s=f.read()
soup = BeautifulSoup(s,'html.parser')
#Elems=soup.select('.bingo_ticket')
#print(type(Elems))
#Elems_qty=len(Elems)
#print(Elems_qty)
#print(Elems[0])

#tickets=open('tickets','wt')
#tickets.write(str(Elems))
#tickets.close()
#strElems=str(Elems)

#tdsoup = BeautifulSoup(strElems,'html.parser')
#td=tdsoup.find_all('td')


#print('=============================')

#ticket_list = soup.find('div', {'class': 'bingo_ticket ruslotto'})
tr_class = soup.find('tr',{'class': 'numbers'}).select("td")
print (len(tr_class))
print (type(tr_class))
print (tr_class)
print(type(tr_class[0]))
print(tr_class[0])
print('======================')
res=[]
for item in tr_class:
    x=str(item)[4:-5]
    #res.append(x[4:-5])
    if x!='': res.append(x)
print(res)
