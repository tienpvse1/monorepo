export const getHistory = (url: string, method: string) => {
  const parsedUrl = url.replace('/api/v1/', '');
  const listItems = parsedUrl.split('/');
  const target = listItems[0].replace('-', ' ');
  if (method === 'POST') {
    return `created a ${target}`;
  }
  if (method === 'PUT') {
    return `changed a ${target}`;
  }
  if (method === 'PATCH') {
    return `updated a ${target}`;
  }
  if (method === 'DELETE') {
    return `deleted a ${target}`;
  }
};
