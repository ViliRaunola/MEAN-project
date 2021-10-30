/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MsgService } from './msg.service';

describe('MsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgService]
    });
  });

  it('should ...', inject([MsgService], (service: MsgService) => {
    expect(service).toBeTruthy();
  }));
});
