
> source : https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf (page 15)

A certificate is an X.509-formatted digitally signed document used for encryption, message signing, and/or authentication. A certificate typically has various fields, including some of the following:

- **Subject** - The owner of the certificate.
- **Public Key** - Associates the Subject with a private key stored separately.
- **NotBefore** and **NotAfter** dates - Define the duration that the certificate is valid.
- **Serial Number** - An identifier for the certificate assigned by the CA.
- **Issuer** - Identifies who issued the certificate (commonly a CA).
- **SubjectAlternativeName** - Defines one or more alternate names that the Subject may go by. 
- **Basic Constraints** - Identifies if the certificate is a CA or an end entity, and if there are any constraints when using the certificate.
- **Extended Key Usages (EKUs)** - Object identifiers (OIDs) that describe how the certificate will be used. Also known as Enhanced Key Usage in Microsoft parlance. Common EKU OIDs include: 
	- Code Signing (OID 1.3.6.1.5.5.7.3.3) - The certificate is for signing executable code. 
	- Encrypting File System (OID 1.3.6.1.4.1.311.10.3.4) - The certificate is for encrypting file systems.
	- Secure Email (1.3.6.1.5.5.7.3.4) - The certificate is for encrypting email.
	- Client Authentication (OID 1.3.6.1.5.5.7.3.2) - The certificate is for authentication to another server (e.g., to AD).
	- Smart Card Logon (OID 1.3.6.1.4.1.311.20.2.2) - The certificate is for use in smart card authentication. 
	- Server Authentication (OID 1.3.6.1.5.5.7.3.1) - The certificate is for identifying servers (e.g., HTTPS certificates).
- **Signature Algorithm** - Specifies the algorithm used to sign the certificate.
- **Signature** - The signature of the certificates body made using the issuer’s (e.g., a CA’s) private key. The information includ

The information included in a certificate binds an identity - the Subject - to the key pair. An application can then use the key pair in operations as proof of the identity of the user.

The `pKIExtendedKeyUsage` attribute on an AD certificate template object contains an array
of OIDs enabled in the template. These EKU OIDs affect what the certificate can be used for and
include things like the Encrypting File System (OID 1.3.6.1.4.1.311.10.3.4), Code Signing (OID
1.3.6.1.5.5.7.3.3), Smart Card Logon (OID 1.3.6.1.4.1.311.20.2.2), Client Authentication (OID
1.3.6.1.5.5.7.3.2), and many more. PKI Solutions has a breakdown of the EKU OIDs available from
Microsoft.

## !! For each of the exploitation stage the correct OID must be present in the EKU field as a prerequisite !!

![[Pasted image 20230111141927.png]]
