import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OrderService {

    private _orders: any[] = [];
    private _observableOrders: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private _observableOrderComplete: BehaviorSubject<any> = new BehaviorSubject({});

    get orders$(): Observable<any[]> { return this._observableOrders.asObservable() }
    get ordersCompleted$(): Observable<any[]> { return this._observableOrderComplete.asObservable() }

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    placeOrder(company: any, quantity: number) {
        const order = {
            company,
            quantity
        };
        this.http.post(this.baseUrl + 'api/Orders', { params: { order } }).subscribe(result => {
            this.updateOrders(order);
        }, error => console.error(error));
    }

    private updateOrders(order: any) {
        this._orders.push(order);
        this._observableOrders.next(this._orders);
        this._observableOrderComplete.next({});
    }
}