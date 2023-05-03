
> source : https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf
> source (p.55) : https://speakerdeck.com/heirhabarov/hunting-for-active-directory-certificate-services-abuse?slide=17
> source : https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#misconfigured-certificate-templates-esc1


## Misconfigured Certificate Templates - Allow requesters to specify a SAN

### Summary

In a vulnerable environment that has misconfigurations, ESC aims to build a certificate and use it to authenticate itself by impersonating an administrator.

### Prerequisites

On the DC, create a new certificate template, see [[DC-New-certificate-template]]

- The ADCS service gives the right to enroll a user without privilege *("user authenticated" for example)*.

![[Pasted image 20230111112155.png]]
- The certificate template allows authentication via the certificate *(Client Authentication EKU)*.
![[Pasted image 20230111112451.png]]
- The CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT parameter is present in the template, allowing to modify the subjectAltName *(SAN)* to spoof a user name.
![[Pasted image 20230111112843.png]]

### How it works

1. The attacker **finds a vulnerable certificate template,** i.e. one that has the prerequisites.
    1. Tool : certify
        1. g Certify.exe find /vulnerable
2. The attacker **generates a certificate with** :
    1. the subjectAltName corresponding to another account name 
3. The attacker requests a Kerberos authentication ticket (TGT) with this certificate

The attacker then obtains the rights

### Detection

- Monitor the enrollment of certificates

The generated Windows events do not provide enough information to determine if it is legitimate or not.

You need to retrieve the list of certificates from the server and dig into whether any may be malicious based on:

- The process that generated the request
- The name of the certificate template used
- The subject alternative name

- Monitor certificate authentication

When a certificate authentication is successful, a 4624 event is generated on the DC: *"An account successfully logged on "*.

In the case of malicious use of account spoofing, the login process is as follows:
- Schannel

And the authentication package: 
- Microsoft Unified Security Protocol Provider

