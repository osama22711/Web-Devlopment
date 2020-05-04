# Learn more about Shodan.io

> Osama Albawab | 05/05/2020

-------------------------------------------

> Shodan.io is a search engine for the Internet of Things.
> Pinging tryhackme.com [142.93.194.248] with 32 bytes of data
> An autonomous system number (ASN) is a global identifier of a range of IP addresses
> We can put the IP address into an ASN lookup tool such as `https://www.ultratools.com/tools/asnInfo`
> On Shodan.io, we can search using the ASN filter. The filter is ASN:[number] where number is the number we got from earlier, which is AS14061.
> Knowing the ASN is helpful, because we can search Shodan for things such as coffee makers or vulnerable computers within our ASN, which we know (if we are a large company) is on our network.
> shodan.io search query : asn:AS14061 product:MySQL
> we can also search for vulnerablities like [[ vuln:ms17-010 ]]
