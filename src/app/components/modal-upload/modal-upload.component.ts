import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalUploadService } from '../../services';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  img: string = "x";  //id of the image or full URL.
  private finalImg: File;
  
  @ViewChild('img',{static:false})
  myInputFile: ElementRef;

  constructor(private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.abrirModal();
  }

  abrirModal() {
    // una imagen de  id inventado hace que la pipe imagen presente la imangen "no-imagen"
    this.img = this.modalUploadService.img || 'x';
    this.finalImg = null;
    this.modalUploadService.previewImg = null;
  }

  cerrarModal() {
    this.modalUploadService.ocultarModal();
    this.img='x';
    this.finalImg = null;
    this.modalUploadService.previewImg = null;
    this.myInputFile.nativeElement.value = "";
  }

  // see https://w3path.com/new-angular-8-file-upload-or-image-upload/
  previsualizarImagen(file: any) {
    this.finalImg = file.target.files[0];
    if (this.finalImg == null) {
      return;
    }
    console.log("previsualizarImagen", file, this.finalImg);

    var reader = new FileReader();
    reader.readAsDataURL(this.finalImg);
    reader.onload = (_event) => {
      this.modalUploadService.previewImg = reader.result;
    }
  }

  subeImg() {
    console.log("subeImg");
    this.modalUploadService.subirArchivo(this.finalImg);
    this.myInputFile.nativeElement.value = "";
  }

}
