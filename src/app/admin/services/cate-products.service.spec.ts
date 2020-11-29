import { TestBed } from '@angular/core/testing';

import { CateProductsService } from './cate-products.service';

describe('CateProductsService', () => {
  let service: CateProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
