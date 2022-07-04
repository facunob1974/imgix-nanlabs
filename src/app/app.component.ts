import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewImageDialogComponent } from './components/dialogs/new-image-dialog/new-image-dialog.component';
import { ImgixParams } from './core/interfaces/imagixParams.interface';
import { ImgixService } from './core/services/imgix.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Challenge NanLabs';
  listTestImages:any[] = [];
  imageSrc:string = "";
  rotation:number = 1;
  initialState = { w: 500, orient:1, bri: 0, con:0, exp:0, gam:0, high:0,hue:0,invert:false,sat:0,shad:0,sharp:0,usm:0,vib:0,usmrad:2.5 };
  imgixParams:ImgixParams;
  pastStatesImage:ImgixParams[] = [];
  futuresStatesImage:ImgixParams[] = [];
  urlGenerated:string = "";
  urlImgix = "https://assets.imgix.net/";
    

  constructor(
    private imgixService:ImgixService,
    public dialog: MatDialog
  ){
    this.imgixParams = structuredClone(this.initialState);
  }


  ngOnInit(): void {
    this.imgixService.getTestImages().subscribe(
      data => {
        this.listTestImages = data;
        this.imageSrc = data[0].url.replace(this.urlImgix,'');
        this.generateUrlclean();
      },
      error => {
        console.error("Error getting images",error);
      }
    )
  }

  generateUrlclean(){
    this.urlGenerated = this.urlImgix+this.imageSrc+"?"+this.encodeData(this.imgixParams);

  }

  encodeData(data:any) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }

  selectImage(url:string):void {
    this.imageSrc = url.replace(this.urlImgix,'');
    this.imgixParams = structuredClone(this.initialState);
    this.pastStatesImage = [];
    this.futuresStatesImage = [];
    this.generateUrlclean();
  }

  rotate(rot:string){
    this.newState();
    rot == 'R' ? this.rotation == 8 ? this.rotation = 1 : this.rotation++ : this.rotation == 1 ? this.rotation = 8 : this.rotation--;
    this.imgixParams.orient = this.rotation;  
    this.generateUrlclean();    
  }
  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }
  

  changeSliderData(param:string,e:any){
    this.newState();
    (this.imgixParams as any)[param] = e.value;
    this.generateUrlclean();
  }
  
  changeInvert(e:any){
    this.newState();
    this.imgixParams.invert = e.checked;
    this.generateUrlclean();
  }  
  
  backState(){
    this.futuresStatesImage.push(structuredClone(this.imgixParams));
    this.imgixParams = structuredClone(this.pastStatesImage[this.pastStatesImage.length - 1]);
    this.pastStatesImage.pop();
    this.generateUrlclean();
    
  }

  fowardState(){
    this.pastStatesImage.push(structuredClone(this.imgixParams));
    this.imgixParams = structuredClone(this.futuresStatesImage[this.futuresStatesImage.length - 1]);
    this.futuresStatesImage.pop();
    this.generateUrlclean();
  }

  newState(){
    this.futuresStatesImage = [];
    this.pastStatesImage.push(structuredClone(this.imgixParams));
    this.generateUrlclean();
    
  }

  addNewImage(){
    let dialogRef = this.dialog.open(NewImageDialogComponent, {
      height: '300px',
      width: '600px',
      data:{
        url:"",
        name:""
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listTestImages.push({ url:result.url, name:result.name });
      this.imageSrc = result.url.replace(this.urlImgix,'');
      this.generateUrlclean();
    });
    
  }

}
