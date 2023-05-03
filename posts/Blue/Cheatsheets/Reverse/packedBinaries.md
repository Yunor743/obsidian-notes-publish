
To identify the packer you can use [Detect-it-easy engine](https://github.com/horsicq/Detect-It-Easy)

![[Pasted image 20230213141329.png]]

This binary seems to be using ASPack2.

Then we can run the yara rules from the packer folder of the [Yara Rules repo](https://github.com/Yara-Rules/rules/tree/master/packers) 

![[Pasted image 20230213141840.png]]

Other tips, when you have an exe you can also use [capa](https://github.com/mandiant/capa) de mandiant, it provides a lot of info.
In my example I also used the aspack rule downloaded from the [capa-rules repo](https://github.com/mandiant/capa-rules/releases)
