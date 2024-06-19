export async function handler(event, context) {
  const myURL = process.env.myURL;
  return {
    statusCode: 200,
    body: JSON.stringify({ myURL })
  };
}
