# codec
## noun
SBR: Spectral Band Replication(频段复制), 在低码流下提供全带宽的编码而不会产生产生多余的信号
AAC: [Advanced Audio Coding](https://www.zhihu.com/question/20629995) 
LC-AAC:  Low-Complexity AAC, 算法时延高，不利于实时的音频通讯, 运算复杂度低，对内存占用小,兼容性好，使用广
HE-AAC: high efficiency AAC, 混合了AAC与SBR技术
## Opus

### key
RFC 6716
A codec is what translates sounds into digital data and carries it across the network to make voice over IP work
 adapt to available bandwidth for highest possible quality audio with low delay
 Opus gives us the opportunity to communicate over the Internet in real-time with superior quality, regardless of the type of network link our customers are using
有损声音编码
拥有比AAC、OGG等其它有损格式更大的压缩率,适用于网络上的实时声音传输
开放格式，使用上没有任何专利或限制
高保真,体积会稍微大一些
融合了Skype的SILK和XVID的CELT 技术
Opus的码率支持6 kbps到510 kbps，采样率支持8 kHz到48 kHz, 最大支持255声道

Sampling rates from 8 to 48 kHz
Bit-rates from 6 kb/s 510 kb/s (*)
Support for both constant bit-rate (CBR) and variable bit-rate (VBR)
Audio bandwidth from narrowband to full-band (*)
Support for speech and music (*)
Support for mono and stereo (*)
Frame sizes from 2.5 ms to 60 ms (*)
Good loss robustness and packet loss concealment (PLC)
Floating point and fixed-point implementation

[webrtc-how-to-tell-opus-codec-to-use-super-wide-band-full-band](http://stackoverflow.com/questions/32473078/webrtc-how-to-tell-opus-codec-to-use-super-wide-band-full-band)

## iSAC    



# VP8 VP9 H.264
[h264-webrtc](https://bloggeek.me/h264-webrtc/)
