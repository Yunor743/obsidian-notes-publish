### First identify if the binary has been build with python
```bash
strings bin.exe | grep -i python
# other tools
readelf
objdump
```

### To extract .pyc from .exe (or .elf)

> If pyinstaller has been used
https://github.com/extremecoders-re/pyinstxtractor

### To convert .pyc to .py or asm

> sometime you have to switch tools depending on the version of python that has been used

- https://github.com/zrax/pycdc
- https://github.com/rocky/python-uncompyle6

