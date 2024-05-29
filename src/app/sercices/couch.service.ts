import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouchService {

  couchURL: string = 'https://192.168.57.185:5984';
  databaseName: string = 'varatharajtest';
  couchUserName: string = 'd_couchdb';
  couchPassword: string = 'Welcome#2'

  header = {
    headers: {
      'Authorization': 'Basic ' + btoa(this.couchUserName + ":" + this.couchPassword)
    }
  }

  constructor( public http: HttpClient) { }

  //creations

  createUser(doc: any) {
    const createURl: string = `${this.couchURL}/${this.databaseName}`
    return this. http.post(createURl, doc, this.header);
  }

  createTask(doc: any) {
    const createURl: string = `${this.couchURL}/${this.databaseName}`
    return this. http.post(createURl, doc, this.header);
  }

  //read
  readUser() {
    const readUrl: string = `${this.couchURL}/${this.databaseName}/_design/view/_view/user_read?key="user"&include_docs=true`;
    return this.http.get(readUrl, this.header);
  }

  readTask() {
    const readUrl: string = `${this.couchURL}/${this.databaseName}/_design/view/_view/task_read?key="task"&include_docs=true`;
    return this.http.get(readUrl, this.header);
  }

  delete(_id: string, _rev: string) {
    const deleteURL: string = `${this.couchURL}/${this.databaseName}/${_id}?rev=${_rev}`;
    return this.http.delete(deleteURL, this.header);
  }

  //update
  updateUser(_id: string, _rev: string, doc: any) {
    const updateUrl: string = `${this.couchURL}/${this.databaseName}/${_id}?rev=${_rev}`
    return this.http.put(updateUrl, doc, this.header);
  }

  search(searchTearms: any) {
    const searchURL: string = `${this.couchURL}/${this.databaseName}/_design/view/_search/newSearch?`;
    return this.http.post(searchURL ,searchTearms, this.header)
  }

}
