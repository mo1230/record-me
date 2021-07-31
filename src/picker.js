// const ipcMain = window.require("video.js");
const domify = window.require("domify")
// import domify from "domify"
const {desktopCapturer, ipcRenderer} = require("electron")


function capture() {
    console.log("picker")
    // ipcRenderer.on("get-sources", (event, options)=>{
        console.log("picker-cap")
        desktopCapturer.getSources({ types: ["window","screen"] }).then(
            async (sources)=>{

                console.log(sources.length)
                console.log(sources)
                // if (typeof sources)
                let sourcelist = document.querySelector('#capturer-list')
                for (const source of sources.reverse()) {
                    if (source.name) {
                        console.log(source.thumbnail.toDataURL());
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia({
                                audio: false,
                                video: {
                                    mandatory: {
                                        chromeMediaSource: 'desktop',
                                        chromeMediaSourceId: source.id,
                                        minWidth: 1280,
                                        maxWidth: 1280,
                                        minHeight: 720,
                                        maxHeight: 720
                                    }
                                }
                            })

                            // this.handleStream(stream)
                            console.log(source.name)
                            let thumb = source.thumbnail.toDataURL()
                            if (!thumb) continue
                            let title = source.name.slice(0,20)
                            let item = `<li><a href="#"><img src="${thumb}" alt="" /><span>${title}</span></a></li>`
                            sourcelist.appendChild(domify(item))
                            console.log("domify:  ",domify(item))
                            console.log("domify")
                        } catch (e) {
                            // this.handleError(e)
                        }

                    }
                    // return
                }


                let links = sourcelist.querySelectorAll('a')
                for (let i = 0; i < links.length; ++i) {
                    let closure = (i) => {
                        return (e) => {
                            e.preventDefault()
                            ipcRenderer.send('source-id-selected', sources[i].id)
                            sourcelist.innerHTML = ''
                            // this.handleStream(this.stream)
                        }
                    }
                    links[i].onclick = closure(i)
                }
            }
        )
    // })
}
capture()
