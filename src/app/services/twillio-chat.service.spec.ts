import { TestBed } from '@angular/core/testing';

import { TwillioChatService } from './twillio-chat.service';

describe('TwillioChatService', () => {
  let service: TwillioChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwillioChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
