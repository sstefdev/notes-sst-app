import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const { identityId } = event.requestContext.authorizer.iam.cognitoIdentity;

  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": identityId,
    },
  };

  const { Items } = await dynamoDb.query(params);

  return Items;
});
