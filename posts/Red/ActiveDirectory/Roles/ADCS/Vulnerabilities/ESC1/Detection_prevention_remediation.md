
## DETECT 1

One can query the CA database in multiple ways. Running certutil.exe -v -view will output very detail information about all certificates. Because there are likely thousands of requests in an enterprise environment, filtering can occur using the -restrict parameter. For example, the command

```bash
certutil.exe -v -view -restrict
"Disposition=20,Request.SubmittedWhen>=5/21/2021 11:15
AM,RequesterName=CORP\\itadmin" -gmt -out requestername,rawrequest
```

will show the Windows user that submitted the CSR (-out requestername) and will display the parsed CSRs (-v for verbose output, -out rawrequest to show the CSR) for issued certificates (Disposition=20) submitted after May 21, 2021 at 11:15 AM (local time) where the requesting user was CORP\itadmin, displaying all times in GMT (-gmt).


## LDAP QUERY

> source, hacktricks : https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#abuse

"Moreover, the following LDAP query when run against the AD Forest’s configuration schema can be used to **enumerate** **certificate templates** that do **not require approval/signatures**, that have a **Client Authentication or Smart Card Logon EKU**, and have the **`CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT`** flag enabled:"
```
(&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki-rasignature=*)))(|(pkiextendedkeyusage=1.3.6.1.4.1.311.20.2.2)(pkiextendedkeyusage=1.3.6.1.5.5.7.3.2)(pkiextendedkeyusage=1.3.6.1.5.2.3.4)(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*)))(mspkicertificate-name-flag:1.2.840.113556.1.4.804:=1))
```

Trying to use it in our lab but didn't return nothing interesting:
```bash
talion@pluton ADCS [32]> ldapsearch -H ldap://57.128.81.160/ -D 'LABAD\administrator' -w 'pJkl49f' -b 'DC=labad,DC=fr' "(&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(
mspki-rasignature=*)))(|(pkiextendedkeyusage=1.3.6.1.4.1.311.20.2.2)(pkiextendedkeyusage=1.3.6.1.5.5.7.3.2)(pkiextendedkeyusage=1.3.6.1.5.2.3.4)(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*)))(mspkicertificate-name-flag:1.2.
840.113556.1.4.804:=1))"
# extended LDIF
#
# LDAPv3
# base <DC=labad,DC=fr> with scope subtree
# filter: (&(objectclass=pkicertificatetemplate)(!(mspki-enrollmentflag:1.2.840.113556.1.4.804:=2))(|(mspki-ra-signature=0)(!(mspki-rasignature=*)))(|(pkiextendedkeyusage=1.3.6.1.4.1.311.20.2.2)(pkiextendedkeyusage=1.3.6.1.5.5.7.3.2)(pkiextendedkeyusage=1.3.6.1.5.2.3.4)(pkiextendedkeyusage=2.5.29.37.0)(!(pkiextendedkeyusage=*)))(mspkicertificate-name-flag:1.2.840.113556.1.4.804:=1))
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