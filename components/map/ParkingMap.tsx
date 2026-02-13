"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Zone } from "@/types";
import { toast } from "sonner";
import { useParkingStore } from "@/store/useParkingStore";
import L from "leaflet";
import { Button } from "../ui/button";

// Custom Marker Icon to fix default issues
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Red Plus / Current Location Marker Style
const currentLocationIcon = new L.DivIcon({
    html: `<div class="relative flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
            <span class="w-2 h-2 bg-white rounded-full"></span>
           </div>`,
    className: "custom-div-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// Controller component moved outside to prevent re-definitions
// Controller component using ref slightly adjusted to avoid state updates during render
function MapController({ 
    focusedLocation, 
    userLocation 
}: { 
    focusedLocation?: [number, number] | null,
    userLocation: [number, number] | null
}) {
    const map = useMap();
    // Use ref to track if we've flown to user to avoid re-renders
    const hasFlownToUserRef = useRef(false);

    useEffect(() => {
        if (focusedLocation) {
            map.flyTo(focusedLocation, 16, { animate: true, duration: 1.5 });
        } else if (userLocation && !hasFlownToUserRef.current) {
            // Initial fly to user only once
            // Check if map is basically at default (this is a heuristic)
            const center = map.getCenter();
            if (Math.abs(center.lat - 40.7128) < 0.1 && Math.abs(center.lng + 74.0060) < 0.1) {
                 map.flyTo(userLocation, 14);
                 hasFlownToUserRef.current = true;
            }
        }
    }, [userLocation, focusedLocation, map]);

    return null;
}

export default function ParkingMap({ 
    onZoneSelect,
    focusedLocation 
}: { 
    onZoneSelect: (zoneId: string) => void,
    focusedLocation?: [number, number] | null
}) {
  const { zones } = useParkingStore();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="h-[60vh] w-full rounded-xl overflow-hidden shadow-lg border relative z-0 group">
      <MapContainer 
        center={[40.7128, -74.0060]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController focusedLocation={focusedLocation} userLocation={userLocation} />

        {/* User Location Marker - Now Interactive */}
        {userLocation && (
             <Marker position={userLocation} icon={currentLocationIcon} eventHandlers={{
                 click: () => {
                     toast.success("You are here at your current location");
                 }
             }}>
                 <Popup>You are here</Popup>
             </Marker>
        )}

        {/* Zones */}
        {zones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.location.lat, zone.location.lng]}
            radius={zone.landSize > 2000 ? 150 : 80} 
            pathOptions={{ 
                color: zone.availableSlots > 0 ? '#22c55e' : '#ef4444', 
                fillColor: zone.availableSlots > 0 ? '#22c55e' : '#ef4444', 
                fillOpacity: 0.5,
                weight: 2
            }}
            eventHandlers={{
                click: () => onZoneSelect(zone.id)
            }}
          >
            <Popup>
                <div className="p-1 min-w-[150px]">
                    <h3 className="font-bold text-base">{zone.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Available: <span className="font-semibold text-green-600">{zone.availableSlots}</span></p>
                    {/* <Button size="sm" className="w-full" onClick={() => onZoneSelect(zone.id)}>
                        View Details
                    </Button> */}
                </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      
      {!userLocation && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow text-xs font-medium flex items-center">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            Locating...
        </div>
      )}
    </div>
  );
}
