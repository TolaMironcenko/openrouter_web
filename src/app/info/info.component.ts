import { Component } from '@angular/core';
import {NavbarComponent} from "../components/navbar/navbar.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  versionnumber: string = "0.1.1"
}
