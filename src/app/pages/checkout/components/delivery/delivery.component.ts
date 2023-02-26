import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {takeUntil} from "rxjs";
import {Unsub} from "../../../unsub";

import {readFile} from "fs";
import {Config} from "@angular/fire/compat/analytics";
import {CheckoutService} from "../../../../services/checkout.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent extends Unsub implements OnInit {

  deliveryForm!: FormGroup;
  citiesArray: Array<any> = [];

  constructor(
    private http: HttpClient,
    private checkoutService: CheckoutService
    ) {
    super();
  }

  ngOnInit(): void {
    this.getCities();
    this.getDeliveryForm();
    console.log(this.citiesArray);

  }
  userDeliveryInformation(){
    const body = {
      name: this.deliveryForm.controls['name']?.value,
      lastname: this.deliveryForm.controls['lastname']?.value,
      phone: this.deliveryForm.controls['phone']?.value,
      country: this.deliveryForm.controls['country']?.value,
      city: this.deliveryForm.controls['city']?.value,
      address: this.deliveryForm.controls['address']?.value,
      zipcode: this.deliveryForm.controls['zipcode']?.value,
    }
    localStorage.setItem('userDeliveryInformation', JSON.stringify(body))
  }
  deleteUserDeliveryInformation() {
    localStorage.removeItem('userDeliveryInformation');
    localStorage.removeItem('cart');
  }

  private getCities() {
    this.http.get<Config>('assets/cities/json/provinces.json')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(provinces => {
        let A = Object.values(provinces)
        this.citiesArray = A.map(p => p.name);
        console.log(this.citiesArray);
        A.map(p => {
          return p.name;
        })
      });

  }

  private getDeliveryForm() {
    this.deliveryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
    })
  }


}
