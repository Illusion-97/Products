import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PanierService} from '../../services/panier.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  protected service = inject(PanierService)
}
