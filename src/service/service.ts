import { Organization, Product, Repository, RequestService, ResponseListReleases } from "./request-service";
import { MetricsResponseAPI } from '../sonarqube';
import { GithubMetricsResponse } from "../github";

export interface CalculatedMsgram {
    repository: { key: string; value: string }[];
    version: { key: string; value: string }[];
    measures: { key: string; value: number }[];
    subcharacteristics: { key: string; value: number }[];
    characteristics: { key: string; value: number }[];
    tsqmi: { key: string; value: number }[];
}

interface MathModelRequest {
    github: GithubMetricsResponse, 
    sonarqube: MetricsResponseAPI
}

export default class Service {
    private repo: string;
    private owner: string;
    private currentDate: Date;
    private productName: string;

    constructor(repo: string, owner: string, productName: string, currentDate: Date) {
        this.repo = repo;
        this.owner = owner;
        this.currentDate = currentDate;
        this.productName = productName;
    }

    private logRepoInfo() {
        console.log(`Repo: ${this.repo}`);
        console.log(`Owner: ${this.owner}`);
    }

    public async checkEntityExists(entities: Array<Product | Repository | Organization>, name: string): Promise<number> {
        let entityId = null;

        for (const entity of entities) {
            if (entity.name === name) {
                entityId = entity.id; 
                break;
            }
        }

        if (!entityId) {
            throw new Error(`Entity ${name} does not exist.`);
        } else {
            return entityId;
        }
    }

    public async checkReleaseExists(requestService: RequestService): Promise<{startAt: string, orgId: number, productId: number, repositoryId: number}> {
        const listOrganizations = await requestService.listOrganizations();
        const orgId: number = await this.checkEntityExists(listOrganizations.results, this.owner);
        console.log('orgId ', orgId);
    
        const listProducts = await requestService.listProducts(orgId);
        const productId: number = await this.checkEntityExists(listProducts.results, this.productName);
        console.log('productId ', productId)
        
        const listRepositories = await requestService.listRepositories(orgId, productId);
        const repositoryId: number = await this.checkEntityExists(listRepositories.results, this.repo);
    
        const listReleases: Array<ResponseListReleases> = await requestService.listReleases(orgId, productId);
        const currentDateStr = this.currentDate.toISOString().split('T')[0];

        let releaseId = null;
        let startAt = ""; 
        let responseStart = ""; 
        for (const release of listReleases) {
            responseStart = release.start_at; 
            startAt = release.start_at.split('T')[0];
            const endAt = release.end_at.split('T')[0];

            if (currentDateStr >= startAt && currentDateStr <= endAt) {
                releaseId = release.id;
                break;
            }
        }

        if (releaseId === null) {
            throw new Error(`No release is happening on ${currentDateStr}.`);
        } else {
            console.log(`Release with id ${releaseId} is happening on ${currentDateStr}.`);
        }
        return {startAt: responseStart, orgId: orgId, productId: productId, repositoryId: repositoryId}
    }

    public async createMetrics(requestService: RequestService, sonarMetrics: MetricsResponseAPI | null, githubMetrics: GithubMetricsResponse | null, orgId: number, productId: number, repositoryId: number) {
        const metrics = {} as MathModelRequest
        console.log('Calculating metrics, measures, characteristics and subcharacteristics');
        if(sonarMetrics) {
            metrics.sonarqube = sonarMetrics; 
        }
        
        if(githubMetrics) {
            metrics.github = githubMetrics;
        }
         
        const calculatedResponse = await requestService.calculateMathModel(metrics, orgId, productId, repositoryId);

        return calculatedResponse; 
    }

    public async calculateResults(requestService: RequestService, metrics: MetricsResponseAPI | null, githubMetrics: GithubMetricsResponse | null, orgId: number, productId: number, repositoryId: number) {
        this.logRepoInfo();
        const result = await this.createMetrics(requestService, metrics, githubMetrics, orgId, productId, repositoryId);

        console.log('Calculation of the MeasureSoftGram mathematical model completed successfully. Check the web application to see the data');
        return result;
    }
}
