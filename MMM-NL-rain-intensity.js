
//MMM-NL-rain-intensity.js:

Module.register("MMM-NL-rain-intensity",{
	// Default module config.
	defaults: {
                api: "https://gps.buienradar.nl/getrr.php",
                lat: 52.15,
                lon: 4.49,
                refreshInterval: 75000,
	},

      	// Define required translations.
	getTranslations: function() {
       		return {
            		en: "translations/en.json",
            		nl: "translations/nl.json",
        	};
	},


	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
                this.nodatacount = 0;
		this.sendSocketNotification('CONFIG', this.config);
       	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.getElementById('rainintensity');
                if (!wrapper) {
                    wrapper = document.createElement("div");
                    wrapper.id = "rainintensity";
		    wrapper.className = "xsmall";
                    wrapper.innerHTML = this.translate("STARTING");
                }
		return wrapper;
	},

        getHeader: function() {
	        return this.translate("UMBRELLA");
        },
	/* socketNotificationReceive(notification)
	 * used to get communication from the nodehelper
	 *
	 * argument notification object - status label from nodehelper.
	 * argument payload object - Weather information received via buienradar.nl.
	 */
       	socketNotificationReceived: function(notification, payload) {

                rainintensitytable = document.getElementById('rainintensity');
		// configured succesfully
    		if (notification === "STARTED") {
			Log.info(this.name + ": configured");
			rainintensitytable.innerHTML = this.translate("STARTED");
		} else 
       		// error received from node_helper.js
       		if (notification === "ERROR") {
			Log.error(this.name + ": rain forecast error: " + payload);
			rainintensitytable.innerHTML = this.translate("ERROR");
       		} else
		// data received
       		if (notification === "DATA") {
       			// data received from node_helper.js but empty payload (api calls return empty string sometimes)
			if (!payload || payload ==="") {
                                this.nodatacount++;
				nodata = this.translate("NODATA");
				Log.warn(this.name + ": " + nodata);
			        rainintensitytable.innerHTML = nodata;
			} else
			// data received and payload to parse
			{
                        	this.nodatacount=0;
                                this.totalrain = 0;
                                this.rains = [];
                                this.times = [];

                                var lines = payload.split("\n");
                                var numLines = lines.length-1;
                                //console.log(payload)
                                for (i=0;i<numLines; i++) {
                                    var line = lines[i];
			            var pipeIndex = line.indexOf('|');
			            r = parseInt(line.substring(0, pipeIndex));
			            t = line.substring(pipeIndex+1, line.length);

			            this.totalrain +=  r;
                                    this.rains.push(r /2.55);
                                    this.times.push(t);
                                }

       	 			if (this.totalrain == 0) {
					Log.info(this.name + ": no rain expected");
					noRainText = this.translate("NORAIN") + ' ' 
					   	+ this.times[this.times.length-1] ;
					rainintensitytable.innerHTML = noRainText;
       	 			} else {
					Log.info(this.name + ": rain expected");
                                        rainintensitytable.innerHTML = "";
					rainintensitytable.innerHTML += this.times[0] +"  ";
                                        for (j=0;j<12;j++){
                                            rainintensitytable.innerHTML += "<span style='background-color:hsl(0, 0%," + this.rains[j] + "%);'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                                        }
					rainintensitytable.innerHTML += "  " + this.times[0];
                                        Log.info(rainintensitytable.innerHTML);
				}
			}
       	 	}
                this.updateDom();
    	}

});
