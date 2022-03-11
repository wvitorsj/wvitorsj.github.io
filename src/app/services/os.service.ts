import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { OS } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snak: MatSnackBar) { }

  findAll():Observable<OS[]> {
    const url = this.baseUrl + "/os";
    return this.http.get<OS[]>(url);
  }

  findById(id: any):Observable<OS>{
    const url = `${this.baseUrl}/os/${id}`;
    return this.http.get<OS>(url);
  }

  create(os: OS):Observable<OS> {
    const url = this.baseUrl + "/os";
    return this.http.post<OS>(url, os);
  }

  update(os: OS):Observable<OS> {
    const url = `${this.baseUrl}/os`;
    return this.http.put<OS>(url, os);
  }  

  message(msg: String):void{
    this.snak.open(`${msg}`, 'OK',{
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    })
  }
}
