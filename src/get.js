import handler from "./util/handler";
import dynamoDb from "util/dynamodb";

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

  const { Item } = await dynamoDb.get(params);

  if (!Item) {
    throw new Error("Item not found.");
  }

  return Item;
});
