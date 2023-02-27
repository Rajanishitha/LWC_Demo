import { LightningElement,track } from 'lwc';

export default class MyLocationWeather extends LightningElement {


    APIKey = '822c434a96165bb3e925f8270c9a8d9a';
    @track tempj=0;
    @track hum=0;
    @track cloud;
    @track description;
    city;
    @track lat;
    @track long;
    connectedCallback()
     {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;
              this.long = longitude;
              this.lat = latitude;
              console.log(this.lat);
              const calloutURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat +'&lon='+ this.long + '&units=metric&appid=' + this.APIKey;
              fetch(calloutURL,{
                 method: "GET",
                 headers: {
                Accept: "application/json"
                        }
                 })
        .       then((response) => {
                    if (response.ok){
                    return response.json();
                   }
                })
                .then((responseJSON) => {
                 this.tempj = responseJSON.main.temp;
                 this.hum = responseJSON.main.humidity;
                 this.description = weatherData.description;
                 console.log(this.cloud);
                 console.log(responseJSON.coord.lon);
                 console.log(this.tempj);
                })
     
     });
    
}
}
}