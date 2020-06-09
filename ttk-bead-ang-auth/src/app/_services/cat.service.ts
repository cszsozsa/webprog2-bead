import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cat } from '../_models/cat';
import { Observable, of } from 'rxjs';

// fejléc a kérésekhez
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class CatService {
  // Saját szerver (HelixLab-es pontosabban), saját backenddel
  private apiUrl = 'http://devpool.hu/Egyetem/index.php'

  constructor(private http: HttpClient) { }

  // getAllCat
  getCatsFromDatabase(): Observable<Cat[]> {
    return this.http.post<Cat[]>(this.apiUrl, {task: 'get', id: ''},httpOptions);
  }
  // getCatById
  getCatByIdFromDatabase(cat: any): Observable<Cat> {
    return this.http.post<Cat>(`${this.apiUrl}`, cat, httpOptions);
  }

  // Add Cat
  addCatToDatabase(Cat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Cat, httpOptions);
  }
  // Delete Cat
  deleteCatByIdFromDatabase(id: number): Observable<Cat> {
    return this.http.post<Cat>(`${this.apiUrl}`, {id, task: 'delete'},httpOptions);
  }
  // Update Cat
  updateCatByIdToDatabase(Cat): Observable<Cat> {
    return this.http.post<Cat>(`${this.apiUrl}`, Cat, httpOptions);
  }

}
