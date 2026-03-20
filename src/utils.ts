import * as core from '@actions/core';

export interface Info {
    project: {
        sonarProjectKey: string
    }
    host: string
    token: string
}

export function getInfo(repo: { owner: string; repo: string }): Info {
    return {
        project: {
            sonarProjectKey: core.getInput('sonarProjectKey')
                ? core.getInput('sonarProjectKey')
                : `${repo.owner}_${repo.repo}`,
        },
        host: core.getInput('host'),
        token: core.getInput('sonarToken'),
    }
}

export interface GitHubInfo{
    owner: string
    repo: string
    label: string
    token: string
    beginDate: string
}

export function getGitHubInfo(repo: {owner: string, repo: string }, beginDate: string): GitHubInfo {
   return {
    owner: repo.owner, 
    repo: repo.repo, 
    label: core.getInput('usLabel'), 
    token: core.getInput('gitHubToken'),
    beginDate: beginDate
   } 
}
