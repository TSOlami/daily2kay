declare module 'ruhend-scraper' {
  interface MediaResponse {
    status: boolean;
    data: Array<{
      url: string;
      resolution?: string;
      thumbnail?: string;
    }>;
  }

  export function igdl(url: string): Promise<MediaResponse>;
  export function fbdl(url: string): Promise<MediaResponse>;
} 