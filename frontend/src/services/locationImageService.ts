// Location-Aware & Role-Aware Background Image Selection Engine
// Returns curated background imagery based on role, location, and weather condition.

export interface LocationVisualConfig {
  imageUrl: string;
  locationLabel: string;
  photographerCredit?: string;
}

// Curated high-resolution atmospheric imagery mapped by role and region
const HERO_VISUALS: Record<string, string> = {
  // Citizen / Urban Cityscape Images
  'citizen_pune': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80',
  'citizen_mumbai': 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1400&q=80',
  'citizen_delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
  'citizen_bengaluru': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=80',
  'citizen_default': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',

  // Farmer / Agricultural Farmland Images
  'farmer_nashik': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
  'farmer_punjab': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80',
  'farmer_default': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',

  // Fisherman / Marine Ocean Images
  'fisherman_kochi': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
  'fisherman_mumbai': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  'fisherman_default': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80',

  // Disaster Manager / Storm & High Risk Images
  'disaster_chennai': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1400&q=80',
  'disaster_default': 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1400&q=80',

  // Urban Planner / Infrastructure Images
  'urban_planner_bengaluru': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  'urban_planner_default': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',

  // Researcher / Weather Observatory & Radar Dish Images
  'researcher_delhi': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  'researcher_default': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',

  // Aviation / Airport Runway Images
  'aviation_mumbai': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80',
  'aviation_default': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80',
};

export const getHeroBackgroundImage = (role: string, city: string): string => {
  const roleKey = (role || 'citizen').toLowerCase().trim();
  const cityKey = (city || '').toLowerCase().trim();

  // Try exact role + city match
  const exactKey = `${roleKey}_${cityKey}`;
  if (HERO_VISUALS[exactKey]) {
    return HERO_VISUALS[exactKey];
  }

  // Try role fallback
  const roleFallbackKey = `${roleKey}_default`;
  if (HERO_VISUALS[roleFallbackKey]) {
    return HERO_VISUALS[roleFallbackKey];
  }

  // Universal Fallback
  return HERO_VISUALS.citizen_default;
};
