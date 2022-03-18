import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})

export class AppComponent {

  isValidated:boolean = false;
  email:string = "rahul@testorg.com";
  mobileno:string = "223232";
  emplyeeDataLength:number = 0;
  search:any="";
  error:boolean = false;
  errorMessage:string ="";
  private Backend_API_Server = "https://salesforce-backend.herokuapp.com/";
  displayedColumns: string[] = ['id','firstName','lastName','emailId','phoneNo','company','jobRole'];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild('paginator') paginator! : MatPaginator;
  ELEMENT_DATA: PeriodicElement[]=[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private httpClient: HttpClient) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  submit(){
    console.log(this.email);
    return this.httpClient.post<any>(this.Backend_API_Server,{
      email: this.email,
      mobileNo: this.mobileno
    }).subscribe((data: any)=>{
      console.log(data);
      if(data.rc.returncode == 2){
        this.errorMessage = data.rc.errorMessage;
        this.error = true;
        return ;
      }
      const serviceData:any = [];
      this.error = false;
      function* iterate_object(o:any){
        var keys = Object.keys(o);
        for(let i=0;i<keys.length;i++){
          yield [keys[i],o[keys[i]]];
        }
      }
      for(var [key,val] of iterate_object(data.data)){
        serviceData.push(val);
      }
      this.isValidated = true;
      this.dataSource.data = serviceData;
      this.emplyeeDataLength= this.dataSource.data.length-1;
    })
  }


  searchFilter(){
    console.log(this.search);
      this.dataSource.filter = this.search;
    }

}
/* Static data */ 
export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNo: string;
  company: string;
  jobRole: string;
}
