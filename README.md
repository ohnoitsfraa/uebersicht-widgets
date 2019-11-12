# Übersicht widgets

My collection of übersicht widgets.

## Why?

Once in a while you just stumble upon a great piece of software that improves your workflow or is just a lot of fun to play with.
[Übersicht](http://tracesof.net/uebersicht) is defnitely once of those and that's why I made some simple widgets to get started.
Here's a preview of how it looks:

![Übersicht preview](https://i.imgur.com/uioHWBf.jpg)

## Installation

* Clone this repository
* run **npm install** inside the repository
* Create a config.json file in src/config, this is needed for all the widgets to work correctly (see below).
* run **npm run compile** to build the SASS for the widgets and copy the needed files to the dist folder.
* run **npm run watch** if you want to have a live compile while editing the source files.
* Point your Übersicht widget folder to the dist folder inside of the repository

![Übersicht preferences](https://i.imgur.com/QtpNYWG.png)

## Config

### Unsplash

The Unsplash widget uses the Unsplash Rest API, you will need to create an app with your own account and fill out the accessKey property in the config.
You will also need a collection id, you can find this in the URL when you open up a public collection on the [Unsplash](https://unsplash.com/developers) website. This is an example of a collection id: [894](https://unsplash.com/collections/894/earth-planets)

### Open Weather Map
The weather widget uses Open Weather Map, for this service you will need an API key. You can create it by going to the [OpenWeatherMap](https://openweathermap.org/api) website.

### Other

The other properties in the config speak for themselves.

### Config example
```
{
  "cpus": {
    "max": 4,
    "refresh": 5000
  },
  "memory": {
    "refresh": 3000
  },
  "date": {
    "refresh": 60000
  },
  "time": {
    "refresh": 1000,
    "words": false
  },
  "weather": {
    "appId": "",
    "defaultLocation": {
      "city": "Brussels",
      "country": "Belgium"
    },
    "unit": "C",
    "refresh": 7200000
  },
  "unsplash": {
    "accessKey": "",
    "collectionId": "",
    "refresh": 3600000,
    "perPage": 50
  },
  "whoami": {
    "url": "https://www.google.com",
    "logo": "https://placeholder.pics/svg/300",
    "refresh": 60000
  }
}
```

## ChunkWM

If you use a window manager like [chunkwm](https://koekeishiya.github.io/chunkwm), you can make it play nice with Übersicht. It has a configuration setting that is meant for custom bars inside of .chunkwmrc. These are the settings I use for it so it leaves space at the bottom of the screen for the bar and the windows of your applications.

### My chunkwm config

```
chunkc set custom_bar_enabled            1
chunkc set custom_bar_all_monitors       1
chunkc set custom_bar_offset_top         0
chunkc set custom_bar_offset_bottom      40
chunkc set custom_bar_offset_left        0
chunkc set custom_bar_offset_right       0 
```

You can ofcourse change the config above so the space shows on top instead of on the bottom, but you will also need to alter the scss source files to change the position of the widgets themselves. By default they show on the bottom, but if you change the justify-content property in _body.scss to flex-start, they will show on top.

### body.scss

```
body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
```