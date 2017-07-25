#https://habrahabr.ru/post/280238/

from bs4 import BeautifulSoup
import lxml

f=open('/home/user/work/parsers/lot/raw3.html','r')
s=f.read()
soup = BeautifulSoup(s,'html.parser')
Elems=soup.select('.bingo_ticket')
Elems_qty=len(Elems)
print(Elems_qty)
tickets=open('tickets','wt')
tickets.write(str(Elems))
tickets.close()
strElems=str(Elems)

tdsoup=BeautifulSoup(strElems,'html.parser')
td=tdsoup.find_all('td')
print(len(td))
