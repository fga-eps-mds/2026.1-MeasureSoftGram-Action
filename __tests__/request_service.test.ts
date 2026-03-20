import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  calculatedMathModelResponse, 
  bodyCalculateMathModelRequest

} from './test-data/api-response';
import { RequestService } from '../src/service/request-service';

describe('RequestService', () => {
  let service: RequestService;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    service = new RequestService();
    service.setMsgToken('secret');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test('should return the correct base URL', () => {
    const baseUrl = service.getBaseUrl();
    expect(baseUrl).toBe(service.getBaseUrl());
  });

  test('should return the correct MSG_TOKEN', () => {
    const msgToken = service.getMsgToken();
    expect(msgToken).toBe('secret');
  });

  test('should set the correct MSG_TOKEN', () => {
    service.setMsgToken('secret');
    const msgToken = service.getMsgToken();
    expect(msgToken).toBe('secret');
  });

  test('should successfully fetch organizations', async () => {
    const organizations = [{ id: 1, name: 'org1' }];
    mockAxios.onGet(`${service.getBaseUrl()}organizations/`).reply(200, organizations);

    const response = await service.listOrganizations();

    expect(response).toEqual(organizations);
  });

  test('should successfully fetch products', async () => {
    const products = [{ id: 1, name: 'product1' }];
    mockAxios.onGet(`${service.getBaseUrl()}organizations/1/products/`).reply(200, products);

    const response = await service.listProducts(1);

    expect(response).toEqual(products);
  });

  test('should successfully fetch repositories', async () => {
    const repositories = [{ id: 1, name: 'repo1' }];
    mockAxios.onGet(`${service.getBaseUrl()}organizations/1/products/1/repositories/`).reply(200, repositories);

    const response = await service.listRepositories(1, 1);

    expect(response).toEqual(repositories);
  });

  test('should fetch releases', async () => {
    const releases = [
      { "id": 12, "release_name": "5", "start_at": "2023-06-06T00:00:00-03:00", "created_by": 11, "end_at": "2023-06-13T00:00:00-03:00" },
      { "id": 11, "release_name": "Release 001", "start_at": "2023-12-20T00:00:00-03:00", "created_by": 66, "end_at": "2023-12-25T00:00:00-03:00" },
      { "id": 10, "release_name": "teste", "start_at": "2023-06-05T00:00:00-03:00", "created_by": 80, "end_at": "2023-06-12T00:00:00-03:00" }
    ];
    mockAxios.onGet(`${service.getBaseUrl()}organizations/1/products/3/release`).reply(200, { results: releases });

    const response = await service.listReleases(1, 3);

    expect(response).toEqual(releases);
  });

  test('should successfully calculate TSQMI', async () => {
    const orgId = 1;
    const productId = 1;
    const repoId = 1;

    mockAxios.onPost(`${service.getBaseUrl()}organizations/${orgId}/products/${productId}/repositories/${repoId}/calculate/math-model/`)
      .reply(201, calculatedMathModelResponse);

    const response = await service.calculateMathModel(bodyCalculateMathModelRequest, orgId, productId, repoId);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].data).toBeDefined();
    expect(response).toEqual(calculatedMathModelResponse);
  });

  test('should throw error in case API call fails', async () => {
    const errorMsg = "No data received from the API.";

    mockAxios.onGet().reply(() => [500, { message: 'API Error' }]);

    const listOrganizationsExecution = service.listOrganizations();

    await expect(listOrganizationsExecution).rejects.toThrow(errorMsg);
  });

  test('should throw error in case no data received from the API in listReleases', async () => {
    const errorMsg = 'No data received from the API.';

    mockAxios.onGet().reply(200, null); // Returns a successful status but no data

    const listOrganizationsExecution = service.listOrganizations();

    await expect(listOrganizationsExecution).rejects.toThrow(errorMsg);
  });

  test('should throw error in case network error in listOrganizations', async () => {
    const errorMsg = 'No data received from the API.';
    jest.resetAllMocks();
    mockAxios.onGet().reply(200, null);
    
    const listOrganizationsExecution = service.listOrganizations();
    console.log(listOrganizationsExecution); 

    await expect(listOrganizationsExecution).rejects.toThrow(errorMsg);
  });
});
