import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Sonarqube from "../sonarqube";
import { CalculatedMsgram } from "./service";

export interface Organization {
    id: number;
    url: string;
    name: string;
    key: string;
    description: string;
    products: Array<string>;
    actions: unknown;
}

export interface Product {
    id: number;
    url: string;
    name: string;
    key: string;
    organization: string;
    description: string;
    repositories: Array<string>;
    actions: unknown;
}

export interface Repository {
    id: number;
    url: string;
    name: string;
    key: string;
    description: string;
    product: string;
    latest_values: unknown;
    historical_values: unknown;
    actions: unknown;
}

export interface ResponseListRepositories {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Repository>;
}

export interface ResponseListProducts {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Product>;
}

export interface ResponseListReleases {
    id: number;
    release_name: string;
    start_at: string;
    end_at: string;
    created_by: number;
}


export interface ResponseListOrganizations {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Organization>;
}

export interface ResponseCalculateCharacteristics {
    id: number;
    value: number;
    created_at: string;
    characteristic_id: number;
}

export interface ResponseCalculateSubcharacteristics {
    id: number;
    value: number;
    created_at: string;
    subcharacteristic_id: number;
}

export interface ResponseCollectedMetrics {
    id: number;
    value: number;
    created_at: string;
    metric_id: number;
}

export interface ResponseCalculateTSQMI {
    id: number;
    value: number;
    created_at: string;
}

export interface ResponseCalculateMathModel {
    metrics: ResponseCollectedMetrics[];
    measures: ResponseCalculateMathModel[];
    subcharacteristics: ResponseCalculateSubcharacteristics; 
    characteristics: ResponseCalculateCharacteristics; 
    tsqmi: ResponseCalculateTSQMI[]
}

export class RequestService {
    private MSGRAM_SERVICE_HOST = 'https://epsmsg.shop';
    private MSG_TOKEN = "'secret';"
    private baseUrl = `${this.MSGRAM_SERVICE_HOST}/api/v1/`;

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getMsgToken(): string {
        return this.MSG_TOKEN;
    }
    
    public setMsgToken(token: string): void {
        this.MSG_TOKEN = token;
    }

    private async makeRequest(method: 'get' | 'post', url: string, data: object = {}): Promise<AxiosResponse | null> {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.MSG_TOKEN
            },
            method,
            url,
            data,
        };

        axios.defaults.timeout = 50000; // await for heroku to wake up

        let response: AxiosResponse | null = null;
        try {
            response = await axios(config);
            console.log(`Data ${method === 'get' ? 'received' : 'sent'}. Status code: ${response?.status}`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error(`Failed to ${method} data to the API. ${axiosError.message} at route ${config.url}`);
            } else {
                console.error('An unexpected error occurred.');
            }
        }
        return response; 
    }

    public async listOrganizations(): Promise<ResponseListOrganizations> {
        const url = `${this.baseUrl}organizations/`;
        const response =  await this.makeRequest('get', url);
        if (response?.data) {
            console.log(`Data received. Status code: ${response.status}`);
            return response?.data;
        } else {
            throw new Error('No data received from the API.');
        }
    }

    public async listProducts(orgId: number): Promise<ResponseListProducts> {
        const url = `${this.baseUrl}organizations/${orgId}/products/`;
        const response =  await this.makeRequest('get', url);
        return response?.data;
    }

    public async listRepositories(orgId: number, productId: number): Promise<ResponseListRepositories> {
        const url = `${this.baseUrl}organizations/${orgId}/products/${productId}/repositories/`;
        const response = await this.makeRequest('get', url);
        console.log(`Data received. Status code: ${response?.status}`);
        return response?.data;

    }

    public async listReleases(orgId: number, productId: number): Promise<ResponseListReleases[]> {
        const url = `${this.baseUrl}organizations/${orgId}/products/${productId}/release`;    
        const response =  await this.makeRequest('get', url);
        console.log(`Data received. Status code: ${response?.status}`);
        return response?.data.results;
    }

    public async getCurrentPreConfig(orgId: number, productId: number) {
        const url = `${this.baseUrl}organizations/${orgId}/products/${productId}/current/release-config`
        const response = await this.makeRequest('get', url); 
        console.log(`Data received. Status code: ${response?.status}`);
        return response?.data?.data;
    }

    public async calculateMathModel(metrics: object, orgId: number, productId: number, repoId: number): Promise<CalculatedMsgram[]> {
        const url = `${this.baseUrl}organizations/${orgId}/products/${productId}/repositories/${repoId}/calculate/math-model/`;
        const response = await this.makeRequest('post', url, metrics);
        if (response?.status == 201 && response.data) {
            console.log(`Data received. Status code: ${response?.status}`);
            return response?.data;
        } else {
            throw new Error('The data was not calculated properly .');
        }
    }
}
