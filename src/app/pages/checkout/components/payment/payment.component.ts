import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  visa:boolean = true;
  paypal: boolean = false;
  paymentForm! : FormGroup
  constructor() { }

  ngOnInit(): void {
    this.fillVisaForm();
  }
  paymentInformation(){
    const paymentInformation = {
      cardNumber: this.paymentForm.controls['cardNumber']?.value,
    }
    localStorage.setItem('payment',JSON.stringify(paymentInformation))
  }
  deletePaymentInformation(){
    localStorage.removeItem('payment');
    localStorage.removeItem('userDeliveryInformation');
  }


  private fillVisaForm(){
    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl('',[Validators.required]),
      cardNumber: new FormControl('',[Validators.required]),
      month: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required]),
      CVV: new FormControl('',[Validators.required])
    })
  }

}
