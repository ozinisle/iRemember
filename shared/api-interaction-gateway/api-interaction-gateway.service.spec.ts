import { TestBed } from '@angular/core/testing';

import { ApiInteractionGatewayService } from './api-interaction-gateway.service';

describe('ApiInteractionGatewayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInteractionGatewayService = TestBed.get(ApiInteractionGatewayService);
    expect(service).toBeTruthy();
  });
});
