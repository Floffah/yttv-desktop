let {BrowserWindow, app, session, Menu} = require('electron');

app.on('ready', () => {
    const filter = {
        urls: ["http://*/*", "https://*/*"]
    }

    //if you're looking at the source, as of october 2019 youtube blacklisted some devices access to the youtube tv website but to get around this we just tell youtube that this is running on a tv.
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['User-Agent'] = "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTVAds Safari/538.1";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    })

    let win = new BrowserWindow({
        minWidth: "600",
        minHeight: "400",
        /*webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
        frame: false,*/
        icon: "src/youtube_social_circle_red.png"
    });

    win.setMenu(Menu.buildFromTemplate([
        {
            label: "Window",
            submenu: [
                {
                    role: "togglefullscreen"
                }
            ]
        },
        {
            label: "Info",
            submenu: [
                {
                    label: 'Credits',
                    click() {
                        credits(win);
                    }
                }
            ]
        }
    ]));

    win.loadURL("https://youtube.com/tv");
    /*win.webContents.toggleDevTools();
    win.webContents.on('dom-ready', function(e) {
        //just to make things look and fit better on screen.
        win.webContents.executeJavaScript('let TitleB=require("custom-electron-titlebar"),Menu=require("electron").remote.Menu;let titleb=new TitleB.Titlebar({backgroundColor:TitleB.Color.fromHex("#FF0000"),menu:Menu.buildFromTemplate([{label: "window",submenu: [{role: "togglefullscreen"}]}])})');
    });*/
    win.on('close', () => {
        app.quit();
    });
});

function credits(win) {
    let creditwin = new BrowserWindow({
        height: 600,
        width: 500,
        resizable: false,
        minimizable: false,
        maximizable: false,
        parent: win,
        modal: true,
        icon: "src/youtube_social_circle_red.png"
    });
    creditwin.setMenu(null);
    creditwin.loadFile("./src/credits.html");
}