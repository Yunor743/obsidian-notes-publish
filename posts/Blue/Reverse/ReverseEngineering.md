#reverse #r2 #radare2 #gdb

## Tools

### For windows
> See : https://www.apriorit.com/dev-blog/364-how-to-reverse-engineer-software-windows-in-a-right-way

##### Multi-purpose
- [Radare2](https://rada.re/n/)
##### Decompiler
- [Ghidra](https://ghidra-sre.org/)
###### Monitoring (process, usage and network)
- [Process hacker](https://processhacker.sourceforge.io/)
- [Wireshark](https://www.wireshark.org/)
- [Fiddler](https://www.telerik.com/fiddler)
##### Debuggers
- [WinDBG Preview](https://apps.microsoft.com/store/detail/windbg-preview/9PGJGD53TN86)
- [x64Dbg](https://x64dbg.com/)

##### Others + Utils
- [Resource Hacker](http://www.angusj.com/resourcehacker/)
- [Windows Sysinternals](https://learn.microsoft.com/en-us/sysinternals/)
- [Strings](https://learn.microsoft.com/en-us/sysinternals/downloads/strings)
- [HxD (hex editor)](https://mh-nexus.de/en/hxd/)


---


### Static analysis
- Radare2 (can do dynamic analysis too)
- Ghidra
- strings
- xxd
 
### Dynamic analysis
- Gdb (gdb-peda)
- Pwntools
- Frida

## Resources
- https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf


##### Disable ASLR:
When reversing it's generally a good idea to disable ASLR,
this allow the program to have the same addresses each time it's run 
```bash
# To temporarily disable ASLR on linux
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
# This allow you to attach a ptrace without using sudo each times
sudo sysctl kernel.yama.ptrace_scope=0

# to disable aslr on WINDOWS
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" -Name MoveImages -Value 0 -PropertyType DWORD -Force
```


#### Radare2
Interesting plugins:
- r2pm -ci r2ghidra
- r2pm -ci r2frida

```bash
# list you project
talion@M4R5 talion> r2 -p

# select a project
talion@M4R5 talion> r2 -p myproject

# save / create a new project
[0x000019f1]> Ps
# tips you can't save in debug mode (to leave debug mode sur "doc")

# Analyse the binary
[0x000019f1]> aaa

# List all functions
[0x000019f1]> afl
# List all functions with more infos
[0x000019f1]> afll

# Visual mode
[0x000019f1]> V
	# Disasembler view:
	# hit V then p

# Visual panel mode
[0x000019f1]> v

# Command mode : quit until you arrived on the default screen
q

# seek
[0x000019f1]> s <address>

# seek back
[0x000019f1]> s -

# get info about the binary
# info module help menu
[0x000019f1]> i?

# Show imports
[0x000019f1]> ii

# Show all info
[0x000019f1]> ia

# Show all strings
[0x000019f1]> iz
[0x000019f1]> izz

# Rename a variable and/or function parameters
[0x000019f1]> afvn (new name) (old_name)

# change type of a variable and/or function parameters
[0x000019f1]> afvt (var name) (new type)

# Rename a function (you have to seek at it's address)
[0x000019f1]> afn (new name)
# tips : foreach function name a flag is associated (used to seek), a flag is like a bookmark, but when you rename a function the flag name is not updated (see "f?" for more info) if you want to update all your flags you can, delete all the flags: "f--" then  analyse again "aaaa" but this will destroy all the other flags (like variable names) a better idea is to delete the specific flag only : "f- <flag name>"

# Show instructions
[0x000019f1]> pdf

# Show pseudo code (need ghidra plugin installed)
[0x000019f1]> pdg

# Add a commend where your seek address is
[0x000019f1]> CC "your comment"
[0x000019f1]> CC! # comment using your text editor
# tip : shortcut is shift + F8

# find a suite of instructions
[0x000019f1]> "/ad mov;call;mov;"

# Xrefs (find usage)
[0x000019f1]> axt <address or symbol>
[0x000019f1]> axt # will search for your seek address

# configuration
# edit global radare 2 config variable
[0x000019f1]> e config.var = value
# print global radare 2 config variable
[0x000019f1]> e config.var
# show possible values
[0x000019f1]> e dbg.btalgo = ?

# Enable ESIL
[0x000019f1]> e emu.str = true
# More info about ESIL:
# https://book.rada.re/disassembling/esil.html

# files
[0x000019f1]> o # print opened files
[0x000019f1]> o <file> # open new file
[0x000019f1]> op 3 # select file 3
[0x000019f1]> o-3 # close file 3
[0x000019f1]> oo+ # reopen current file in read/write mode

```

In visual or panel mode
```bash
# press p or P to rotate between panel / switch layout
# press V to rotate between screens
```

Only for visual panel mode (v)
```bash
You can change a panel type by selecting it and pressing '"' (double quote) key

You can manage your tab with the "t" key

You access the top menu with the "m" key

You can switch pane selection with the "tab" key

You can zoom on a specific panel with the "enter" key

You can close a pane with the "X" key

You can split horizontaly a pane with the "-" key

You can split verticaly a pane with the "|" key

# in "window mode" you can scale the panels
You can enter / leave the "window mode" with the "w" key
"hjkl" keys to move around the panels
"HJKL" to scale / resize the panels

```

Debugging
```bash
# Procedure to go in debug from a radare2 saved project
talion@M4R5 talion> r2 -p program
[0x000019f1]> doof <original binary path> # load another file
[0x000019f1]> ood <arguments if you want> # run / restart (with args)
[0x000019f1]> dc # continue

# restart debug
[0x000019f1]> do;dc # do reload the process, dc start execution


# Open in debug mode
talion@M4R5 talion> r2 -d ./program

# Help menu
[0x000019f1]> d?

# Reopen the current file in debug mode:
[0x000019f1]> oodf [file] # reopen in debug mode using the given file
[0x000019f1]> doof [file] # reopen in debug mode using the given file
[0x000019f1]> ood [args]  # start / restart debug (can have args)
[0x000019f1]> doo [args]  # start / restart debug (can have args)  

# Close debug session
[0x000019f1]> doc

# Reopen and Reattach to the program (used to restart)
[0x000019f1]> do # restart
[0x000019f1]> doo [args]

# Go in debugger view (start from command mode)
V then p then p

# Make the stack bigger in the debugger view
:> e stack.size = 256

# tips: F2 to toggle breakpoint in the debbuger view

# Step into
[0x000019f1]> ds
# tips: Shortcut is F7 in the debugger view

# Step over
[0x000019f1]> dso
# tips: Shortcut is F8

# Step until end of frame (Step out) in the debugger view
[0x000019f1]> dsf

# Continue
[0x000019f1]> dc

# Place breakpoint
[0x000019f1]> db <address or symbol>

# List breakpoint
[0x000019f1]> db

# Remove breakpoint
[0x000019f1]> db -<address>

# Stacktrace
[0x000019f1]> dbt
# if dbt isn't working, try using the following command => e dbg.btalgo = ?

# Tips : to place seek cursor at RIP, hit the "." (dot/perido) key


# Edit a register value
[0x000019f1]> dr eax = 0xA

# Edit value at a memory address
# To write the string "foo" into the memory address 0xdeadbeef:
[0x000019f1]> w foo @ 0xdeadbeef
# To write the hex 0x41414141 to the memory address 0xdeadbeef:
[0x000019f1]> w \x41\x41\x41\x41 @ 0xdeadbeef


# Display value
[0x000019f1]> x # same as px
[0x000019f1]> x @ 0x00001234 # display an address
[0x000019f1]> x @ esi # display from a register address
[0x000019f1]> x/[NUMBER][FMT] [@ address] # same as x/ in gdb
[0x000019f1]> x/10s
[0x000019f1]> x/10i @ 0x00001234

# display registers value
[0x000019f1]> dr

# display registers and their references (very usefull)
# if a register contain a pointer, this one will be dereferenced to show it's value, for the case of a string pointer, then the string will be displayed too, same for the character (very usefull)
[0x000019f1]> drr


# forks and threads
# Use `e dbg.forks=true` to stop the debugger when a fork happens.
# see https://reverseengineering.stackexchange.com/questions/11647/debugging-forked-child-in-an-anti-debug-protected-crackme
[0x000019f1]> dp # show current pid and children
[0x000019f1]> dpt # show current pid threads


```

**Debugging: stdin / stdout to another terminal**

- In the first terminal start your radare2 session in debug mode
- In the second terminal type `tty` to get your pty number / path, then use `sleep 999999` to avoid any other prompt from this tty
- Create a rarun file profile `profile.rr2` with the following content:
```bash
root@exegol-htb:/workspace# cat profile.rr2
#!/usr/local/bin/rarun2
stdio=/dev/pts/<terminal number>
```
- Then, in the radare2 sessions use: `e dbg.profile=profile.rr2`

> For more info, see https://reverseengineering.stackexchange.com/questions/16428/debugging-with-radare2-using-two-terminals

video example: https://i.imgur.com/LqrnYRP.mp4

**Debugging: stdin from a file
- In the terminal start your radare2 session in debug mode
- Create a rarun file profile `profile.rr2` with the following content:
```bash
root@exegol-htb:/workspace# cat profile.rr2
#!/usr/local/bin/rarun2
stdin=./file_containing_data_to_redirect_to_program_stdin.txt
```
- Then, in the radare2 sessions use: `e dbg.profile=profile.rr2`

This is very usefull if you want to use non-ascii value (for example binary exploitation)

> For more info, see https://book.rada.re/tools/rarun2/intro.html


Patching
```bash
# Open in write mode
talion@M4R5 talion> r2 -w ./program

# Or if radare2 is already launched:
[0x000019f1]> oo+ # reopen current file in read/write mode

# Help menu (first technique)
[0x000019f1]> w?

# Editing instructions (second technique):
# You have to be in Visual mode with write permission granted
# place your seek cursor on the instruction that you want to patch
# or type on "c" to dispay a cursor
# then type "A" (without using typing on ":")
# you can then type a X86(x64) instruction or use "q" to quit
# Instruction example:
# S> mov ebx, 3
# Once is done type "Y" to save the changes
# And you can leave radare2 with "q"
# the binary is patched :)

```

#### XXD short example
```bash
# dumping a binary file to hex format
talion@M4R5 Matrix> xxd white_rabbit.matrix > dump.txt
# the minimap on the right is only for humans, it wouldn't be interpreted again by xxd (even if modified)
talion@M4R5 Matrix> cat dump.txt
00000000: 0201 3900 1802 0168 035c 0300 541f 0028  ..9....h.\..T..(
00000010: 0303 025c 1800 2101 0102 0029 0301 5100  ...\..!....)..Q.
00000020: 5ce1 ff02 0151 0002 0273 0054 4c00 0201  \....Q...s.TL...
00000030: 7300 0202 7a00 5441 0075 6e62 656c 6965  s...z.TA.unbelie
00000040: 7661 626c 656d 6167 6e69 6669 6369 656e  vablemagnificien
00000050: 7447 472c 2075 7365 2074 6869 7320 7061  tGG, use this pa
00000060: 7373 776f 7264 2074 6f20 7661 6c69 6461  ssword to valida
00000070: 7465 214e 6f70 6520 3a28 1804 0160 0421  te!Nope :(...`.!
00000080: 0101 0100 2803 0102 5cef ff64 0a00 5400  ....(...\..d..T.
00000090: 00                                       .

# build a binary from a hexdum
talion@M4R5 Matrix> cat dump.txt | xxd -r > black_rabbit.matrix
# the two files are the same !
talion@M4R5 Matrix> diff black_rabbit.matrix white_rabbit.matrix
talion@M4R5 Matrix>
```

#### GDB cheat sheet
```bash
gdb ./program

# Disassembly flavor
set disassembly-flavor att
set disassembly-flavor intel
show disassembly-flavor

# infos about functions
gdb-peda$ i f

# infos about the file
gdb-peda$ info file

# place breakpoint at address
gdb-peda$ b * 0x00001234

# place breakpoint at function + offset
b *(&error+184)
b *(error+184)

# list brekpoints
gdb-peda$ i b

# remove a breakpoint
gdb-peda$ del <breakpoint number (ex: 2)>

# start program with arguments
gdb-peda$ r <program arguments>

# display register
gdb-pesa$ i r

# display the context (main informations)
gdb-peda$ context

# set a value
gdb-pesa$ set <address (ex: * 0x00001234) or register (ex: $rdi)>=<value>
# tips : set value of $rip to move to the instruction of your choice in the program

# display info:
# 100 address as hexdump
gdb-pesa$ x/100x <address (ex: * 0x00001234) or register (ex: $rdi)>
# 100 address as string
gdb-pesa$ x/100s <address (ex: * 0x00001234) or register (ex: $rdi)>
# 100 address as insctructions
gdb-pesa$ x/100i <address (ex: * 0x00001234) or register (ex: $rdi)>

# display the call stack
gdb-peda$ where

# stop execution
gdb-peda$ kill
```


#### Pwntools example
```python
from pwn import *

def main():
    proc = process('./matrix')

    gdb.attach(proc, '''
    set follow-fork-mode child
    b * 0x56556120
    run ./white_rabbit.matrix
    b * 0x565570f7
    continue
    ''')

    # Interact with the process
    proc.interactive()

if __name__ == '__main__':
    main()
```

##### example 2
```python

import requests
from pwn import *
import os

def main():
    res = wget("http://reverse.blackfoot.io:8080/ELF_01")
    file = open("ELF_01.bin", "wb")
    file.write(res)
    file.close()
    elf = ELF("./ELF_01.bin")
    flag = elf.read(0x2022, 20)
    print(flag)
    flagg = flag.decode("utf-8")
    print(flagg)
    res = wget("http://reverse.blackfoot.io:8080/validate/ELF_01/" + flagg)
    print("result : " + res.decode("utf-8"))

    # Interact with the process
    # proc.sendline('whoami')

if __name__ == '__main__':
    main()

```

#### Frida example

inspector.js
```js
var red = "\x1b[31m";

var myaddr = 0x56556832;

Interceptor.attach(ptr(myaddr), {
  onEnter: function(args) {
    console.log(red + 'Counter is ' + args[0].toInt32());
  },
  onLeave: function(retval) {
    console.log(red + 'Counter was ' + retval.toInt32());
  }
})

Interceptor.replace(ptr(myaddr), new NativeCallback(function(first) {
  return 1;
}, 'bool', ['int']))⏎
```

Run inspector.js against your binary:
```bash
# create a new process
frida ./matrix white_rabbit.matrix -l inspector.js
# attach to an existing process via name
frida matrix -l inspector.js
# attach to an existing process via PID
# TODO
```


## WASM

This function is usefull to fetch a value at a specific address in the wasm memory:
```js
function get_string(memory, addr) {
  let buffer = new Uint8Array(memory.buffer, addr, memory.buffer.byteLength - addr);
  let term = buffer.indexOf(0);

  return new TextDecoder().decode(buffer.subarray(0, term));
} 
```

## Other resources
- [Radare2 good tutorial serie](https://www.youtube.com/watch?v=oW8Ey5STrPI)
- [Official radare2 documentation](https://book.rada.re/)


