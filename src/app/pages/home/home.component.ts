import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapCarouselComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MapCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
