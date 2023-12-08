import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { CharacterRole, CharactersService, Personagem } from '../../shared';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnDestroy {
  public icon = { faMagnifyingGlass }
  public personagens: Personagem[]
  public opcoesRole = CharacterRole
  public characterRole = CharacterRole.ASSASSIN
  public search: string
  public bannerImage: SafeStyle

  private _bannerAssassino = this._sanitizer.bypassSecurityTrustStyle('url(/assets/banner_assassinos.png)')
  private _bannerSobrevivente = this._sanitizer.bypassSecurityTrustStyle('url(/assets/banner_sobrevivente.png)')
  private _unsubscribe = new Subject<void>()

  constructor(private _charactersService: CharactersService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.bannerImage = this._bannerAssassino
    this._buscarDados();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next()
    this._unsubscribe.complete()
  }

  public alterarPersonagens(opcao: CharacterRole): void {
    this.bannerImage = opcao == this.opcoesRole.ASSASSIN ? this._bannerAssassino : this._bannerSobrevivente
    this.characterRole = opcao
    this._buscarDados()
  }

  public pesquisarPersonagens(search: string): void {
    this.search = search
    this._charactersService.buscarPersonagensPorNome(search, this.characterRole).pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
      this.personagens = data
    })
  }

  private _buscarDados(): void {
    this._charactersService.buscarPersonagensPorPapel(this.characterRole).pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
      this.personagens = data
    })
  }
}
