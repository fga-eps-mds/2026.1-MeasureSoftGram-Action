import axios from 'axios';
import Sonarqube from '../src/sonarqube';
import { Info } from '../src/utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Sonarqube', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedAxios.create.mockClear();
    mockedAxios.get.mockClear();
  });

  test('Constructor should use provided host if available', () => {
    const info: Info = {
      host: 'http://my-sonarqube-instance.com',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
      token: ''
    };

    const sonarqube = new Sonarqube(info);

    expect(sonarqube.host).toBe(info.host);
  });

  test('Constructor should use default host if no host provided', () => {
    const info: Info = {
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
      host: '',
      token: ''
    };

    const sonarqube = new Sonarqube(info);

    expect(sonarqube.host).toBe('https://sonarcloud.io');
  });

  test('Constructor should initialize correctly with given data', () => {
    const info: Info = {
      host: 'http://localhost:9000',
      token: '123456',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
    };

    const tokenb64 = Buffer.from(`${info.token}:`).toString('base64');

    new Sonarqube(info);

    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: info.host,
      timeout: 10000,
      headers: {
        Authorization: `Basic ${tokenb64}`,
      },
    });
  });

  test('Constructor should initialize correctly without Authorization header if no token given', () => {
    const info: Info = {
      host: 'http://localhost:9000',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
      token: ''
    };
  
    new Sonarqube(info);
  
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: info.host,
        timeout: 10000,
      })
    );
    const callArg = mockedAxios.create.mock.calls[0]?.[0];
    if (!info.token) {
      if (callArg?.headers && 'Authorization' in callArg.headers) {
        expect(callArg.headers.Authorization).toBe("");
      } else {
        fail("Authorization header not found");
      }
    }
  });
   

  test('getMeasures should make a correct axios call', async () => {
    const info: Info = {
      host: 'http://localhost:9000',
      token: '123456',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
    };

    const pageSize = 500;
    const sonar_url = `/api/measures/component_tree?component=${info.project.sonarProjectKey}&metricKeys=files,functions,complexity,comment_lines_density,duplicated_lines_density,coverage,ncloc,tests,test_errors,test_failures,test_execution_time,security_rating,test_success_density,reliability_rating&ps=${pageSize}`;

    const measuresResponse = { 
      data: { 
        paging: {
          pageIndex: 1,
          pageSize: 10,
          total: 50
        },
        baseComponent: {},
        components: [],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementationOnce(async (url, options) => {
      console.log(`URL: ${url}`);
      console.log(`Options: ${JSON.stringify(options)}`);
      if (url === sonar_url) {
        return Promise.resolve(measuresResponse);
      }
      return Promise.reject('Unexpected URL or options');
    });

    mockedAxios.create.mockImplementationOnce(() => mockedAxios);

    const sonarqube = new Sonarqube(info);
    
    try {
      const measures = await sonarqube.getMeasures({ pageSize, pullRequestNumber: null });
      expect(measures).toBe(measuresResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(sonar_url);
    } catch (error) {
      console.log('Error in test: ', error);
      throw error;
    }
  });

  test('getMeasures should handle axios errors', async () => {
    const info: Info = {
      host: 'http://localhost:9000',
      token: '123456',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
    };

    mockedAxios.get.mockImplementationOnce(async () => {
      return Promise.reject(new Error('API call failed'));
    });

    mockedAxios.create.mockImplementationOnce(() => mockedAxios);

    const sonarqube = new Sonarqube(info);
    const pageSize = 500;
    await expect(sonarqube.getMeasures({ pageSize, pullRequestNumber: null })).rejects.toThrow('Error getting project measures from SonarQube. Please make sure you provided the host and token inputs.');
  });

  test('getMeasures should handle non-200 status codes', async () => {
    const info: Info = {
      host: 'http://localhost:9000',
      token: '123456',
      project: {
        sonarProjectKey: 'sonarProjectKey',
      },
    };
  
    mockedAxios.get.mockImplementationOnce(async () => {
      return Promise.resolve({
        status: 400, // Non-200 status
        data: null, // No data
      });
    });
  
    mockedAxios.create.mockImplementationOnce(() => mockedAxios);
  
    const sonarqube = new Sonarqube(info);
    const pageSize = 500;
    await expect(sonarqube.getMeasures({ pageSize, pullRequestNumber: 3 })).rejects.toThrow('Error getting project measures from SonarQube. Please make sure you provided the host and token inputs.');
  });
  
});
