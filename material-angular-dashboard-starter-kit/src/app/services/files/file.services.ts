import {HttpHeaders,HttpClient,HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {File} from '../../models/file';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import 'rxjs';


@Injectable({
    providedIn:'root'
})

//TODO:set headers
//return type

export class FileService{

    baseUrl=`${environment.apiBaseUrl}`;
    httpOptions={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    }


    constructor(private http:HttpClient){
        
    }

    getUserFiles(path:string):Observable<File[]>{

        let params = new HttpParams().set('_id',localStorage.getItem('id')).set('path',path);
        
        return this.http.get<File[]>(`${this.baseUrl}/files`,{params:params});

    }

    createFolder (folderName:string,path:string){
        
        return this.http.post(`${this.baseUrl}/create-folder`,{
            _id: localStorage.getItem('id'), 
            path: path, 
            fileName: folderName
             });

        

    }

    uploadFile(file){
        

        return this.http.post(`${this.baseUrl}/upload`,file);

    }

    deleteFile(file){
        let params = new HttpParams().set('file',JSON.stringify(file));

        return this.http.delete(`${this.baseUrl}/delete`,{
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            })
        ,params:params});

    }

    downloadFile(fileID:string){

        let params = new HttpParams().set('id',fileID);
       return this.http.get(`${this.baseUrl}/download`, {params:params, responseType: 'blob'})
    }

    viewFile(fileID:string){


        let params = new HttpParams().set('id',fileID);
        return this.http.get(`${this.baseUrl}/view`, {params:params, responseType: 'blob'})



    }

    searchAllFiles():Observable<File[]>{

        let params = new HttpParams().set('id',localStorage.getItem('id'));
        return this.http.get<File[]>(`${this.baseUrl}/view-all-files`,{params:params});

    }
       
       
    

}