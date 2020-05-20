import { Component, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class HomeComponent implements OnInit {

    private REST_API_SERVER = "http://rdweb.spica.com:5213/";

    private authKey: string = "";
    private username: string = "";
    private password: string = "";

    private tokenSecure: string = "";

    private headers = {};
    private body = JSON.stringify({});

    ngOnInit() { }

    dataChangedUsername(inputText) {
        this.username = inputText;
    }

    dataChangedPassword(inputText) {
        this.password = inputText;
    }

    dataChanged(inputText) {
        this.authKey = inputText;
    }

    constructor(private http: HttpClient) { }

    // POST for TOKEN
    public sendPostRequest() {
        console.log("Send POST request");

        this.body = JSON.stringify(
            {
                "Username": this.username,
                "Password": this.password,
                "Sid": ""
            }
        );

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'SpicaToken ' + this.authKey
        };

        this.http.post(this.REST_API_SERVER + "timeapi/Session/GetSession",
            this.body,
            {
                'headers': this.headers,
                observe: 'response'
            })
            .subscribe(
                data => {
                    console.log("POST Request is successful ", data);
                    this.tokenSecure = JSON.parse(data.body['Token']);
                    console.log(this.tokenSecure);
                },
                error => {
                    console.log("Error", error);
                }
            )
    }
}
