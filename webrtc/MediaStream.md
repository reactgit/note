# MediaStream
## prop
active, ended, id
## event
onaddtrack, onened, onremovetrack


## MediaStream.addTrack
## MediaStream.clone
## MediaStream.getTracks
## MediaStream.getAudioTracks
## MediaStream.getTrackById
## MediaStream.getVideoTracks
## MediaStream.removeTrack



## srcObject
Holds the MediaStream that provides media for this element. This attribute overrides both the src attribute and any <source> elements. If the value of srcObject is replaced or set to null the User Agent must re-run the media element load algorithm

## URL.createObjectURL()
The URL.createObjectURL() static method creates a DOMString containing an URL representing the object given in parameter. The URL lifetime is tied to the document in the window on which it was created. The new object URL represents the specified File object or Blob object.
在每次调用createObjectURL()方 法的时候,都会创建一个新的对象URL,即使参数中的这个对象已经有了自己的对象URL.在你不需要这些对象URL的时候,你应该通过调用 window.URL.revokeObjectURL()方法来释放它们所占用的内容.虽然即使你不主动释放它们,浏览 器也会在当前文档被卸载的时候替你释放,不过,考虑到更好的性能和更少的内存占用,你应该在安全的时候主动施放它们



    

