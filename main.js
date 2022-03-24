const {app,BrowserWindow} = require('electron')

const createwindow = () =>{
    const win  = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })

    win.loadFile("index.html")
}

app.whenReady().then(()=>{
    createwindow()
})