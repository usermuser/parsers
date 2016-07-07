mport urllib
from bs4 import BeautifulSoup

myurl = urllib.urlopen("https://ya.ru")
# NOTE: At the interactive Python prompt, you may be prompted for a username
# NOTE: and password here.
# Read from the object, storing the page's contents in 's'.
s = myurl.read()
soup=BeautifulSoup(s,'html.parser') #or lxml instead of html.parser
pretty_string=soup.prettify()

#print(prettyfied)
myfile=open('file','wt')
myfile.write(pretty_string.encode('utf-8'))

#lxml was before instead of html.parser
myfile.close()



'''
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.prettify())
'''
