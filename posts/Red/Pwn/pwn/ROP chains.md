get a list of gadgets, use **ropper** : https://github.com/sashs/Ropper

```
pip install ropper # if pip don't work just clone the repo and install it in a virtualenv
ropper --file ./mybin
ropper --file ./mybin --search "jmp esp" # to apply a filter
ropper -f ./mybin --search "pop rdi; ret"
```

example:
```bash
(venv) $> python3 Ropper.py --file ../pb --search "pop rdi"
[INFO] Load gadgets from cache
[LOAD] loading... 100%
[LOAD] removing double gadgets... 100%
[INFO] Searching for gadgets: pop rdi

[INFO] File: ../pb
0x000000000040142b: pop rdi; ret;
```

Get address (or offset) of a symbol in a object
```bash
objdump -d libc-2.31.so | grep system
```