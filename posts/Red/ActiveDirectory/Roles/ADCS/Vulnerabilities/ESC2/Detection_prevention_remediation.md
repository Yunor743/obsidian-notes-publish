## LDAP QUERY

> source, hacktricks : https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#misconfigured-certificate-templates-esc2

"The following LDAP query when run against the AD Forest’s configuration schema can be used to enumerate templates matching this scenario:"
```
(&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki-rasignature=*)))(|(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*))))
```

Trying to use it in our lab but didn't return nothing interesting:

```bash
talion@pluton ADCS> ldapsearch -H ldap://57.128.81.160/ -D 'LABAD\administrator' -w 'pJkl49f' -b 'DC=labad,DC=fr' "(&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki-rasignature=*)))(|(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*))))"
# extended LDIF
#
# LDAPv3
# base <DC=labad,DC=fr> with scope subtree
# filter: (&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki-rasignature=*)))(|(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*))))
# requesting: ALL
#

# search reference
ref: ldap://ForestDnsZones.labad.fr/DC=ForestDnsZones,DC=labad,DC=fr

# search reference
ref: ldap://DomainDnsZones.labad.fr/DC=DomainDnsZones,DC=labad,DC=fr

# search reference
ref: ldap://labad.fr/CN=Configuration,DC=labad,DC=fr

# search result
search: 2
result: 0 Success

# numResponses: 4
# numReferences: 3

```