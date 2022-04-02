export const getLayOutClass = (layout: string) => {
  if (layout === 'list') return 'list';
  return 'grid';
};

export interface AZone {
  zone: string;
  temperature: number;
  time: string;
  name?: string;
  count?: number;
}
