import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  qrcodename: string;
  title = 'QR Generator';
  buttonTitleGenerate = 'Generate QR code';
  buttonTitleDownload = 'Download QR Code';
  value: string;
  display = false;
  href: string;

  // generates qr code based on url
  generateQRCode() {
    // checks if input is not empty and generates qr code
    if (this.qrcodename === '' || this.qrcodename === null) {
      this.display = false;
      alert('Please enter a valid url');
    } else {
      this.value = this.qrcodename;
      this.display = true;
    }
  }
  // downloads the qr code as image onto your computer
  downloadImage() {
    this.href = document.getElementsByTagName('img')[1].src;
  }

  constructor() { }

  ngOnInit() {
  }

}
