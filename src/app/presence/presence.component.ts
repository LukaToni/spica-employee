import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee.model';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tables',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

    private REST_API_SERVER = "http://rdweb.spica.com:5213/";

    private headers = {};
    public listOfEmployee: Employee[];

    private TimeStamp: string = "";
    public OrgUnitId: number = 10000083;

    dataChangedOrgUnitId(inputText) {
        this.OrgUnitId = inputText;
    }

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getPresentEmployee();
    }

    // GET for SEARCH
    public getPresentEmployee() {
        console.log("Send GET request for PRESENT EMPLOYEE");

        // get current date/time
        this.TimeStamp = new Date().toISOString();

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'SpicaToken ' + localStorage.getItem('AuthKey') + ":" + localStorage.getItem('Token')
        };

        this.http.get<Employee[]>(this.REST_API_SERVER + "timeapi/presence?TimeStamp=" + this.TimeStamp + "&orgUnitId=" + this.OrgUnitId + "&showInactiveEmployees=false",
            {
                'headers': this.headers
            })
            .subscribe(
                response => {
                    console.log("GET Request is successful ", response);
                    this.listOfEmployee = response;
                },
                error => {
                    console.log("Error", error);
                }
            )
    }


}
