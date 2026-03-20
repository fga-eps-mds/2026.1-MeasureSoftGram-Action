import { GithubMetricsResponse } from "../../src/github";
import { ResponseListOrganizations, ResponseListProducts, ResponseListReleases, ResponseListRepositories, ResponseCalculateMathModel } from "../../src/service/request-service";
import { MetricsResponseAPI } from "../../src/sonarqube";

export const bodyListOrganizationsResponse: ResponseListOrganizations = {
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "url": "http://127.0.0.1:8080/api/v1/organizations/1/",
      "name": "fga-eps-mds",
      "key": "fga-eps-mds",
      "description": "Organização da empresa Pagar-me",
      "products": [
        "http://127.0.0.1:8080/api/v1/organizations/1/products/1/",
        "http://127.0.0.1:8080/api/v1/organizations/1/products/2/"
      ],
      "actions": {
        "create a new product": "http://127.0.0.1:8080/api/v1/organizations/1/products/"
      }
    },
    {
      "id": 2,
      "url": "http://127.0.0.1:8080/api/v1/organizations/2/",
      "name": "fga-eps-mds2",
      "key": "fga-eps-mds2",
      "description": "Organização da empresa Pagar-me",
      "products": [],
      "actions": {
        "create a new product": "http://127.0.0.1:8080/api/v1/organizations/2/products/"
      }
    }
  ]
}

export const calculatedMathModelResponse = {
  metrics: [
    {
      id: 93586,
      metric_id: 1510,
      value: 2.0,
      created_at: "2024-09-10T19:51:05.855496-03:00"
    },
    {
      id: 93587,
      metric_id: 2333,
      value: 1.0,
      created_at: "2024-09-10T19:51:05.855538-03:00"
    },
    {
      id: 93591,
      metric_id: 104,
      value: 241.0,
      created_at: "2024-09-10T19:51:05.855658-03:00"
    },
    {
      id: 93594,
      metric_id: 105,
      value: 33.0,
      created_at: "2024-09-10T19:51:05.855718-03:00"
    },
    {
      id: 93601,
      metric_id: 10,
      value: 5.7,
      created_at: "2024-09-10T19:51:05.855855-03:00"
    }
  ],
  measures: [
    {
      id: 3035,
      measure_id: 3,
      value: 1.0,
      created_at: "2024-09-10T19:51:06.379157-03:00"
    },
    {
      id: 3036,
      measure_id: 4,
      value: 0.85,
      created_at: "2024-09-10T19:51:06.379175-03:00"
    }
  ],
  subcharacteristics: [
    {
      id: 1013,
      subcharacteristic_id: 1,
      value: 0.7633637436759544,
      created_at: "2024-09-10T19:51:06.440637-03:00"
    }
  ],
  characteristics: [
    {
      id: 1031,
      characteristic_id: 1,
      value: 0.41637162119267096,
      created_at: "2024-09-10T19:51:06.468321-03:00"
    }
  ],
  tsqmi: {
    id: 497,
    value: 0.5004488019824581,
    created_at: "2024-09-10T19:51:06.490053-03:00"
  }
};


export const bodyListProductsResponse: ResponseListProducts = {
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 2,
      "url": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/",
      "name": "MeasureSoftGram2",
      "key": "fga-eps-mds-measuresoftgram2",
      "organization": "http://127.0.0.1:8080/api/v1/organizations/1/",
      "description": "Sistema de geração de filmes aleatórios",
      "repositories": [
        "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/"
      ],
      "actions": {
        "create a new repository": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/",
        "get current goal": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/current/goal/",
        "get compare all goals": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/all/goal/",
        "get current pre-config": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/current/pre-config/",
        "get pre-config entity relationship tree": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/entity-relationship-tree/",
        "get all repositories latest sqcs": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories-sqc-latest-values/",
        "get all repositories sqc historical values": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories-sqc-historical-values/",
        "create a new goal": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/create/goal/",
        "create a new pre-config": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/create/pre-config/"
      }
    },
    {
      "id": 1,
      "url": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/",
      "name": "MeasureSoftGram",
      "key": "fga-eps-mds-measuresoftgram",
      "organization": "http://127.0.0.1:8080/api/v1/organizations/1/",
      "description": "Sistema de geração de filmes aleatórios",
      "repositories": [
        "http://127.0.0.1:8080/api/v1/organizations/1/products/1/repositories/2/",
        "http://127.0.0.1:8080/api/v1/organizations/1/products/1/repositories/3/"
      ],
      "actions": {
        "create a new repository": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/repositories/",
        "get current goal": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/current/goal/",
        "get compare all goals": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/all/goal/",
        "get current pre-config": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/current/pre-config/",
        "get pre-config entity relationship tree": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/entity-relationship-tree/",
        "get all repositories latest sqcs": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/repositories-sqc-latest-values/",
        "get all repositories sqc historical values": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/repositories-sqc-historical-values/",
        "create a new goal": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/create/goal/",
        "create a new pre-config": "http://127.0.0.1:8080/api/v1/organizations/1/products/1/create/pre-config/"
      }
    }
  ]
}

export const bodyListRepositoriesResponse: ResponseListRepositories = {
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 4,
      "url": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/",
      "name": "2023-1-MeasureSoftGram-Action",
      "key": "fga-eps-mds-measuresoftgram2-2023-1-measuresoftgram-action",
      "description": "Action customizada do MeasureSoftGram",
      "product": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/",
      "latest_values": {
        "metrics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/latest-values/metrics/",
        "measures": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/latest-values/measures/",
        "subcharacteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/latest-values/subcharacteristics/",
        "characteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/latest-values/characteristics/",
        "sqc": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/latest-values/sqc/"
      },
      "historical_values": {
        "metrics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/historical-values/metrics/",
        "measures": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/historical-values/measures/",
        "subcharacteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/historical-values/subcharacteristics/",
        "characteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/historical-values/characteristics/",
        "sqc": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/historical-values/sqc/"
      },
      "actions": {
        "collect metric": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/collect/metrics/",
        "calculate measures": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/calculate/measures/",
        "calculate subcharacteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/calculate/subcharacteristics/",
        "calculate characteristics": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/calculate/characteristics/",
        "calculate sqc": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/calculate/sqc/",
        "import metrics from github": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/collectors/github/",
        "import metrics from SonarQube JSON": "http://127.0.0.1:8080/api/v1/organizations/1/products/2/repositories/4/collectors/sonarqube/"
      }
    }
  ]
}

export const bodySonarCloudResponseMetrics: MetricsResponseAPI = {
  "paging": {
    "pageIndex": 1,
    "pageSize": 500,
    "total": 8
  },
  "baseComponent": {
    "id": "AYiFLSWpxvbjbvvU3Hz1",
    "key": "fga-eps-mds_2023-1-MeasureSoftGram-Action",
    "name": "2023-1-MeasureSoftGram-Action",
    "qualifier": "TRK",
    "measures": [
      {
        "metric": "test_success_density",
        "value": "100.0",
        "bestValue": true
      }
    ]
  },
  "components": [
    {
      "id": "AYiK5-7_obxZ9Uuo9t98",
      "key": "fga-eps-mds_2023-1-MeasureSoftGram-Action:__tests__",
      "name": "__tests__",
      "qualifier": "DIR",
      "path": "__tests__",
      "measures": [
        {
          "metric": "test_execution_time",
          "value": "28"
        },
        {
          "metric": "test_failures",
          "value": "0",
          "bestValue": true
        },
        {
          "metric": "test_errors",
          "value": "0",
          "bestValue": true
        },
        {
          "metric": "security_rating",
          "value": "1.0",
          "bestValue": true
        },
        {
          "metric": "tests",
          "value": "11"
        },
        {
          "metric": "reliability_rating",
          "value": "1.0",
          "bestValue": true
        },
        {
          "metric": "test_success_density",
          "value": "100.0",
          "bestValue": true
        }
      ],
      "language": "ts"
    }]
}

export const githubMetricsAPIResponse: GithubMetricsResponse = {
  metrics: [
    {
      name: 'ci_feedback_time',
      value: 350,
      path: 'owner/repo'
    }
  ]
}

export const githubMetricsAPIThroughput: GithubMetricsResponse = {
  metrics: [
    {
      name: 'total_issues', 
      value: 2, 
      path: "testOwner/testRepo"
    }, 
    {
      name: 'resolved_issues', 
      value: 1, 
      path: "testOwner/testRepo"
    }
  ]
}

export const bodyListReleaseResponse: ResponseListReleases[] = [
  {
      "id": 1,
      "release_name": "Release 1",
      "start_at": "2023-06-19T00:00:00-03:00",
      "created_by": 2,
      "end_at": "2023-06-26T00:00:00-03:00"
  }
]

export const bodyCalculateMathModelRequest = {
  "sonarqube": 
      {
"paging": {
  "pageIndex": 1,
  "pageSize": 500,
  "total": 18
},
"baseComponent": {
  "id": "AZCF-CHfd2CtBNt0JSSN",
  "key": "fga-eps-mds_2024.1-MeasureSoftGram-Action",
  "name": "2024.1-MeasureSoftGram-Action",
  "qualifier": "TRK",
  "measures": [
    { "metric": "comment_lines_density", "value": "0.8", "bestValue": false },
    { "metric": "complexity", "value": "50" },
    { "metric": "coverage", "value": "93.0", "bestValue": false },
    { "metric": "duplicated_lines_density", "value": "0.0", "bestValue": true },
    { "metric": "files", "value": "6" },
    { "metric": "functions", "value": "28" },
    { "metric": "ncloc", "value": "498" },
    { "metric": "reliability_rating", "value": "1.0", "bestValue": true },
    { "metric": "security_rating", "value": "1.0", "bestValue": true },
    { "metric": "test_errors", "value": "0", "bestValue": true },
    { "metric": "test_execution_time", "value": "241" },
    { "metric": "test_failures", "value": "0", "bestValue": true },
    { "metric": "test_success_density", "value": "100.0", "bestValue": true },
    { "metric": "tests", "value": "33" }
  ]
},
"components": [
  {
    "id": "AZCh9dge5bzIcQ7rq-3c",
    "key": "fga-eps-mds_2024.1-MeasureSoftGram-Action:__tests__",
    "name": "__tests__",
    "qualifier": "DIR",
    "path": "__tests__",
    "measures": [
      { "metric": "reliability_rating", "value": "1.0", "bestValue": true },
      { "metric": "security_rating", "value": "1.0", "bestValue": true },
      { "metric": "test_errors", "value": "0", "bestValue": true },
      { "metric": "test_execution_time", "value": "241" },
      { "metric": "test_failures", "value": "0", "bestValue": true },
      { "metric": "test_success_density", "value": "100.0", "bestValue": true },
      { "metric": "tests", "value": "33" }
    ]
  },
  {
    "id": "AZCh9dge5bzIcQ7rq-3X",
    "key": "fga-eps-mds_2024.1-MeasureSoftGram-Action:__tests__/test-data/api-response.ts",
    "name": "api-response.ts",
    "qualifier": "UTS",
    "path": "__tests__/test-data/api-response.ts",
    "language": "ts",
    "measures": [
      { "metric": "reliability_rating", "value": "1.0", "bestValue": true },
      { "metric": "security_rating", "value": "1.0", "bestValue": true },
      { "metric": "duplicated_lines_density", "value": "0.0", "bestValue": true },
      { "metric": "test_failures", "value": "0", "bestValue": true },
      { "metric": "test_success_density", "value": "100.0", "bestValue": true },
      { "metric": "test_errors", "value": "0", "bestValue": true }
    ]
  }, 
      {
    "id": "AZCh9dge5bzIcQ7rq-3L",
    "key": "fga-eps-mds_2024.1-MeasureSoftGram-Action:src/github/github-comment.ts",
    "name": "github-comment.ts",
    "qualifier": "FIL",
    "path": "src/github/github-comment.ts",
    "language": "ts",
    "measures": [
      {
        "metric": "comment_lines_density",
        "value": "5.7",
        "bestValue": false
      },
      {
        "metric": "complexity",
        "value": "6"
      },
      {
        "metric": "coverage",
        "value": "100.0",
        "bestValue": true
      },
      {
        "metric": "files",
        "value": "1"
      },
      {
        "metric": "functions",
        "value": "4"
      },
      {
        "metric": "ncloc",
        "value": "50"
      },
      {
        "metric": "reliability_rating",
        "value": "1.0",
        "bestValue": true
      },
      {
        "metric": "security_rating",
        "value": "1.0",
        "bestValue": true
      },
      {
        "metric": "duplicated_lines_density",
        "value": "0.0",
        "bestValue": true
      },
      {
        "metric": "test_failures",
        "value": "0",
        "bestValue": true
      },
      {
        "metric": "test_success_density",
        "value": "100.0",
        "bestValue": true
      },
      {
        "metric": "test_errors",
        "value": "0",
        "bestValue": true
      }
    ]
  },
      {
    "id": "AZCh9dge5bzIcQ7rq-3L",
    "key": "fga-eps-mds_2024.1-MeasureSoftGram-Action:src/github/github-comment.ts",
    "name": "github-comment.ts",
    "qualifier": "FIL",
    "path": "src/github/github-comment.ts",
    "language": "ts",
    "measures": [
      {
        "metric": "comment_lines_density",
        "value": "5.7",
        "bestValue": false
      },
      {
        "metric": "complexity",
        "value": "6"
      },
      {
        "metric": "coverage",
        "value": "100.0",
        "bestValue": true
      },
      {
        "metric": "files",
        "value": "1"
      },
      {
        "metric": "functions",
        "value": "4"
      },
      {
        "metric": "ncloc",
        "value": "50"
      },
      {
        "metric": "reliability_rating",
        "value": "1.0",
        "bestValue": true
      },
      {
        "metric": "security_rating",
        "value": "1.0",
        "bestValue": true
      },
      {
        "metric": "duplicated_lines_density",
        "value": "0.0",
        "bestValue": true
      },
      {
        "metric": "test_failures",
        "value": "0",
        "bestValue": true
      },
      {
        "metric": "test_success_density",
        "value": "100.0",
        "bestValue": true
      },
      {
        "metric": "test_errors",
        "value": "0",
        "bestValue": true
      }
    ]
  }
]
}, 

  "github": {
      "metrics": [
          {"name": "total_issues", "value": 2}, 
          {"name": "resolved_issues", "value": 1}
      ]
  }
}