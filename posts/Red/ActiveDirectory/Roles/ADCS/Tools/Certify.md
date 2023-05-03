
Github : https://github.com/GhostPack/Certify

> You can find pre-compilled binaries at : [https://github.com/r3motecontrol/Ghostpack-CompiledBinaries](https://github.com/r3motecontrol/Ghostpack-CompiledBinaries)

Certify is an offensive tool to exploit the weaknesses of ADCS, In particular, it allows to:
- List vulnerable certificate templates (ESC1 -> ESC8)
- Request a certificate
- Export certificate templates

It can be combined with Rubeus to make a Kerberos ticket request (TGT) based on a recovered certificate

**examples**
```powershell
# list all activated certificates
Certify.exe find [/ca:SERVER\ca-name | /domain:domain.local | /path:CN=Configuration,DC=domain,DC=local] [/quiet]

# Find all vulnerable certificate templates from a low privilege group
Certify.exe find /vulnerable [/ca:SERVER\ca-name | /domain:domain.local | /path:CN=Configuration,DC=domain,DC=local] [/quiet]

# If you have already joined the domain you can omit some parameters:
Certify.exe find /vulnerable
```

