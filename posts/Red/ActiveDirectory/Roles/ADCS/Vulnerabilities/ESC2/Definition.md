> source : https://speakerdeck.com/heirhabarov/hunting-for-active-directory-certificate-services-abuse?slide=21
> source (p.62) : https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf
> source : https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#misconfigured-certificate-templates-esc2

## Misconfigured Certificate Template - Any purpose EKU or no EKU

### Prerequisites

1. The Enterprise CA grants low-privileged users enrollment rights => same as in ESC1.
2. Manager approval is disabled => Same same as in ESC1.
3. No authorized signatures are required. => same as in ESC1.
4. An overly permissive certificate template security descriptor grants certificate enrollment rights to low-privileged users. =>  same as in ESC1.
5. The certificate template defines the Any Purpose EKU or no EKU

### Summary

This is a variation of ESC1

While templates with these EKUs can’t be used to request authentication certificates as other users without the CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT flag being present (i.e., ESC1), an attacker can use them to authenticate to AD as the user who requested them and these two EKUs are certainly dangerous on their own.

Since it have pretty the same requierements as ESC1,
**IF** the  CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT parameter is present in the template, you can simply do the same exploit as [ESC1](Methodology/Red/ActiveDirectory/Roles/ADCS/Vulnerabilities/ESC1/Definition.md)
**ELSE** you can do the same exploit as [ESC3](Methodology/Red/ActiveDirectory/Roles/ADCS/Vulnerabilities/ESC3/Definition.md) to request a new certificate

