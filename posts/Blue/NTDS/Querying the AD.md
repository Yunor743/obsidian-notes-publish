After struggling referring to this issue : [https://github.com/ANSSI-FR/ADTimeline/issues/10](https://github.com/ANSSI-FR/ADTimeline/issues/10), I figured out that I need to redo the [[Setup AD LDS on win10]] but this time on a **Windows Server**

see [[Redo AD LDS on windows server 2019]]

Then ensure thas ADWS is running.
Start it using : `sc config ADWS start=demand` in `cmd.exe`, not powershell !

![[Pasted image 20221207110429.png]]

Check if the service is running:
![[Pasted image 20221207110327.png]]

## Running ADTimeline
![[Pasted image 20221207110554.png]]

Some files were generated:
![[Pasted image 20221207110754.png]]

## Running SharpHound

```powershell
PS C:\Users\Administrator\Desktop\FINAL\Sharphound> Import-Module .\SharpHound.ps1
PS C:\Users\Administrator\Desktop\FINAL\Sharphound> Invoke-BloodHound -Domain C137.LOCAL -LdapPort 3266 -DomainContro
ller localhost
2022-12-07T04:07:35.3769449-08:00|INFORMATION|This version of SharpHound is compatible with the 4.2 Release of BloodH
ound
2022-12-07T04:07:35.4780431-08:00|INFORMATION|Resolved Collection Methods: Group, LocalAdmin, Session, Trusts, ACL, C
ontainer, RDP, ObjectProps, DCOM, SPNTargets, PSRemote
2022-12-07T04:07:35.4941353-08:00|INFORMATION|Initializing SharpHound at 4:07 AM on 12/7/2022
2022-12-07T04:07:35.5424897-08:00|INFORMATION|Flags: Group, LocalAdmin, Session, Trusts, ACL, Container, RDP, ObjectP
rops, DCOM, SPNTargets, PSRemote
2022-12-07T04:07:40.1279714-08:00|ERROR|[CommonLib ACLProc]BuildGUIDCache - Unable to resolve forest
2022-12-07T04:07:44.7520112-08:00|ERROR|[CommonLib ACLProc]BuildGUIDCache - Unable to resolve forest
[...]
2022-12-07T04:11:21.5502959-08:00|ERROR|[CommonLib ACLProc]BuildGUIDCache - Unable to resolve forest
2022-12-07T04:11:26.1332731-08:00|ERROR|[CommonLib ACLProc]BuildGUIDCache - Unable to resolve forest
2022-12-07T04:11:26.1332731-08:00|INFORMATION|Beginning LDAP search for C137.LOCAL
2022-12-07T04:11:26.1635482-08:00|INFORMATION|Producer has finished, closing LDAP channel
2022-12-07T04:11:26.1992167-08:00|INFORMATION|LDAP channel closed, waiting for consumers
2022-12-07T04:11:56.7005663-08:00|INFORMATION|Status: 0 objects finished (+0 0)/s -- Using 81 MB RAM
2022-12-07T04:12:10.2034739-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
2022-12-07T04:12:26.7121038-08:00|INFORMATION|Status: 0 objects finished (+0 0)/s -- Using 83 MB RAM
2022-12-07T04:12:57.7247044-08:00|INFORMATION|Status: 0 objects finished (+0 0)/s -- Using 83 MB RAM
2022-12-07T04:13:28.7329556-08:00|INFORMATION|Status: 0 objects finished (+0 0)/s -- Using 83 MB RAM
2022-12-07T04:13:59.7509699-08:00|INFORMATION|Status: 0 objects finished (+0 0)/s -- Using 83 MB RAM
2022-12-07T04:14:09.6387459-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
[...]
2022-12-07T04:16:00.1286938-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
2022-12-07T04:16:00.1452701-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
2022-12-07T04:16:00.1452701-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
2022-12-07T04:16:01.1463361-08:00|INFORMATION|Consumers finished, closing output channel
2022-12-07T04:16:01.1463361-08:00|WARNING|[CommonLib LDAPUtils]Error getting forest, ENTDC sid is likely incorrect
2022-12-07T04:16:01.1634523-08:00|INFORMATION|Output channel closed, waiting for output task to complete
Closing writers
2022-12-07T04:16:01.2274006-08:00|INFORMATION|Status: 99 objects finished (+63 0.36)/s -- Using 84 MB RAM
2022-12-07T04:16:01.2274006-08:00|INFORMATION|Enumeration finished in 00:04:35.1093083
2022-12-07T04:16:01.2996782-08:00|INFORMATION|Saving cache with stats: 58 ID to type mappings.
 58 name to SID mappings.
 0 machine sid mappings.
 0 sid to domain mappings.
 0 global catalog mappings.
2022-12-07T04:16:01.2996782-08:00|INFORMATION|SharpHound Enumeration Completed at 4:16 AM on 12/7/2022! Happy Graphing!
PS C:\Users\Administrator\Desktop\FINAL\Sharphound>
```
![[Pasted image 20221207142000.png]]

## Running FastIR
![[Pasted image 20221207145024.png]]
![[Pasted image 20221207145105.png]]
