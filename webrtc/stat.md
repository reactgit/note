# RTCAudioPlayoutStats

RTCAudioPlayoutStats is a WebRTC API that provides statistics related to audio playout. It includes details such as the total number of audio packets received, the number of packets discarded due to jitter buffer delays, the total number of bytes received, the total number of samples played out, and more. This API can be used by developers to monitor and optimize the performance of their WebRTC audio streaming applications.


## playout path
it is the path that the received media takes from the network to the speaker or display on the receiver's end.
The playout path in WebRTC involves several stages, including decoding, buffering, rendering, and playback. When the media is received at the receiver's end, it is first decoded and then buffered to ensure a smooth playback experience. Once the media is buffered, it is rendered and played back on the receiver's device.



## media-playout(kind-audio, id-AP)
synthesizedSamplesDuration: 合成采样时长, 合成声音采样指的是通过算法生成的音频数据, 而不是从传入的音频源获取的。当采样跟不上播放的时候就会用合成的数据
totalSamplesDuration: 被播出的采样时长(包括合成的和非合成的)
synthesizedSamplesEvents: 合成采样的次数
totalPlayoutDelay: 总的播出延迟, 可以配合 totalSamplesCount 算每帧的播出延迟
totalSamplesCount: 播放过的采样量

## candidate
ICE 会每15秒 进行连接检查

### type
host / srflx / prflx / relay
### protocol
udp / tcp
### tcpType 
active: 本身并不预先绑定端口，也无法接受其他传入TCP连接, 将主动发起出口连接 端口必须设置为9
passive: 会预先做端口绑定 
so
如果 protocol 为udp 则为 null
https://zhuanlan.zhihu.com/p/514666535

### component
rtp / rtcp
### foundation
candidate 的uid(相同类型的共用一个), 生成格式: transport_type|candidate_type|priority|IP_address|port
### address
### port
端口 9 本来表示的是丢弃服务, 也就是发送到服务器上这个端口的数据都会被discard. 在ICE中端口9表示 没有这样的端口
https://stackoverflow.com/questions/56429009/why-a-tcp-webrtc-candidate-with-port-9-exists-but-the-browser-is-not-listening-o

### usernameFragment
里面包含一个随机生成的用户名和密码
### sdpMLineIndex
SDP中m行的索引
### sdpMid
SDP中a=mid:0 中的 0
### relatedAddress relatedPort




# stats
```
pc.getStats().then((reports) => {
	reports.forEach((report) => {
		report.type: 'candidate-pair', 'codec', 'certificate', 'csrc', 'data-channel', 'inbound-rtp', 'outbound-rtp', 'peer-connection', 'receiver', 'remote-candidate', 'remote-inbound-rtp', 'remote-outbound-rtp', 'sender', 'transport'
	})
})
```


## RTCInboundRtpStreamStats
averageRtcpInterval
bytesReceived




https://medium.com/@wanxiao1994/%E4%B8%80%E6%AC%A1webrtc%E8%AF%AD%E9%9F%B3%E9%80%9A%E8%AF%9D%E6%97%A0%E6%B3%95%E8%BF%9E%E9%80%9A%E9%97%AE%E9%A2%98%E8%B0%83%E6%9F%A5-73e2a024f075

https://www.google.com/search?q=webrtc+%E6%8E%92%E6%9F%A5&biw=1440&bih=764&ei=7mJPZLSJNP7FkPIPts2yiAI&ved=0ahUKEwi0uOS6xdP-AhX-IkQIHbamDCE4KBDh1QMIDw&uact=5&oq=webrtc+%E6%8E%92%E6%9F%A5&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAE6CggAEEcQ1gQQsAM6CAgAEIoFEJECOgcIABCKBRBDOgUIABCABDoKCAAQFhAeEA8QCjoGCAAQFhAeOggIABCKBRCGAzoGCAAQHhANOggIABAIEB4QDUoECEEYAFC-A1jqVWDhWGgJcAF4AIABrwKIAfMNkgEFMi02LjGYAQCgAQHIAQrAAQE&sclient=gws-wiz-serp




