import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private httpClient: HttpClient) {}

  getContact() {
    return this.httpClient.get(environment.getContacts);
  }

  addContact(user) {
    return this.httpClient.post(environment.addContact, user);
  }

  deleteContact(id) {
    return this.httpClient.delete(environment.deleteContact + '/' + id);
  }

  updateContact(user, id) {
    return this.httpClient.post(environment.updateContact + '/' + id, user);
  }
}
