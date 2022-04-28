import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      // Cors enabled by default
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_PUB_KEY: process.env.STRIPE_PUB_KEY,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
      routes: {
        "GET  /notes": "src/list.main",
        "GET  /notes/{id}": "src/get.main",
        "POST  /notes": "src/create.main",
        "POST  /billing": "src/billing.main",
        "PUT  /notes/{id}": "src/update.main",
        "DELETE  /notes/{id}": "src/delete.main",
      },
    });

    this.api.attachPermissions([table]);
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
