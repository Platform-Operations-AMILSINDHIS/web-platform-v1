export interface BlogPost {
  title: string;
  author: string;
  date: Date;
  excerpt: string;
  tags?: (string | null)[] | null;
  image: string;
}
