import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

declare var require: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

    constructor(private _http: Http) { }

    ngOnInit() {


        const blockCypher = require('blockcypher');
        const WebSocket = require('websocket').w3cwebsocket;

        const ethApi = new blockCypher('eth', 'main', 'cce584fb11234db981082469dbe8670e');


        this.generateAddress().then(function(data){
            console.log(JSON.parse(data._body));
        }).catch(function(err){
            console.log(err);
        });




         
        const ws = new WebSocket('wss://socket.blockcypher.com/v1/btc/main');
         
         
        ws.onopen = function() {
            console.log('WebSocket Client Connected');
             ws.send(JSON.stringify({event: "unconfirmed-tx"})); //listening to unconfirmed transaction events
        };
         
        ws.onmessage = function(e) {
            console.log('sss');
            var tx = JSON.parse(e.data);
            console.log(tx);
        };

        ws.onerror = function() {
            console.log('Connection Error');
        };
        
        ws.onclose = function() {
            console.log('Client Closed');
        };
          


    }



    generateAddress(): Promise<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(
            'https://api.blockcypher.com/v1/eth/main/addrs',
            'cce584fb11234db981082469dbe8670e',
            options)
            .toPromise();
    }
}
