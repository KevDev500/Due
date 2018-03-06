import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CompanySearchService } from './company-search.service';

@Component({
    selector: 'company-search',
    templateUrl: './company-search.component.html'
})
export class CompanySearchComponent {

    @Output('companySelected') selected: EventEmitter<any> = new EventEmitter<any>();
    companySearchForm: FormGroup;
    companies: any[] = [];

    constructor(
        private fb: FormBuilder,
        private companySearchService: CompanySearchService) {
        this.createCompanySearchForm();
    }

    ngOnInit() {
        this.companySearchService.companies$.subscribe(result => {
            if (result.length === 1) {
                this.companySelected(result[0]);
            }
            this.companies = result;

        })
    }

    search() {
        const formModel = this.companySearchForm.value;
        const companyName = formModel.name as string;
        this.companySearchService.findCompanyByName(companyName);
    }

    companySelected(company: any) {
        this.selected.emit(company);
        this.resetForm();
        this.companySearchService.updateCompanies();
    }

    private createCompanySearchForm() {
        this.companySearchForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    private resetForm() {
        this.companySearchForm.reset();
    }
}
