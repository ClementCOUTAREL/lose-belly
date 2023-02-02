export interface RecipeResponseData {
  offset: number;
  number: number;
  results: RecipeDetails[];
  totalResults: number;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface RecipeExtendedDetails extends RecipeDetails {
  servings: number;
  readyInMinutes: number;
  licence: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: Instructions[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  intructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  instructions: string;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  summary: string;
  winePairing: WinePairing[];
  detailledInstructions?: DetailedSteps[];
  nutrition?: NutritionDetails;
}

export interface NutritionDetails {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Flavonoid[];
  ingredients: IngredientNutrition[];
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}
export interface IngredientNutrition {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}

export interface Flavonoid {
  name: string;
  amount: number;
  unit: string;
}

export interface Property {
  name: string;
  amount: number;
  unit: string;
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface DetailedSteps {
  name: string;
  steps: DetailedStep[];
}

export interface DetailedStep {
  equipment: {
    id: number;
    image: string;
    name: string;
    temperature: {
      number: number;
      unit: string;
    };
  };
  ingredients: {
    id: string;
    image: string;
    name: string;
  }[];
  number: number;
  step: string;
}

export interface Instructions {
  name: string;
  steps: Step[];
}
export interface Step {
  number: number;
  step: string;
}

export interface Ingredient {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: {
    metric: Measures;
    us: Measures;
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface Measures {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Wine {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: Wine[];
}
