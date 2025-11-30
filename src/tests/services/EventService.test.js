import {
  getAllEvents,
  filterEvents,
  searchEvents
} from '../../services/EventService';

describe('EventService', () => {
  test('deduplicates events with the same title and start time', () => {
    const events = getAllEvents();
    const duplicateTitles = events.filter((event) => event.title === 'Panther Welcome Bash');
    expect(events.length).toBe(11);
    expect(duplicateTitles.length).toBe(1);
  });

  test('filters by category and cost type', () => {
    const filtered = filterEvents({ category: 'STEM', costType: 'Free' });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((event) => event.category === 'STEM')).toBe(true);
    expect(filtered.every((event) => event.costType === 'Free')).toBe(true);
  });

  test('searches across title and descriptions', () => {
    const results = searchEvents('resume');
    expect(results.length).toBe(1);
    expect(results[0].title).toMatch(/Resume Lab/i);
  });
});
