import { Component, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostData } from '../shared/models/postdata.model'
import { Router } from '@angular/router';


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

    private headers = {};
    private body = JSON.stringify({});
    public data: PostData;

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

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

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

        this.http.post<PostData>(this.REST_API_SERVER + "timeapi/Session/GetSession",
            this.body,
            {
                'headers': this.headers,
                observe: 'response'
            })
            .subscribe(
                response => {
                    console.log("POST Request is successful ", response);
                    // Save token and  auth key to local storage
                    localStorage.setItem('Token', response.body.Token);
                    localStorage.setItem('AuthKey', this.authKey);
                    this.router.navigate(['../employee']);
                },
                error => {
                    console.log("Error", error);
                }
            )
    }
}
