import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrderService } from './order.service';

@Component({
    selector: 'order',
    templateUrl: './order.component.html'
})

export class OrderComponent {

    orderForm: FormGroup;
    orders$: Observable<any[]>;
    selectedCompany: any = null;
    quantityOptions: any[] = Array.from({ length: 10 }, (v, k) => k + 1);

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService) {
        this.createOrderForm();
    }

    ngOnInit() {
        this.orders$ = this.orderService.orders$;

        this.orderService.ordersCompleted$
            .subscribe(result => {
                this.selectedCompany = null;
                this.resetOrderForm();
            },
            error => console.log(`Error subscribing to completed order observable: ${error}`));
    }

    companySelected(company: any) {
        this.selectedCompany = company;
        this.orderForm.controls['company'].patchValue(company);
    }

    placeOrder() {
        const formModel = this.orderForm.value;
        this.orderService.placeOrder(formModel.company, formModel.quantity);
    }

    cancelOrder() {
        this.selectedCompany = null;
        this.resetOrderForm();
    }

    private createOrderForm() {
        this.orderForm = this.fb.group({
            quantity: ["", [Validators.required]],
            company: [null, Validators.required]
        });

        this.orderForm.controls['quantity'].setValue("");
    }

    private resetOrderForm() {
        this.orderForm.reset();
    }
}