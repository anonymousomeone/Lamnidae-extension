// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @match        https://pixelplace.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixelplace.io
// @grant        none
// ==/UserScript==
Object.defineProperty(window.console, 'log', {configurable:false,enumerable:true,writable:false,value:console.log});
Object.defineProperty(window, 'WebSocket', {configurable:false,enumerable:true,writable:false,value:WebSocket});
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
        })
        connect()
    }

    loadTab() {
        this.tag.classList.add('selected')
        this.div.style = 'display: block'
        this.chatInput.disabled = true

        // add data stuffs
        console.log('Clicked')
    }

    unloadTab() {
        this.tag.classList.remove('selected')
        this.div.style = 'display: none'
        this.chatInput.disabled = false
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
        const data = { message: 'Hello from the client!' }
        const json = JSON.stringify(data);
        ws.send(json);
    });
    ws.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(data);
    });
}
