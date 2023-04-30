# DataChannel
RTCDataChannel
data encrypted
## SCTP
SCTP is a transport protocol (like TCP and UDP) and it can work directly over IP protocol
DataChannel uses SCTP (Stream Control Transmission Protocol) which runs over established DTLS tunnel over UDP
SCTP (for congestion, flow control,…), ICE (for NATing), DTLS (for security)
Multiple independent SCTP streams (incoming and outgoing) with the same application dependent identifier are carried in a single SCTP association. Each SCTP stream has a unique identifier.
 
[sctp-data-channel](https://bloggeek.me/sctp-data-channel/)
[quic-webrtc](https://bloggeek.me/quic-webrtc/)

## read
[WebRTC data channels](https://www.html5rocks.com/en/tutorials/webrtc/datachannels/)