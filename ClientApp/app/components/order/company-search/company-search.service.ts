import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CompanySearchService {

    private _companies: any[] = [];
    private _observableCompanies: BehaviorSubject<any[]> = new BehaviorSubject([]);

    get companies$(): Observable<any[]> { return this._observableCompanies.asObservable() };

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {    }

    findCompanyByName(name: string) {
        this.http.get(this.baseUrl + 'api/CompanySearch/FindByName', { params: { name } }).subscribe(result => {
            this.updateCompanies(result.json());
        }, error => console.error(error));
    }

    updateCompanies(companies: any[] = []) {
        this._companies = companies;
        this._observableCompanies.next(this._companies);
    }
}