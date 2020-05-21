import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../shared/models/employee.model';

@Component({
  selector: 'app-user',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    private REST_API_SERVER = "http://rdweb.spica.com:5213/";

    private headers = {};

    public searchFirstName: string = "";
    public searchLastName: string= "";

    public listOfEmployee: Employee[];

    dataChangedFirstName(inputText) {
        this.searchFirstName = inputText;
    }

    dataChangedLastName(inputText) {
        this.searchLastName = inputText;
    }

    constructor(private http: HttpClient) { }

    ngOnInit() {
        console.log("Send GET request for all employee");

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'SpicaToken ' + localStorage.getItem('AuthKey') + ":" + localStorage.getItem('Token')
        };

        this.http.get<Employee[]>(this.REST_API_SERVER + "timeapi/employee",
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

    // GET for SEARCH
    public sendSearchRequest() {
        console.log("Send GET request for SEARCH");

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'SpicaToken ' + localStorage.getItem('AuthKey') + ":" + localStorage.getItem('Token')
        };

        this.http.get<Employee[]>(this.REST_API_SERVER + "timeapi/employee?FirstName=" + this.searchFirstName + "&" + "LastName=" + this.searchLastName ,
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
