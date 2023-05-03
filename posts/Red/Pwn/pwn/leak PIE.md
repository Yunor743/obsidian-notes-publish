### sources:
- https://www.youtube.com/watch?v=NAUA1EB-TZg&list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94&index=9
- https://youtu.be/NAUA1EB-TZg?list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94&t=848

- We can use a format string and leak the printf address, then substract the offset of printf in the libc
- We can use a BOF and ret RIP to puts() address, to then leak the offset of puts() in the libc