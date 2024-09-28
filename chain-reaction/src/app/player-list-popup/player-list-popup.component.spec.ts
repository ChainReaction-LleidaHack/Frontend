import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListPopupComponent } from './player-list-popup.component';

describe('PlayerListPopupComponent', () => {
  let component: PlayerListPopupComponent;
  let fixture: ComponentFixture<PlayerListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerListPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
