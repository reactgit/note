# NAT
NAT Session
## Static NAT
## Pooled NAT
## NAPT
### Symmetric NAT
### Cone NAT
#### Full Cone  
#### Restricted Cone
#### Port Restricted Cone

# STUN
http://blog.csdn.net/ustcgy/article/details/5652268

HTTPTunnel
http://blog.csdn.net/laoyouji/article/details/8130836

# UDP Hole Punching
# TCP 打洞
http://blog.csdn.net/sjin_1314/article/details/18178329
# ALG (Application Level Gateway)




WebRTC的一个特点是可以建立P2P的链接来减少端到端的传输延迟, 那具体的P2P的建立过程是怎样的? 先来看一下下面的概念.
## NAT

NAT(Network Address Translation, 网络地址转换), 即把局域网内的私有地址通过安装有NAT软件的路由器转换成一个公网地址, 这样局域网里的多个上网设备可以共用这个路由器的公网地址. NAT不仅解决了IP地址不足的问题, 而且NAT路由器隔离了局域网和外部网络, 避免来自外部网络的攻击.

NAT有三种转换方式: 

1. 静态转换(static NAT): 把一个私有地址和一个公网地址建立一对一映射, 这样外部网络就可以直接访问这个设备了.  
2. 动态转换(Pooled NAT/dynamic NAT): 当有多个公网地址可用时, 一个私有地址的请求到达路由器时, 路由器会分配一个公网地址给这个请求并把这个映射写到转换表里. 当那个私有地址长时间没有网络请求路由器就会把那个映射从转换表里删除, 那个公网地址又重新可用.
3. 端口地址转换(Port Address Translation): 路由器只有一个公网IP, 它为每一个私有地址的请求分配一个端口, 并把请求包的源地址修改为公网IP和这个端口. 这也是最常见的转换方式.

### 端口地址转换
端口地址转换分为锥型NAT(Cone NAT)和对称型NAT(Symmetric NAT), 如下图所示:

![](https://img.alicdn.com/tps/TB1DkCQNVXXXXc7XXXXXXXXXXXX-651-513.png)

假设内网主机的IP是192.168.1.100, 主机上有一个进程P, P的端口是1111. 中间的路由器的内网IP是192.168.1.1, 公网IP是115.236.139.17. 进程P要和服务器A(IP: 115.239.211.112, port: 6000)、 服务器B(IP: 115.239.211.113, port: 7000)和服务器C(IP: 115.239.211.114, port: 8000)通信.

首先进程P发送一个请求到A, 当这个请求到达中间的路由器时, 按照端口地址转换规则路由器会为这次请求分配一个端口2000, 并且把请求头的源IP和源端口改成115.236.139.17和2000后发送出去. 路由器会把192.168.1.100:1111 <---> 115.236.139.17:2000 <---> 115.239.211.112:6000的映射关系记录到转换表里. 也就是以后P要发送数据到A的话都会用这个2000端口, 路由器在2000端口上接收到A返回的数据时会把数据转给P, 其他到达200端口的数据都会被当作不速之客过滤掉, 因为这个时候P只请求过A.

然后P再发一个请求到B, 这时路由器可以像上图中上面部分(Cone NAT)那样继续用2000端口来转发这次请求, 也可以像下面(Symmetric NAT)那样再为这次请求分配一个端口3000. 同理到C的请求也是这样.

### 锥型NAT的分类
上面提到路由器在2000端口上收到不是来自A的数据时会被过滤, 这只是默认的处理, 根据策略的不同锥型NAT可以分为下面三种:

1. Full Cone NAT: 所有到2000端口的数据都会转发给A, 不管P之前是否访问过这些服务器.
2. Restricted Cone NAT: 所有到2000端口的数据必须满足它的源服务器的IP必须是A访问过的,只有这样的数据才会被转发.
3. Port Restricted Cone NAT: 和Restricted Cone NAT一样, 除了IP要是A访问过的, 端口也必须要是A访问过的.

## UDP打洞
有了上面的概念之后再看看下面的Client A和Client B怎么建立连接.先假设下图中的NAT A和NAT B都是Restricted Cone NAT, 并且NAT A给A分配的端口是2000, NAT B给B分配的端口是3000.

![](https://img.alicdn.com/tps/TB1ULqnNVXXXXXYaXXXXXXXXXXX-458-306.png)

首先A和B都不知道对方的IP是多少, 所以最开始还是需要一个STUN服务器来辅助建立连接. A和B都和服务器建立连接, 这样服务器就知道了A和B被路由器转换过的公网地址(115.236.139.17:2000和115.236.139.18:300). 服务器会把这些信息告诉给A和B, 这时A还不能直接通过B的地址给B发送数据, 因为会被NAT B拦截. 相反A会让服务器命令B给A发送数据(当然这个数据会被NAT A拦截), 就像是在NAT B上为A开了一个洞. 这之后A就可以给B发数据, 一旦B收到A的数据后就可以给A发数据了.

注意: 如果两侧NAT都是对称型NAT, 由于到服务器和对方的连接路由器分配的端口不一样, 所以用上面的方法无法建立连接, 具体的情况可以参考[P2P中NAT之间的打洞可能性](http://www.blogjava.net/linli/archive/2014/10/23/418968.html), 这里就直接给出结论: 

1. 只要单侧NAT属于Full Cone NAT, 即可实现双向通信.
2. 只要两侧NAT都不属于Symmetric NAT, 也可双向通信.
3. 一侧NAT属于Symmetric NAT, 另一侧NAT属于Restricted Cone, 也可双向通信.
4. 两个都是Symmetric NAT或者一个是Symmetric NAT另一个是Port Restricted Cone, 则不能双向通信.

## ICE

### STUN
上面利用STUN Server完成了P2P的建立, STUN是Session Traversal Utilities for NAT的缩写, 任何一端都可以通过它获取会话中所有端的公网地址, 并且可以通过它来检测当前这一端所处的NAT类型, 检测的大概过程可以参考[STUN检测NAT类型](http://blog.csdn.net/u012627972/article/details/47749663).

### TURN
上面提到在两端都是对称型NAT的情况下STUN无法协助建立P2P连接, 这时就需要TRUN(Traversal Using Relays around NAT) Server来中转两端的数据. 可以看出STUN Server只是在连接建立前起牵线搭桥的作用, 而TRUN Server则需要帮着搬运流媒体数据, 所以对TRUN Server的网络和处理能力都是有要求的.

### ICE
为了能在复杂的网络情况下也能最大可能保证P2P连接的建立, WebRTC实现了ICE(Interactive Connectivity Establishment)框架. ICE不是一种新的方式, 它综合运用STUN, TURN等方式来找到一个最优连接路径. ICE会首先尝试是否可以直接相连(比如在一个局域网), 然后尝试在初始化RTCPeerConnection时配置的iceServers地址列表, 先使用STUN地址进行连接性检查, 最后使用TURN地址来中转. 

```javascript
var pc_config = {
	"iceServers": [{
		urls: ["stun:stun.1.google.com:19302", "stun:stun.2.google.com:19302"]
	}, {
		urls: "turn:numb.viagenie.ca",
		credential: "password", 
		username: "username"
	}]
};

pc = new RTCPeerConnection(pc_config, pc_constraints);
```

### ice candidate的采集

```javascript
pc.onicecandidate = function (evnt) {
    if (event.candidate) {
        //send it to signal server
    } else {
        console.log('End of candidates.');
    }
}
```

在经过了上面的初始化后WebRTC知道了当前的网络环境, WebRTC就可以为当前上网设备生成candidate, 一个candidate相当于一个可以通信的地址.当得到一个candidate需要把它发送给信号服务器, 然后信号服务器会把它发给会话中其他得端. candidate分为下面三类:

```
a=candidate:1467250027 1 udp 2122260223 192.168.0.196 46243 typ host generation 0
a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0
a=candidate:750991856 2 udp 25108222 237.30.30.30 51472 typ relay raddr 47.61.61.61 rport 54763 generation 0
```

1. host: 代表本地的网络接口, 就是可以在局域网里可以直接连的地址.
2. srflx: 代表这个地址是私有地址经过转换后的公网地址, 也就是可以通过STUN来建立连接的地址. 
3. relay: 就是中转地址, 当必须用TURN服务器来中转时就可以用这个地址来来通信. 

