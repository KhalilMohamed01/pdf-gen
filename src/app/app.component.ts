import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PdfComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-generator';
}
