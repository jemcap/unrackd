export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Workout {
  id: number;
  type: string;
  date: string;
  exercises: Exercise[];
  duration: number;
}

export interface PowerliftingStats {
  yearsOfExperience: number;
  weightClass: string;
  ageCategory: string;
  meetsCompleted: number;
}

export interface PersonalBests {
  squat: number;
  bench: number;
  deadlift: number;
  total: number;
}

export interface Meet {
  id: number;
  name: string;
  date: string;
  location: string;
  federation?: string;
  daysUntil?: number;
  squat?: {
    attempt1: number;
    attempt2: number;
    attempt3: number;
    best: number;
  };
  bench?: {
    attempt1: number;
    attempt2: number;
    attempt3: number;
    best: number;
  };
  deadlift?: {
    attempt1: number;
    attempt2: number;
    attempt3: number;
    best: number;
  };
  total?: number;
  weightCategory?: string;
  placing?: string;
}

export interface PersonalStats {
  workouts: number;
  followers: number;
  following: number;
}
