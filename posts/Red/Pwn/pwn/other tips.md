### CLI tool to generate payload

It's not mandatory to pass through python to write a payload you can directly do this using printf in bash

```bash
printf "\x00\x00\x00\x00" | xxd # write 4 NULL byte to stdout and see the representation in xxd 
printf "\x00\x00\x00\x00" | crackme.exe # write a payload and send it to stdin of crackme.exe
```
