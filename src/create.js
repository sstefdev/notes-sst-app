import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const { content, attachment } = JSON.parse(event.body);
  const { identityId } = event.requestContext.authorizer.iam.cognitoIdentity;

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: identityId,
      noteId: uuid.v1(),
      content,
      attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
