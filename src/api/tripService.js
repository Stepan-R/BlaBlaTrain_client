import axios from 'axios';

const API_URL = 'http://localhost:3005/api/trips';
const token = JSON.parse(localStorage.getItem('user')).token;

const getAuthHeaders = () => {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchAllTrips = async () => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }
  return response.json();
};

export const deleteTrip = async (id) => {
  const headers = getAuthHeaders();
  await axios.delete(`${API_URL}/${id}`, { headers });
};

export const updateTrip = async (id, formData) => {
  const headers = getAuthHeaders();
  const response = await axios.patch(`${API_URL}/${id}`, formData, { headers });
  return response.data;
};

export const submitTrip = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    startTime: formData.startTime,
    finishTime: formData.finishTime,
    travelFrom: formData.travelFrom,
    travelTo: formData.travelTo,
    startDate: formData.startDate,
    finishDate: formData.finishDate,
    travelTime: formData.travelTime,
    avaiableSits: formData.availableSeats,
    price: formData.price
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:3005/api/trips", requestOptions);
  
  if (!response.ok) {
    throw new Error('Failed to submit trip');
  }

  return response.json();
};