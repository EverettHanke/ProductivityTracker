export interface BulletPoint {
    text: string;
    completed: boolean;
  }
  
  export interface Task {
    title: string;
    bulletPoints: BulletPoint[];
    links: string[];
  }