X64 functions take it's parameter from registers : RDI, RSI, etc
> RDI will be the first parameter

X86 functions take it's paramters from the stack

The caller uses registers to pass the first 6 arguments to the callee. Given the arguments in left-to-right order, the order of registers used is: **%rdi, %rsi, %rdx, %rcx, %r8, and %r9**. Any remaining arguments are passed on the stack in reverse order so that they can be popped off the stack in order.