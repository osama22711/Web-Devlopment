# Blue

> Osama Albawab | April 20 2020

-------------------------------------

# 10.10.119.1

# using nmapscan we found that it has 4 ports open and vulnerable to MS17-010 /\ nmap -sV -vv --script vuln TARGET_IP /\ File can be found in nmap file in the directory!

# Vulnerable to MS17-010
> using metasploit i managed to get into the machine
> upgraded the shell to meterpreter shell
> we listed all the processes with command : PS
> then we migrated to the process name : winlogon.exe
> we dumped all the passwords on the system using : hashdump
  Passwords: `Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
  `
> User is Jon // His cracked password is alqfna22
> we used search -f [[FILE]] to search on windows



NOTE: This is my first time trying this...
      Although sometimes its frustraiting but i do like it overall



========================================================
# REFRENCE : 'https://www.youtube.com/watch?v=s6rwS7UuMt8'
========================================================
