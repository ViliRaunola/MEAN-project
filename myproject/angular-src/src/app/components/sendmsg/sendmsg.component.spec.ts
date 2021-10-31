/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendmsgComponent } from './sendmsg.component';

describe('SendmsgComponent', () => {
  let component: SendmsgComponent;
  let fixture: ComponentFixture<SendmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
