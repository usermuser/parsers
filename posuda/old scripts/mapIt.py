#!/usr/bin/python3
#mapIt.py	-	Launches	a	map	in	the	browser	using	an	address	from	the
#command line or clippboard
import webbrowser,sys

if len(sys.argv)>1:
	#get adress from command line.
	address=''.join(sys.argv[1:])
else:
	#Get adress from clippboard
	address=pyperclip.paste()
webbrowser.open("http://google.com/maps/place/" + address)
print('\nTrying to open url in browser\n')