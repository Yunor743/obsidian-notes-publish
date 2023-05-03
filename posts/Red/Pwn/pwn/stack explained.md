![[Pasted image 20230319145906.png]]
![[Pasted image 20230319150014.png]]

To deduce the padding / identify a BOF:
```
pwndbg> cyclic 100
# then enter the given pattern when you want to trigger the BOF and continue the execution until it crash
# wait to trigger an invalid address error
# get the value in EIP / RIP
pwndbg> cyclic -l <EIP value>
# example
pwndbg> cyclic -l taaa
76
# we know the padding is 76
```

![[Pasted image 20230320080448.png]]