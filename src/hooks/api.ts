
import { useState, useEffect } from "react";

// Types
type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type ServiceRequest = {
  id: string;
  flatNumber: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  requestedBy: string;
  handled: boolean;
};

type RentalListing = {
  id: string;
  flatNumber: string;
  flatCode: string;
  expectedRent: number;
  contactNumber: string;
  listedBy: string;
  handled: boolean;
};

type RentalQuery = {
  id: string;
  name: string;
  size: string;
  facing: string;
  budget: string;
  type: string;
  contactEmail: string;
  requestedBy: string;
  handled: boolean;
};

type FeedbackItem = {
  id: string;
  flatNumber: string;
  feedbackText: string;
  submittedBy: string;
  timestamp: string;
};

// Mock data storage
let notices: Notice[] = [
  {
    id: "notice-1",
    title: "Annual General Meeting",
    content: "The Annual General Meeting (AGM) will be held on June 15th at 6:00 PM in the society hall. All residents are requested to attend.",
    date: new Date("2023-06-01").toISOString()
  },
  {
    id: "notice-2",
    title: "Water Supply Interruption",
    content: "Due to maintenance work, there will be no water supply on Saturday (June 10th) from 10:00 AM to 2:00 PM. Please store water accordingly.",
    date: new Date("2023-06-05").toISOString()
  }
];

let serviceRequests: ServiceRequest[] = [];
let rentalListings: RentalListing[] = [];
let rentalQueries: RentalQuery[] = [];
let feedback: FeedbackItem[] = [];

// Local storage helpers
const saveToLocalStorage = () => {
  localStorage.setItem("ava_notices", JSON.stringify(notices));
  localStorage.setItem("ava_service_requests", JSON.stringify(serviceRequests));
  localStorage.setItem("ava_rental_listings", JSON.stringify(rentalListings));
  localStorage.setItem("ava_rental_queries", JSON.stringify(rentalQueries));
  localStorage.setItem("ava_feedback", JSON.stringify(feedback));
};

const loadFromLocalStorage = () => {
  const storedNotices = localStorage.getItem("ava_notices");
  const storedServiceRequests = localStorage.getItem("ava_service_requests");
  const storedRentalListings = localStorage.getItem("ava_rental_listings");
  const storedRentalQueries = localStorage.getItem("ava_rental_queries");
  const storedFeedback = localStorage.getItem("ava_feedback");
  
  if (storedNotices) notices = JSON.parse(storedNotices);
  if (storedServiceRequests) serviceRequests = JSON.parse(storedServiceRequests);
  if (storedRentalListings) rentalListings = JSON.parse(storedRentalListings);
  if (storedRentalQueries) rentalQueries = JSON.parse(storedRentalQueries);
  if (storedFeedback) feedback = JSON.parse(storedFeedback);
};

// Initialize data from localStorage if available
loadFromLocalStorage();

// Notice Hooks
export const useNotices = () => {
  const [data, setData] = useState<Notice[]>(notices);
  
  useEffect(() => {
    // Sort notices by date (newest first)
    const sortedNotices = [...notices].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setData(sortedNotices);
  }, []);
  
  return { notices: data };
};

export const useAddNotice = () => {
  const addNotice = async (noticeData: Omit<Notice, "id">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      ...noticeData
    };
    
    notices = [newNotice, ...notices];
    saveToLocalStorage();
    return newNotice;
  };
  
  return addNotice;
};

// Service Request Hooks
export const useSubmitServiceRequest = () => {
  const submitRequest = async (requestData: Omit<ServiceRequest, "id" | "handled">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRequest: ServiceRequest = {
      id: `service-${Date.now()}`,
      ...requestData,
      handled: false
    };
    
    serviceRequests = [newRequest, ...serviceRequests];
    saveToLocalStorage();
    return newRequest;
  };
  
  return submitRequest;
};

export const useServiceRequests = () => {
  const [data, setData] = useState<ServiceRequest[]>(serviceRequests);
  
  useEffect(() => {
    // Sort service requests by date (newest first)
    const sortedRequests = [...serviceRequests].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setData(sortedRequests);
  }, []);
  
  return { serviceRequests: data };
};

export const useMarkServiceRequestHandled = () => {
  const markHandled = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    serviceRequests = serviceRequests.map(request => 
      request.id === id ? { ...request, handled: true } : request
    );
    
    saveToLocalStorage();
  };
  
  return markHandled;
};

// Rental Hooks
export const useSubmitRentalListing = () => {
  const submitListing = async (listingData: Omit<RentalListing, "id" | "handled">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newListing: RentalListing = {
      id: `listing-${Date.now()}`,
      ...listingData,
      handled: false
    };
    
    rentalListings = [newListing, ...rentalListings];
    saveToLocalStorage();
    return newListing;
  };
  
  return submitListing;
};

export const useSubmitRentalQuery = () => {
  const submitQuery = async (queryData: Omit<RentalQuery, "id" | "handled">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newQuery: RentalQuery = {
      id: `query-${Date.now()}`,
      ...queryData,
      handled: false
    };
    
    rentalQueries = [newQuery, ...rentalQueries];
    saveToLocalStorage();
    return newQuery;
  };
  
  return submitQuery;
};

export const useRentalRequests = () => {
  const [listings, setListings] = useState<RentalListing[]>(rentalListings);
  const [queries, setQueries] = useState<RentalQuery[]>(rentalQueries);
  
  useEffect(() => {
    setListings([...rentalListings]);
    setQueries([...rentalQueries]);
  }, []);
  
  return { rentalListings: listings, rentalQueries: queries };
};

export const useMarkRentalRequestHandled = () => {
  const markHandled = async (id: string, type: 'query' | 'listing') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (type === 'query') {
      rentalQueries = rentalQueries.map(query => 
        query.id === id ? { ...query, handled: true } : query
      );
    } else {
      rentalListings = rentalListings.map(listing => 
        listing.id === id ? { ...listing, handled: true } : listing
      );
    }
    
    saveToLocalStorage();
  };
  
  return markHandled;
};

// Feedback Hooks
export const useSubmitFeedback = () => {
  const submitFeedback = async (feedbackData: Omit<FeedbackItem, "id">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newFeedback: FeedbackItem = {
      id: `feedback-${Date.now()}`,
      ...feedbackData
    };
    
    feedback = [newFeedback, ...feedback];
    saveToLocalStorage();
    return newFeedback;
  };
  
  return submitFeedback;
};

export const useFeedback = () => {
  const [data, setData] = useState<FeedbackItem[]>(feedback);
  
  useEffect(() => {
    // Sort feedback by timestamp (newest first)
    const sortedFeedback = [...feedback].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setData(sortedFeedback);
  }, []);
  
  return { feedback: data };
};
