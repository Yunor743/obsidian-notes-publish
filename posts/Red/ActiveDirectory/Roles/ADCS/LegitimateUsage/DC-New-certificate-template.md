
From the Domain Controller:

In the **Certification Authority** tool: "*Certificate Templates*"

1. Right click on "*Certificate Templates*".
2. Click on "*Manage/Manage*"
    1. This opens the certificate template console with the complete list
3. We start from a V1, right click on it > Duplicate
4. We modify...
5. Then we go back to the tree "*Certificate Templates*" by making a right click
6. Click on "*New*" > "*Certificate Template to be issued*"
7. We select the template created just before

The client can then potentially make a certificate request with this template.

![[Pasted image 20230111110947.png]]
![[Pasted image 20230111111552.png]]

![[Pasted image 20230111111638.png]]

Give it a name
![[Pasted image 20230111112554.png]]
Then we go back to the "*Certificate Templates*" tree by doing a right click
Click on "*New*" > "*Certificate Template to issue*".
![[Pasted image 20230111113242.png]]

We select the template created just before
![[Pasted image 20230111113414.png]]
The client can then potentially apply for a certificate with this template

We can then export it (and can we see that this certificate can be used for any purpose)
![[Pasted image 20230116172541.png]]

