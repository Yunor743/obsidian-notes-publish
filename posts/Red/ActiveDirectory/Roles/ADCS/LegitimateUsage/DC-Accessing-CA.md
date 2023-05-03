
The CA is stored in the AD, which allows it to be sent to all the clients (i.e. computers) present in the domain.

In the ADCS server, you can open **ADSI Edit**

Then connect to the "Configuration" partition

![[Pasted image 20230111110728.png]]

By exploring the tree structure :

- CN=Configuration,DC=labad,DC=en
    - CN=Services
        - CN=Public Key Services
            - CN=Certification Authorities

We find the CA.
