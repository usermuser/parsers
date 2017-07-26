#https://habrahabr.ru/post/280238/
#http://www.stoloto.ru/ruslotto/game

from bs4 import BeautifulSoup
import lxml
import requests


try:
    f=open('/home/user/work/parsers/lot/raw3.html','r')
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
print len(tr_class)
print (type(tr_class))
print (tr_class)

l=[]
r=range(len(tr_class))
print r
for i in range(len(tr_class)-1):
	if str(tr_class[i]) == '<td></td>': 
		print(tr_class[i]) 
		#del(tr_class[i])

