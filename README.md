# MMM-NL-rain-intensity

Magic Mirror Module for showing Rain Intensity in the next hour in the Netherlands

![screenshot rain](https://github.com/thekampany/MMM-NL-rain-intensity/blob/master/screenshot-MMM-NL-rain-intensity-1.png)
![screenshot norain](https://github.com/thekampany/MMM-NL-rain-intensity/blob/master/screenshot-MMM-NL-rain-intensity-2.png)

## Installation
Navigate into your MagicMirror's modules folder and execute 'git clone https://github.com/thekampany/MMM-NL-rain-intensity'

## Using the module
This module can show if you need an umbrella in the next hour. It uses your longitude and latitude in a buienradar url.

## Config options
<table>
<tr><td>option</td><td>description</td></tr>
<tr><td>lat</td><td>latitude</td></tr>
<tr><td>lon</td><td>longitude</td></tr>
</table>

## Example configuration to put in config.js
    {
		module: "MMM-NL-rain-intensity",
		position: "top_right",
		config: {
			lat: "52.15",
			lon: "4.50", 
	  	}
  	},

