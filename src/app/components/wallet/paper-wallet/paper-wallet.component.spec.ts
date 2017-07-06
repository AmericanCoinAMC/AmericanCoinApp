import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperWalletComponent } from './paper-wallet.component';

describe('PaperWalletComponent', () => {
  let component: PaperWalletComponent;
  let fixture: ComponentFixture<PaperWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
