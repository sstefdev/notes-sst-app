import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const { pathParameters } = event;
  const { identityId } = event.requestContext.authorizer.iam.cognitoIdentity;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: identityId,
      noteId: pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
