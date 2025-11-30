const matchesText = (event, text) => {
  if (!text) return true;
  const query = text.toLowerCase();
  return (
    event.title.toLowerCase().includes(query) ||
    event.shortDescription.toLowerCase().includes(query) ||
    event.longDescription.toLowerCase().includes(query)
  );
};

export default (events, { text, category, costType }) => {
  return events
    .filter((event) => {
      const textMatch = matchesText(event, text);
      const categoryMatch = category === 'All' || event.category === category;
      const costMatch = costType === 'All' || event.costType === costType;
      return textMatch && categoryMatch && costMatch;
    })
    .sort(
      (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
};
