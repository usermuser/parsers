#!/usr/bin/python3
import bs4, csv

soup=bs4.BeautifulSoup(open('posuda.html'),'lxml')                                                              #open prepared file
Elems=soup.select('.header-toolbar-navigation__item')                                                           #find 

Elems_quantity=len(Elems)             
print('Catalogs quantity = ',Elems_quantity)

f=open('first_filter.html','wt')
for i in range (Elems_quantity):
    f.write(Elems[i]) #here i want to write all filtered links and other text to file "first_filter.html"
f.close()
print('Filtered successfully')
'''
#step2 count how many catalogs we have
Elems_quantity=len(Elems)                                    #count list of extracted catalogs
print('Catalogs quantity = ',Elems_quantity)
'''


