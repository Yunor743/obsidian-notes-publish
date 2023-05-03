
Use ASCII or UTF8 encoding 
> source : https://medium.com/@defsecone/evading-windows-defender-using-obfuscation-techniques-2494b2924807

Delete the following key (not stealth)
```
HKLM:\SOFTWARE\Microsoft\AMSI\Providers\{2781761E-28E0-4109-99FE-B9D127C57AFE}
```
> source : https://pentestlaboratories.com/2021/05/17/amsi-bypass-methods/
