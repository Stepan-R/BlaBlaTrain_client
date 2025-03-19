const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const handlefilter = (trips, action) => {
  let newSortedTrips;

  switch (action) {
    case 'departure':
      newSortedTrips = [...trips].sort((a, b) => {
        return convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime);
      });
      break;
    case 'arriving':
      newSortedTrips = [...trips].sort((a, b) => {
        return convertTimeToMinutes(a.finishTime) - convertTimeToMinutes(b.finishTime);
      });
      break;
    case 'traveltime':
      newSortedTrips = [...trips].sort((a, b) => a.travelTime.localeCompare(b.travelTime));
      break;
    case 'price':
      newSortedTrips = [...trips].sort((a, b) => a.price - b.price);
      break;
    default:
      return [...trips];
  }

  return newSortedTrips;
}

export const filterTrips = (trips, search) => {
  return trips.filter(trip => {
    const fromMatch = trip.travelFrom.toLowerCase().includes(search.toLowerCase());
    const toMatch = trip.travelTo.toLowerCase().includes(search.toLowerCase());
    return fromMatch || toMatch;
  });
};