import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private crudService: CrudService) {}
  @ViewChild('f', { static: false }) form: NgForm;
  contactDetails: contact[] = [];
  updateDet = false;

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.crudService.getContact().subscribe((res) => {
      console.log(res);
      if (res['statusCode'] === 200) {
        this.contactDetails = res['contacts'];
        console.log(this.contactDetails);
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log('submit');
    let user = {
      uname: form.value.uname,
      mobileNo: form.value.mobile,
    };
    this.crudService.addContact(user).subscribe((res) => {
      console.log(res);
    });
  }

  update(ele) {
    this.updateDet = true;
    this.form.form.patchValue({
      _id: ele._id,
      uname: ele.uname,
      mobile: ele.mobileNo,
    });
  }

  onUpdate(event) {
    event.stopPropagation();
    let user = {
      uname: this.form.value.uname,
      mobileNo: this.form.value.mobile,
    };
    console.log(user);
    this.crudService
      .updateContact(user, this.form.value._id)
      .subscribe((res) => {
        console.log(res);
        this.getContact();
        this.updateDet = false;
      });
  }

  delete(ele) {
    this.crudService.deleteContact(ele._id).subscribe((res) => {
      console.log(res);
      this.getContact();
    });
  }
}

export interface contact {
  _id: any;
  uname: string;
  mobileNo: string;
}
