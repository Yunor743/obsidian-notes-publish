```bash
bash $> gdb-pwndbg ./my.bin
pwndbg> cyclic 100 # generate a cyclic pattern
pwndbg> run # run the program
pwndbg> cylic -l taa # lookup for the offset of the sub pattern in the pattern
pwndbg> piebase # get the PIE base of the binary
pwndbg> pwndbg # get a list of all available commands
pwndbg> help # get a help menu
pwndbg> r2 # call radare2 from pwndebug !
pwndbg> unhex <value> # un hex a hexadecimal value

# infos about functions
pwndbg> i f

# infos about the file
pwndbg> info file

# place breakpoint at address
pwndbg> b * 0x00001234

# place breakpoint at function + offset
b *(&error+184)
b *(error+184)

# list brekpoints
pwndbg> i b

# remove a breakpoint
pwndbg> del <breakpoint number (ex: 2)>

# start program with arguments
pwndbg> r <program arguments>

# display register
pwndbg> i r

# display the context (main informations)
pwndbg> context

# set a value
pwndbg> set <address (ex: * 0x00001234) or register (ex: $rdi)>=<value>
# tips : set value of $rip to move to the instruction of your choice in the program

# display info:
# 100 address as hexdump
pwndbg> x/100x <address (ex: * 0x00001234) or register (ex: $rdi)>
# 100 address as string
pwndbg> x/100s <address (ex: * 0x00001234) or register (ex: $rdi)>
# 100 address as insctructions
pwndbg> x/100i <address (ex: * 0x00001234) or register (ex: $rdi)>

# display the call stack
pwndbg> where

# stop execution
pwndbg> kill

```