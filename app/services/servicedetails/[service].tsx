import React from "react";
import { useLocalSearchParams } from "expo-router";
import ServiceDetails from "../../../Components/Bookings/ServiceDetails/ServiceDetails";

const ServiceDetailsPage = () => {
  const { service } = useLocalSearchParams();
  const serviceId = Array.isArray(service) ? service[0] : service || "";
  return <ServiceDetails serviceId={serviceId} />;
};
export default ServiceDetailsPage;
