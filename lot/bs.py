#-*- coding: utf-8 -*-
#https://habrahabr.ru/post/280238/
#http://www.stoloto.ru/ruslotto/game
#-*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import sys
#import lxml
#import requests


try:
    f=open('/home/user/work/parsers/lot/raw4.html','r')
    #f=open('raw3.html','r', encoding='utf-8')
except IOError:
    sys.exit("Durak takoi")

  
s=f.read()
soup = BeautifulSoup(s,'html.parser')

tr_class = soup.find('tr',{'class': 'numbers'}).select("td")
var = soup.title
ss=soup.find_all('tr',{'class': 'numbers'}) #ss is a list of all strings with numbers (20 tickets with 6 strings=120)

print ('\n')
print('first element in list')
print (ss[0])
print ('\n')
print ('ss type is')
print (type(ss))
print len(ss) 
print (ss[1])
print('\n')
print('soup.title.string: ')
print(soup.title.string)
print('\n')
print("var.encode('utf-8')")
print(var.encode('utf-8'))
print('\n')
print('trying to open output_file')
output_file=open('120.txt','a')

#output_file.write(str(ss))
for i in range(len(ss)):
	print(ss[i])
    
	#print('\n')
	#stri=str(i)[20]
	#print stri
	
	#output_file.write(str((ss[i])))
	#output_file.write('\n')
output_file.close()
print('Writing complete')

#tr_class = soup.find_next('tr',{'class': 'numbers'})#.select("td")

'''
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

        
'''