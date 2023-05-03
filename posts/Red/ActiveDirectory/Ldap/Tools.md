
#### LDEEP
https://github.com/franc-pentest/ldeep

#### LDAPSEARCH
https://linux.die.net/man/1/ldapsearch

##### Check Anonymous access
```bash
ldapsearch -H ldaps://company.com:636/ -x -s base -b '' "(objectClass=*)" "*" +
# example
ldapsearch -H ldap://57.128.81.160/ -x -s base -b '' "(objectClass=*)" "*" +

# TIPS : there is another technique called LDAP Anonymous binds:
# https://book.hacktricks.xyz/network-services-pentesting/pentesting-ldap#ldap-anonymous-binds
```

##### Check null credentials or check if your credentials are valid:
```bash
ldapsearch -x -H ldap://<IP> -D '' -w '' -b "DC=<1_SUBDOMAIN>,DC=<TLD>"
ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "DC=<1_SUBDOMAIN>,DC=<TLD>"

# examples
ldapsearch -x -H ldap://57.128.81.160 -D '' -w '' -b "DC=labad,DC=fr"
ldapsearch -x -H ldap://57.128.81.160 -D 'LABAD\Administrator' -w 'pJkl49f' -b "DC=labad,DC=fr"
```

> Note **-b** is used to specify the search base *distinguished name* (DN), it's composed of multiple *relative distinguished name* (RDN) (a RDN could be a *common name* (CN), *organization unit* (OU), etc ...)

##### Authentication via kerberos
Using `ldapsearch` you can **authenticate** against **kerberos instead** of via **NTLM** by using the parameter `-Y GSSAPI`

### Some usefull LDAP queries

```bash
# extract users
ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "CN=Users,DC=<1_SUBDOMAIN>,DC=<TLD>"
# extract computers
ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "CN=Computers,DC=<1_SUBDOMAIN>,DC=<TLD>"
# extract my info 
ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "CN=<MY NAME>,CN=Users,DC=<1_SUBDOMAIN>,DC=<TLD>"
# extract Remote Desktop Users
ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "CN=Remote Desktop Users,CN=Builtin,DC=<1_SUBDOMAIN>,DC=<TLD>"


# some examples
ldapsearch -x -H ldap://57.128.81.160 -D 'LABAD\administrator' -w 'pJkl49f' -b "CN=Users,DC=labad,DC=fr"

ldapsearch -H ldap://57.128.81.160/ -D 'LABAD\administrator' -w 'pJkl49f' -b 'DC=labad,DC=fr' "(&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki  
-rasignature=*)))(|(pkiextendedkeyusage=1.3.6.1.4.1.311.20.2.2)(pkiextendedkeyusage=1.3.6.1.5.5.7.3.2)(pkiextendedkeyusage=1.3.6.1.5.2.3.4)(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*)))(mspkicertificate-name-flag:1.2.840.113556.1.4.804:=1))"
```

To see if you have access to any password you can use grep after executing one of the queries:
```
<ldapsearchcmd...> | grep -i -A2 -B2 "userpas"
```


---

Sources:
- https://book.hacktricks.xyz/network-services-pentesting/pentesting-ldap