import * as github from '@actions/github';

import { CalculatedMsgram } from '../service/service';

interface Comment {
    user: {
        login: string;
    };
    body: string;
}

export default class GithubComment {
    public createMessage(result: Array<CalculatedMsgram>): string {
        const message = `
      ## MeasureSoftGram Analysis Results
  
      ### TSQMI Values
  
      ${result[0].tsqmi[0].value.toFixed(2)}
  
      ### Characteristics Values
  
      ${result[0].characteristics.map((characteristic) => `* **${characteristic.key}**: ${characteristic.value.toFixed(2)}`).join('\n')}
  
      ###`.trim().replace(/^\s+/gm, '');

        return message;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async createOrUpdateComment(pullRequestNumber: number, message: string, octokit: any) {
        // Check if a comment already exists on the pull request
        const { data: comments } = await octokit.rest.issues.listComments({
            ...github.context.repo,
            issue_number: pullRequestNumber
        });
        const actionUser = "github-actions[bot]"
        
        const existingComment = comments.find(
            (comment: Comment) => {
                return comment.user.login === actionUser && comment.body.includes('## MeasureSoftGram Analysis Results');
            }
        );

        if (existingComment) {
            // Comment already exists, update it
            await octokit.rest.issues.updateComment({
                ...github.context.repo,
                comment_id: existingComment.id,
                body: message
            });
        } else {
            // Comment doesn't exist, create a new comment
            await octokit.rest.issues.createComment({
                ...github.context.repo,
                issue_number: pullRequestNumber,
                body: message
            });
        }
    }
}