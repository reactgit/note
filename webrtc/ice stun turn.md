从 stun server 那里获取的 公网 ip+port

可以等所有的 candidate 收集到后 再和sdp 一起发给对方, 也可以 sdp 和 canditate 分开发送



Trickle ICE //之前是要把所有的candidate都搜集到后再检查他们的联通性，现在是搜集到一个后就检查
呼叫建立很慢 ，先与stun服务器通信获取 server reflexive 地址和relay 地址，加上local host地址和端口 构造三类ice candidate ，把这三类candidate 放到sdp 属性 (a=) ，完成这个动作后才实际发起sdp offer请求，接收者采用同样的过程，两边都完整收完对方的sdp后才开始p2p探测
 
防火墙打洞服务器(STUN(Simple Traversal of UDP over NATs)/TURN(Traversal Using Relay NAT)/ICE Server)
stun: server-reflexive地址（内网地址被NAT映射后的地址）, 客户端向服务器要自己的公网地址及端口
The STUN server acting as an Echo Server, it first copies the IP from the header into the packet body.  When you receive the packet, you will know your public IP and can share this with the peer.
turn: turn服务器会给每个客户端都分配一个IP端口对，任何一个客户都知道其他客户端的IP端口对是多少。
若TURN协议被用作ICE协议中，那么它的转发IP端口对和其他伙伴的IP端口对都包含在ICE候选者信息中
对称NAT
 
webrtc-connectivity-woes-and-you
 
The ICE procedure includes 3 steps:
Gathering of candidates: Local Host (your local private IP address), STUN address(es) and TURN address(es)
Connectivity check:
Nomination: Choosing which candidate to use for the session
WebRTC uses Trickle ICE in an attempt to shorten the time this procedure takes
Aggressive nomination: 老的加速ice的方法， 就是检查完联通性后就假定已经nomination了，所以就直接建立连接，现在已经不用了
 
 
 
http://www.cppblog.com/tianhongye/archive/2015/01/15/209524.html


[STUN和TURN技术浅析](http://www.h3c.com.cn/MiniSite/Technology_Circle/Net_Reptile/The_Five/Home/Catalog/201206/747038_97665_0.htm)


 