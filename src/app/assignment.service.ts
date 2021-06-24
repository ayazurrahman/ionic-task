import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http:HttpClient) { }

  submitAssignment(assignment){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.http.post('http://192.168.2.230:3000/task',assignment);
  }

  getAssignment(){
      return this.http.get('http://192.168.2.230:3000/task')
  }

  deleteTask(id){
    console.log(id)
    return this.http.delete('http://192.168.2.230:3000/task/'+id)
  }

}
