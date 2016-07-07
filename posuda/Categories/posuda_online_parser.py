import urllib, csv
from bs4 import BeautifulSoup

myurl = urllib.urlopen("http://posudacenter.ru/")
# NOTE: At the interactive Python prompt, you may be prompted for a username
# NOTE: and password here.
# Read from the object, storing the page's contents in 's'.
s = myurl.read()
#soup=BeautifulSoup(s,'html.parser')
soup=BeautifulSoup(s,'lxml')
#pretty_soup=soup.prettify()
#encoded_html=pretty_soup.encode('utf-8')
#myfile=open('posudacenter.html','wt')
#myfile.write(soup)
#myfile.close()
#print('Website saved in',myfile.name)



Elems=soup.select('.header-toolbar-navigation__item .header-toolbar-navigation__link')
#step1 write presta catalogs pattern in csv file
presta_cat_pattern = "ID;Active (0/1);Name *;Parent category;Root category (0/1);Description;Meta title;Meta keywords;Meta description;URL rewritten;Image URL\n"
f=open('parsed.csv','wt')
f.write(presta_cat_pattern)

#step2 count how many catalogs we have
Elems_quantity=len(Elems)                                    #count list of extracted catalogs
print('Catalogs quantity = ',Elems_quantity)

#step3 write id of each catalog in column in csv file from 1 to 8 (according quanitiy)
#also fill in "ACTIVE" column, fill "Name column" with categegories names, and so on see "presta_cat_pattern"
# ID; ACTIVE; NAME; Parent category; etc
id=21                                                        #ID of categories, this id we will increase soon
for i in range(Elems_quantity):                              #start iterato over all found elements in html file 
        f.write(str(id))                                     #column  ID (ID writer) must be string
        id=int(id)+1                                         #ID increment (converted to integer)
        f.write(';1;')                                       #write in column Active 1 because i think all cats will be active
        enc=Elems[i].text.encode('utf-8')
        #f.write(Elems[i].text)                               #write categories names
        f.write(enc)                                          #write categories names
        f.write(';Home;')                                    #write text "Parent category"
        f.write('0;')                                        #Root category (0/1)
        f.write('Description;')                              #bla bla
        f.write('\n')                                        #write new line symbol
f.close()                                                    #close file
print('cats written in file =',f.name)                       #show csv file with extracted data






            
### ***place for patterns*** ###
'''
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.prettify())
'''

###############################
