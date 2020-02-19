import { Component, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { UpgradableComponent } from 'theme/components/upgradable';
import { FileService,AuthService } from '@services/';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent extends UpgradableComponent{
  @HostBinding('class.projects-table') private readonly projectsTable = true;

  private tableHeader: String[];
  private data:File[];
  title:String[];
  private user;
  private _path;
  @Input() set path(path:string){
    this._path = path;
    this.ngOnInit()
    
  };

  @Output() popUpForm = new EventEmitter<string>();
  
 

  public constructor(private fileService:FileService,private authService:AuthService,private activatedRoute:ActivatedRoute,private router:Router){
    super();

    
    this.authService.userData.subscribe(user => {
      if(user){
  
        this.user=user;
      }   

    })

    



    
    
  }


  ngOnInit(){

    this.setTableTitle();
        
      this.getTableHeaders();
      this.getData();
   
    
    
  }



 
  public setTableTitle(){
    
    this.title=this._path.replace("./","").split("/")
    
    

  }
  public getTableHeaders(){
    this.tableHeader=[
          'File Name',
          'File Type',
          'Size',
          'Last Updated',
    ];

  }
  

  public getData (){
    
   
    this.fileService.getUserFiles(this._path).subscribe((files:any)=>{

      
      if(files.length!=0){
       

        this.data = files;
        this.setTableTitle();
      }
      else{
        this.data = null
      }

      
    });
  }

  public createFolder(){
    this.popUpForm.emit("createFolder");


  }

  public uploadFile(){
    this.popUpForm.emit("uploadFile");

  }

  public onSelectFolder(index){
    let folderPath = this.title.slice(0,index+1); 
    this.router.navigate(['..',folderPath.join(":")],{relativeTo:this.activatedRoute});
    

  }

  onSelectFile(){

    console.log(event.target)
  }

  deleteFile(file){
    this.fileService.deleteFile(file).subscribe(res=>{

      //TODO: proper messages
      //delete from id
        console.log(res)

    },err=>{

      console.log(err)
    });

  }

  downloadFile(file){
    

    this.fileService.downloadFile(file._id).subscribe(res=>{
      const blob = new Blob([res], { type: file.fileType});
      saveAs(blob,file.fileName);

     },err=>{
      //TODO:add nice response
      console.log(err)
     }
     
     );
    

  }

  viewFile(file){
    
    
    
    if(file.fileType==='folder'){
      //TODO: Add validation at create folder

      let path = file.path.replace(".\/","")
      path = path.replace(/\//g,":")
      


      this.router.navigate(['..',[path,file.fileName].join(":")],{relativeTo:this.activatedRoute});
    }
    else{

      this.fileService.viewFile(file._id).subscribe(res=>{
        const blob = new Blob([res], { type: file.fileType});
        const url= window.URL.createObjectURL(blob);
        window.open(url);
  
       },err=>{
        //TODO:add nice response
        console.log(err)
       }
       
       );


    }

    
  }
 
  
}
