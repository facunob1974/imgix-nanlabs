import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-image-dialog',
  templateUrl: './new-image-dialog.component.html',
  styleUrls: ['./new-image-dialog.component.scss']
})
export class NewImageDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<NewImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url:string,name:string}
  ) { }

  ngOnInit() {
    
  }
  onAddClick(): void {
    this.dialogRef.close(this.data);
  }

}
