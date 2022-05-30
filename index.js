// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @match        https://pixelplace.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixelplace.io
// @grant none
// ==/UserScript==
Object.defineProperty(window.console, 'log', {configurable:false,enumerable:true,writable:false,value:console.log});

class Lamnidae {
    constructor() {
        waitLoad().then(async arr => {
            var elem = arr[0]
            var div = arr[1]

            var tag = document.createElement("a");
            tag.href = '#'
            var text = document.createTextNode("Lamnidae");
            tag.appendChild(text);
            elem.appendChild(tag)

            this.tag = tag
            this.elem = elem
            this.div = div
            this.chatInput = document.getElementById('chat').getElementsByTagName('input')[0]

            elem.addEventListener('click', ev => {
                if (ev.target.innerText != tag.innerText) this.unloadTab()
                else this.loadTab()
            })

            this.setup()
        })
        this.ws = connect()
    }

    loadTab() {
        this.tag.classList.add('selected')
        this.div.style = 'display: block'
        this.chatInput.disabled = true

        // add data stuffs
    }

    unloadTab() {
        this.tag.classList.remove('selected')
        this.div.style = 'display: none'
        this.chatInput.disabled = false
    }

    setup() {
        const css = 'background: gray; border: 1px solid white; margin-right: 5px;'
        var div = document.createElement('div')
        var inputx = document.createElement('input')
        div.appendChild(inputx)
        var inputy = document.createElement('input')
        div.appendChild(inputy)

        inputx.type = 'text'
        inputx.placeholder = 'x'
        inputx.style = 'background: gray; border: 1px solid white; margin-right: 10px;'

        inputy.type = 'text'
        inputy.placeholder = 'y'
        inputy.style = 'background: gray; border: 1px solid white;'

        this.div.appendChild(div)


        inputx.addEventListener("input", function(event){
            event.preventDefault()
        });

        inputy.addEventListener("input", function(event){
            event.preventDefault()
        });

        div = document.createElement('div')

        var start = document.createElement('input')
        div.appendChild(start)
        var stop = document.createElement('input')
        div.appendChild(stop)

        start.innerText = 'start'
        start.type = 'button'

        stop.innerText = 'stop'
        stop.type = 'button'

        this.div.appendChild(div)
    }
}

const lamnidae = new Lamnidae()

function waitLoad() {
    return new Promise((resolve, reject) => {
        var id = setInterval(() => {
            var elem = document.getElementById('chat')

            if (elem != undefined) {
                var div = document.createElement('div')
                div.classList.add('messages'); div.style = 'display: none;'
                elem.appendChild(div)

                elem = elem.getElementsByClassName('tabs no-select')[0]
                clearInterval(id) }
                resolve([elem, div]);
        }, 100)
    })
}

function connect() {
    const ws = new WebSocket('ws://localhost:8080', ['json', 'xml']);
    ws.onclose = function(event) {
        console.log(event)
    }
    ws.addEventListener('open', () => {
        const json = "pause sussy baka amogusugvausigaas";
        ws.send(json);
    });
    ws.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(data);
    });
    return ws
}
