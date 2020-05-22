import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
    templateUrl: '../../employee/create/create.component.html',
    styleUrls: ['../../employee/create/create.component.css']
})

export class NewEmployeeComponent implements OnInit {
    private REST_API_SERVER = "http://rdweb.spica.com:5213/";

    private headers = {};
    private body = {};

    public FirstName: string = "";
    public LastName: string = "";
    public Address: string = "";
    public Email: string = "";
    public Phone: string = "";
    public MobilePhone: string = "";


    dataChangedFirstName(inputText) {
        this.FirstName = inputText;
    }

    dataChangedLastName(inputText) {
        this.LastName = inputText;
    }

    dataChangedAddress(inputText) {
        this.Address = inputText;
    }

    dataChangedEmail(inputText) {
        this.Email = inputText;
    }

    dataChangedPhone(inputText) {
        this.Phone = inputText;
    }

    dataChangedMobilePhone(inputText) {
        this.MobilePhone = inputText;
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {

    }

    // GET for SEARCH
    public createNew() {
        console.log("Send POST request for CREATE new user");

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'SpicaToken ' + localStorage.getItem('AuthKey') + ":" + localStorage.getItem('Token')
        };

        this.body = {
            "Id": null,
            "LastName": this.LastName,
            "FirstName": this.FirstName,
            "MiddleName": null,
            "City": null,
            "Phone": this.Phone,
            "Address": this.Address,
            "State": null,
            "Fax": null,
            "ReferenceId": null,
            "Birth": null,
            "WorkingSchemeType": null,
            "Occupation": null,
            "Unit3": null,
            "Unit2": null,
            "Unit1": null,
            "Email": this.Email,
            "Other": null,
            "MobilePhone": this.MobilePhone,
            "OrganizationalUnitId": 10000000,
            "AdditionalField1": null,
            "AdditionalField2": null,
            "AdditionalField3": null,
            "AdditionalField4": null,
            "AdditionalField5": null,
            "AdditionalField6": null,
            "AdditionalField7": null,
            "AdditionalField8": null,
            "AdditionalField9": null,
            "AdditionalField10": null,
            "Active": true,
            "CurrentWorkingSchemeId": null
        }

        console.log(this.body);

        this.http.put<any>(this.REST_API_SERVER + "timeapi/employee",
            JSON.stringify(this.body),
            {
                'headers': this.headers
            })
            .subscribe(
                response => {
                    console.log("PUT Request is successful", response);
                    this.router.navigate(['../employee']);
                },
                error => {
                    console.log("Error", error);
                }
            )
    }

}
