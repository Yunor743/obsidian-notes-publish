### Servers

#### Quad9
> Good Privacy, Run by non profit organization

9.9.9.9

#### Google
> Fast and more complete, but no privacy

8.8.8.8

#### CloudFlare
> Good privacy and fast

1.1.1.1


### Tools

Use `dig`
> For a while `nslookup` was being reported as a deprecated application and should not be used anymore.

```bash
dig Hostname
dig DomaiNameHere
dig @DNS-server-name Hostname
dig @DNS-server-name IPAddress
dig @DNS-server-name Hostname|IPAddress type
```

#### search for a specific type of record

```bash
talion@pluton Desktop [2]> dig @9.9.9.9 sekoia.fr txt

; <<>> DiG 9.16.27-Debian <<>> @9.9.9.9 sekoia.fr txt
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 1251
;; flags: qr rd ra; QUERY: 1, ANSWER: 10, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;sekoia.fr.                     IN      TXT

;; ANSWER SECTION:
sekoia.fr.              10800   IN      TXT     "NB+/o4QkSaDYkcJ5o9uP2jGeXow="
sekoia.fr.              10800   IN      TXT     "google-site-verification=kVxSwrelmvUQUv0vO7lxbvbOstOQUmdpMi-vIGjtOkc"
sekoia.fr.              10800   IN      TXT     "google-site-verification=582moDfvJRVdaGbOENRzw90ALrYlLrdQZOyhV27BuQ8"
sekoia.fr.              10800   IN      TXT     "MS=DDC05B87E7CA5CECCF4F3D0471AF1DFBF7426D49"
sekoia.fr.              10800   IN      TXT     "MS=ms37984783"
sekoia.fr.              10800   IN      TXT     "google-site-verification=0b6qQTQJQMdem6A5n0t-3D7v6Q1SFcWgxwuPesqyDjA"
sekoia.fr.              10800   IN      TXT     "google-site-verification=X9I0d_ZBQYG9sHfSrnh8s1UlVGDeJELXWps3TSVqErM"
sekoia.fr.              10800   IN      TXT     "google-site-verification=3kiLUcTamAQBphR0qky__W2xFUEXZAf-w8O33xZsJfk"
sekoia.fr.              10800   IN      TXT     "ngKvdOLWYa7JQhljhYtw69aZA4o="
sekoia.fr.              10800   IN      TXT     "v=spf1 mx include:spf.mandrillapp.com include:_spf.google.com include:servers.mcsv.net include:spf.protection.outlook.com ip4:213.41.152.147 ~all"

;; Query time: 35 msec
;; SERVER: 9.9.9.9#53(9.9.9.9)
;; WHEN: Mon Oct 10 18:47:26 CEST 2022
;; MSG SIZE  rcvd: 765
```

#### print all the records
use the record `ANY`

```bash
talion@pluton Desktop> dig sekoia.fr ANY
```


#### Reverse loop up
`dig -x`

example
```bash
talion@pluton Desktop> dig @9.9.9.9 -x 8.8.8.8

; <<>> DiG 9.16.27-Debian <<>> @9.9.9.9 -x 8.8.8.8
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 49920
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;8.8.8.8.in-addr.arpa.          IN      PTR

;; ANSWER SECTION:
8.8.8.8.in-addr.arpa.   12016   IN      PTR     dns.google.

;; Query time: 20 msec
;; SERVER: 9.9.9.9#53(9.9.9.9)
;; WHEN: Mon Oct 10 18:39:13 CEST 2022
;; MSG SIZE  rcvd: 73
```

> We query 9.9.9.9 (quad9 dns) for a reverse lookup on 8.8.8.8 we discover that 8.8.8.8 is associated to dns.google.com


### Human readable
`+noall +answer +multiline`
These ... +noall +answer +multiline ... are strictly optional and are simply output formatting flags to make the output more easily human readable (see dig man page).

```bash
talion@pluton Desktop> dig +noall +answer +multiline @9.9.9.9 sekoia.fr any
sekoia.fr.              1744 IN NS ns-95-b.gandi.net.
sekoia.fr.              1744 IN NS ns-160-c.gandi.net.
sekoia.fr.              1744 IN NS ns-57-a.gandi.net.

```