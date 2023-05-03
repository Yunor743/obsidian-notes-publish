
## What is ADCS?

Active Directory Certificate Service is a service that allows you to build a public key infrastructure.

## What is it for?

With a Certificate Authority, you will be able to manage your digital certificates, from issuing a certificate to revoking it. This security layer will provide the following benefits: integrity, authentication, non-repudiation and confidentiality. This is possible thanks to the use of both certificates and keys, which is why it is often referred to as PKI: *Public Key Infrastructure.*

This Microsoft certification authority will also be able to sign your [PowerShell] scripts (https://www.it-connect.fr/cours-tutoriels/administration-systemes/scripting/powershell/)
 so that their execution is authorized on your company's servers and clients.

## Architecture

![[Pasted image 20230111103042.png]]![[Pasted image 20230111103044.png]]

## Certificate

A certificate is used to sign messages, encrypt documents or authenticate oneself: there are different uses.

A certificate has fields including :

- **Subject** : the owner of the certificate
- **Public Key**
- **NotBefore** and **NotAfter**
- **Serial Number**
- **Issuer** : Identity of the issuer of the certificate
- **SubjectAlternativeNames**: One or more alternative names that the owner (subject) may have
- **Basic Constraints** : Constraints on the use of the certificate
- **Extended Key Usages (EKUs):** Object Identifiers (OIDs) that describe how the certificate can be used. Often includes the following:
    - Code signing: used to sign executable code
    - Encrypting file system: used to encrypt files
    - Secure Email : used to encrypt emails
    - Client authentication : used for authentication on another server
    - Server authentication : used for server identification (e.g. https)
- **Signature Algorithm**
- **Signature**

It respects the X509 standard.

## Certificate wrapping process

To obtain a certificate from AD CS, clients go through a process called enrollment. At a high level, during enrollment clients first find an Enterprise CA based on the objects in the Enrollment Services container discussed above. Clients then generate a public-private key pair and place the public key in a certificate signing request (CSR) message along with other details such as the subject of the certificate and the certificate template name. Clients then sign the CSR with their private key and send the CSR to an Enterprise CA server. The CA server checks if the client can request certificates. If so, it determines if it will issue a certificate by looking up the certificate template AD object specified in the CSR. The CA will check if the certificate template AD object’s permissions allow the authenticating account to obtain a certificate. If so, the CA generates a 16 certificate using the “blueprint” settings defined by the certificate template (e.g., EKUs, cryptography settings, and issuance requirements) and using the other information supplied in the CSR if allowed by the certificate’s template settings. The CA signs the certificate using its private key and then returns it to the client.

![[Pasted image 20230111103152.png]]

Different types of processes depending on the need:

- Web server (CLI typed via the administrator to generate the certificate, like a self-signed certificate)
- File signature
- Authentication of users / servers

## Certificate templates

Distributed certificates are defined from used templates which already contain information/configurations.

They can be seen as collections of parameters and policies that define how and when a certificate can be issued by the authority.

![[Pasted image 20230111142924.png]]

AD CS stores available certificate templates as AD objects with an objectClass of `pKICertificateTemplate` located in the following container:

```
CN=Certificate Templates,CN=Public Key Services,CN=Services,CN=Configuration,DC=<DOMAIN>,DC=<COM>
```

An AD certificate template object’s attributes define its settings, and its security descriptor controls what principals can enroll in the certificate or edit the certificate template
