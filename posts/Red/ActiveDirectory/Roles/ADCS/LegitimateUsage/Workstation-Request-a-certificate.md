
##### 1. Open the Microsoft Management Console:
Windows > run.exe > mmc

##### 2. Display the certificate Component
File > Add/Remove Snap-in 
Add "Certificates" and click "ok"

![[Pasted image 20230111110237.png]]

##### 3. Go to the "Certificates - Current user" tree

and Right click on Personal > All tasks > Request a new certificate

![[Pasted image 20230111111147.png]]

In this case I'll use a custom template certificate, before requesting it, it ask me to specify some informations, 

Adding an "altname" as a upn, and apply 
![[Pasted image 20230111120242.png]]
Then I can continue my enrollment
![[Pasted image 20230111120346.png]]