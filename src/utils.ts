interface ZoomdataConfig {
  host: string;
  path: string;
  port: number;
  secure: boolean;
}

export function getZoomdataUrl({ host, path, port, secure }: ZoomdataConfig) {
  const protocol = secure ? 'https:' : 'http:';
  const portStr = port === 443 || port === 80 ? '' : `:${port}`;

  return `${protocol}//${host}${portStr}${path}`;
}
