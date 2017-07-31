#http://www.stoloto.ru/ruslotto/game
#-*- coding: utf-8 -*-
#<span class="ticket_id">29709977</span>


from bs4 import BeautifulSoup
import sys
#import lxml
#import requests


#try:
   #f=open('/home/user/work/parsers/lot/raw4.html','r')
#f=open('raw3.html','r', encoding='utf-8')
f=open('raw4.html','r')
#except IOError:
#    sys.exit("Durak takoi")

  
s=f.read()
soup = BeautifulSoup(s,'html.parser')
ss=soup.find_all('tr',{'class':'numbers'},'td')
#ss=str(ss)

z=[]
print ss
for i in ss:
	x=str(i).replace('<tr class="numbers"><td>','')
	x=x.replace('</td></tr>','')
	x=x.split('</td><td>')
	z.append(x)
my_dict={}
keys=[]
for i in range(1,91):
    keys.append(i)
    my_dict[keys[i-1]]=0
zu=[]
for item in z:
	for meti in item:
		if meti!='': zu.append(meti)
for j in zu:
    j=int(j)
    my_dict[j]=my_dict.get(j)+1
print(my_dict)


