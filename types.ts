
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Core EEE' | 'Programming' | 'Tools';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
