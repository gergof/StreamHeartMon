# StreamHeartMon
-----
[![badge](https://ci.systemtest.tk/badge/2)](https://ci.systemtest.tk/repo/2)

Monitor and display your heart rate in real time under your streams.

With this little piece of software you can show your heart rate to your viewers in softwares like OBS. While it is only tested with Xiaomi Mi Bands, it should work with any heart rate meter that has an API/integration that can do HTTP Post requests.



## Download
See [releases](https://github.com/gergof/StreamHeartMon/releases) or the [bucket](http://s.go.ro/fsx4sqno) with the builds.



## Usage
- On your computer
    - Get the StreamHeartMon software
        - Download the latest from [releases](https://github.com/gergof/StreamHeartMon/releases)
        - Or build it:
            - Install [nodejs](https://nodejs.org/)
            - Clone this repo `https://github.com/gergof/StreamHeartMon.git`
            - Run `npm install`
            - Start the server with `npm start` or build it with `npm run build`
    - Start the StreamHeartMon software. Here you should see the address on which you can access it
- On your phone
    - If you have a Xiaomi Mi Band
        - Make sure you have the [Tools and Mi Band](https://play.google.com/store/apps/details?id=cz.zdenekhorak.mibandtools) app
        - Install [Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)
        - Open Automate and download the __StreamHeartMon mi band__ flow
        - Grant internet access for the flow
        - Start the flow. You will be prompted for the server's UI which is displayed in the desktop software (_example: 192.168.0.100:3000_)
    - If you have something else
        - Find a way to get your heart rate and post it to a HTTP server. See the details below.
- From OBS
    - Add a new source of type __Browser__
    - Set the URL to the one showed in the desktop software
    - Set the width to 250 and the height to 100

Now you should see a nice ECG graph in your stream.



## Styling the badge
_We are assuming that the server's address is 192.168.1.100:3000._

- You can access the default badge at 192.168.1.100:3000
- Predefined styles:
    - _192.168.1.100:3000/blue_
    - _192.168.1.100:3000/red_
    - _192.168.1.100:3000/white_
- You can set custom colors on _192.168.1.100:3000/custom_
    - You have to set additional query parameters:
        - _fg_: the foreground color. Can be: css color alias, hex code, rgb code
        - _bg_: the background color. Can be: css color alias, hex code, rgb code
    - Examples:
        - 192.168.1.100:3000/custom?fg=red&bg=yellow
        - 192.168.1.100:3000/custom?fg=%23fff&bg=%23b1a9aa (_Note_: __%23__ is the escaped version of __#__)
        - 192.168.1.100:3000/custom?fg=rgb(192,0,30)&bg=rgb(100,255,255)
- You can hide the text with the _bpm_ query parameter
    - Example:
        - 192.168.1.100:3000?bpm=false



## How it works
- _Tools and Mi Band_ exposes the heart rate sensor API of the Mi Band
- _Automate_ requests the current heart rate from _Tools and Mi Band_ and then it waits for the response
- Given the response it logs it and does a HTTP Post request to the server
- The server saves the new heart rate and then it broadcasts the new value to all the collected clients
- The clients update their rendering with the new values



## API
- To update the current HR do a POST request to / with a JSON body having {"hr": "n"} where n is the new heart rate
- The websocket is available at /ws. It broadcasts a message of type JSON having {"time": "t", "hr": "h"} where t is the time it was sent out and h is the current heart rate
- To access the current heart rate do a GET request to /bpm



## Screenshots
![badge](https://systemtest.tk/uploads/df2d51e22c61f92c457b077e3bce2c21)
![console](https://systemtest.tk/uploads/ac1cf0fa8bbbd6e930a99a46279b672f)
![obs](https://systemtest.tk/uploads/2b31a495d567345c1958050bdec749fc)
![obs_settings](https://systemtest.tk/uploads/884ff6d7356f7ec3d4665272ab9a26dc)