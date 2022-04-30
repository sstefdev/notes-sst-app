import handler from "util/handler";
import dynamoDb from "util/dynamodb";

export const main = handler(async (event) => {
  const { attachment, content } = JSON.parse(event.body);
  const { identityId } = event.requestContext.authorizer.iam.cognitoIdentity;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: identityId,
      noteId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": attachment || null,
      ":content": content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
