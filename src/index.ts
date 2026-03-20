import * as core from '@actions/core'
import * as github from '@actions/github'

import GithubAPIService, { GithubMetricsResponse } from './github'
import { getGitHubInfo, getInfo, Info } from './utils';
import { RequestService } from './service/request-service';
import Sonarqube, { MetricsResponseAPI } from './sonarqube'
import Service from './service/service';
import GithubComment from './github/github-comment';

export async function run() {
  try {

    console.log("Iniciando coleta de métricas")

    const { repo } = github.context;
    const currentDate = new Date();
    const info:Info = getInfo(repo);
    const githubToken = core.getInput('githubToken', {required: true});
    const productName = core.getInput('productName');
    const workflowName = core.getInput('workflowName')
    const service = new Service(repo.repo, repo.owner, productName, currentDate);
    const requestService = new RequestService();
    requestService.setMsgToken(core.getInput('msgramServiceToken'));
    const releaseData = await service.checkReleaseExists(requestService); 
    const githubInfo = getGitHubInfo(repo, releaseData.startAt)
    const githubApiService = new GithubAPIService(githubInfo); 
    const sonarqube = new Sonarqube(info);
    
    const octokit = github.getOctokit(githubToken);
    const { pull_request } = github.context.payload;
    
    let metrics: MetricsResponseAPI | null = null
    
    metrics = await sonarqube.getMeasures({
      pageSize: 500,
      pullRequestNumber: null,
    })
    
    let githubMetrics: GithubMetricsResponse | null = null
    githubMetrics = await githubApiService.fetchGithubMetrics(workflowName)
    const result = await service.calculateResults(requestService, metrics, githubMetrics, releaseData.orgId, releaseData.productId, releaseData.repositoryId)

    if (pull_request) {
      console.log('Creating comment')
      const githubComment = new GithubComment()
      const message = githubComment.createMessage(result)
    
      await githubComment.createOrUpdateComment(pull_request.number, message, octokit)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('Unknown error')
    }
  }
}

run()
