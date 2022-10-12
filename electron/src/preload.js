const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    loadUrl: (url) => ipcRenderer.send('load-url', url),
    doClose: ()=> ipcRenderer.send('close-message'),
    keepOpen: ()=> ipcRenderer.send('active-message'),
    resize: (params)=> ipcRenderer.send('resize-message', params)
})