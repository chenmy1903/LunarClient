import os
import sys
import time
import frida
import psutil

WRITE_LOG = False # 是否启用log(log没啥毛用,还会占磁盘空间,除非调试,否则保持关闭)

try:
    session = frida.attach("javaw.exe")
except frida.ProcessNotFoundError:
    print("未找到javaw.exe, 启动游戏后在开启中文修复")
    sys.exit()
script = session.create_script("""
function readMessage(p){
    var hwnd = p.readPointer()
    var message = p.add(Process.pointerSize).readUInt()
    var wParam = p.add(Process.pointerSize+8).readU64()
    var lParam = p.add(Process.pointerSize+8+8).readU64()
    return {
        "hwnd": hwnd,
        "message": message,
        "wParam": wParam,
        "lParam": lParam
    }
}

var msgPointer
var messages = []
Interceptor.attach(Module.getExportByName('user32.dll', 'PeekMessageW'), {
    onEnter(args) {
        msgPointer = args[0];
    },
    onLeave(retval) {
        
        if(retval == 0x0){
            if(messages.length > 0){
                var msg = messages.shift()
                msgPointer.writePointer(msg.hwnd)
                msgPointer.add(Process.pointerSize).writeUInt(msg.message)
                msgPointer.add(Process.pointerSize+8).writeU64(msg.wParam)
                msgPointer.add(Process.pointerSize+8+8).writeU64(msg.lParam)
                console.log("--> SEND", JSON.stringify(readMessage(msgPointer)))
                retval.replace(0x1)
            }
            return
        }
        
        var msg = readMessage(msgPointer)
        
        // CHAR
        if(msg.message == 258){
            var char = msg.wParam & 65535
            console.log("char", JSON.stringify(msg), String.fromCharCode(char))
            if(char > 255){
                retval.replace(0x0)
                
                // keydown VK_PACKET
                messages.push({
                    "hwnd": msg.hwnd,
                    "message": 0x0100,
                    "wParam": 0xE7,
                    "lParam": 0x1
                })
                // CHAR
                messages.push({
                    "hwnd": msg.hwnd,
                    "message": 0x0102,
                    "wParam": char,
                    "lParam": 0x1
                })
                // keyup VK_PACKET
                messages.push({
                    "hwnd": msg.hwnd,
                    "message": 0x0101,
                    "wParam": 0xE7,
                    "lParam": 0xC0000001
                })
            }
        }
        
        // KEYDOWN
        if(msg.message == 256){
            var keycode = msg.wParam
            var pervious_state = (msg.lParam >>> 30) & 0x1
            var state = 1 - ((msg.lParam >>> 31) & 0x1)
            console.log("keydown", JSON.stringify(msg), String.fromCharCode(keycode))
        }
    }
})
""")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
log = os.path.join(BASE_DIR, "inputfixlog.log")
logf = open(log, "a")
def on_message(message, data):
    """写入日志"""
    if WRITE_LOG:
        print(message, file=logf)
script.on('message', on_message)
script.load() # 注入中文输入
print("中文修复开启成功")
print("不要关闭本窗口,关闭后中文修复会失效")
print("关闭游戏后中文修复会自动关闭")
print("log文件: {}".format(log)) if WRITE_LOG else print("log已被禁用,修改WRITE_LOG变量以开启(调试才用开)")
while True:
    time.sleep(20) # 游戏太卡修改此值(增大)
    try:
        pl = psutil.pids()
        for p in pl:
            pc = psutil.Process(p)
            if pc.exe().endswith("javaw.exe"):
                break
        else:
            sys.exit()
    except:
        pass
