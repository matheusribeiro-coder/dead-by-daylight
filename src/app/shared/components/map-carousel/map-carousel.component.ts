import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Mapa } from '../../model';
import { MapasService } from '../../services';

@Component({
  selector: 'app-map-carousel',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './map-carousel.component.html',
  styleUrl: './map-carousel.component.scss'
})
export class MapCarouselComponent implements OnInit, OnDestroy {
  public icon = { faChevronRight, faChevronLeft, }
  public mapas: Mapa[]
  public selectedIndex = 0

  private _unsubscribe = new Subject<void>()

  constructor(private _mapasService: MapasService) { }

  ngOnInit(): void {
    this._buscarDados();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next()
    this._unsubscribe.complete()
  }

  public onPrevButton(): void {
    this.selectedIndex == 0 ? this.selectedIndex = this.mapas?.length -1 : this.selectedIndex--
  }

  public onNextButton(): void {
    this.selectedIndex == this.mapas?.length -1 ? this.selectedIndex = 0 : this.selectedIndex++
  }

  private _buscarDados(): void {
    this._mapasService.buscarTodos()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((mapas) => this.mapas = mapas)
  }
}
