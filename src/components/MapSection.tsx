import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Clock, Zap, ArrowRight } from 'lucide-react';

interface WastePoint {
  id: string;
  name: string;
  type: 'collection' | 'facility' | 'recycling';
  distance: number;
  capacity: number;
  energyOutput?: number;
  status: 'active' | 'full' | 'maintenance';
  coordinates: [number, number];
}

const MapSection = () => {
  const [selectedPoint, setSelectedPoint] = useState<WastePoint | null>(null);
  
  const wastePoints: WastePoint[] = [
    {
      id: '1',
      name: 'Central Waste-to-Energy Facility',
      type: 'facility',
      distance: 2.3,
      capacity: 500,
      energyOutput: 1500,
      status: 'active',
      coordinates: [40.7128, -74.0060]
    },
    {
      id: '2',
      name: 'North District Collection Point',
      type: 'collection',
      distance: 0.8,
      capacity: 50,
      status: 'active',
      coordinates: [40.7589, -73.9851]
    },
    {
      id: '3',
      name: 'Riverside Recycling Center',
      type: 'recycling',
      distance: 3.2,
      capacity: 200,
      status: 'full',
      coordinates: [40.6892, -74.0445]
    }
  ];

  const nearestPoint = wastePoints.reduce((nearest, point) => 
    point.distance < nearest.distance ? point : nearest
  );

  return (
    <section id="map" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="hero-text">Smart</span> Collection Network
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover optimized waste collection points and energy facilities near you
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <Card className="p-6 shadow-eco">
                <div className="relative h-96 bg-gradient-to-br from-muted/50 to-secondary/30 rounded-lg overflow-hidden">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground">
                        Mapbox/Google Maps integration would display here
                      </p>
                    </div>
                  </div>

                  {/* Mock Map Points */}
                  {wastePoints.map((point, index) => (
                    <div
                      key={point.id}
                      className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 transition-all duration-300 hover:scale-150 hover:z-10 ${
                        point.type === 'facility' ? 'bg-primary hover:shadow-lg hover:shadow-primary/50' :
                        point.type === 'collection' ? 'bg-accent hover:shadow-lg hover:shadow-accent/50' : 'bg-energy hover:shadow-lg hover:shadow-energy/50'
                      } ${point.id === nearestPoint.id ? 'ring-4 ring-primary/30 animate-pulse' : ''} ${selectedPoint?.id === point.id ? 'ring-2 ring-white scale-125' : ''}`}
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 15}%`
                      }}
                      onClick={() => setSelectedPoint(point)}
                    />
                  ))}
                </div>

                {/* Map Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span>Energy Facilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span>Collection Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-energy rounded-full" />
                      <span>Recycling Centers</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:scale-105 active:scale-95 transition-all duration-200"
                    onClick={() => {
                      console.log('Centering map on user location');
                      // Would trigger map centering functionality
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Center on Location
                  </Button>
                </div>
              </Card>
            </div>

            {/* Nearest Point Info */}
            <div className="space-y-6">
              {/* Nearest Point Card */}
              <Card className="p-6 shadow-glow border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Nearest Point</h3>
                    <p className="text-sm text-muted-foreground">{nearestPoint.distance}km away</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">{nearestPoint.name}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>5 min walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span>{nearestPoint.capacity}T capacity</span>
                    </div>
                  </div>
                  
                  {nearestPoint.energyOutput && (
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <p className="text-sm font-medium text-accent-foreground">
                        Generates {nearestPoint.energyOutput} kWh/day
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  variant="energy" 
                  className="w-full mt-4 hover:scale-105 active:scale-95 transition-all duration-300 group"
                  onClick={() => {
                    console.log('Getting directions to:', nearestPoint.name);
                    // Would open directions in map app
                  }}
                >
                  <Navigation className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Get Directions
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              {/* All Points List */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">All Collection Points</h3>
                <div className="space-y-3">
                  {wastePoints.map((point) => (
                    <div
                      key={point.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-md ${
                        selectedPoint?.id === point.id 
                          ? 'border-primary bg-primary/5 shadow-glow' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPoint(point)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{point.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {point.distance}km • {point.capacity}T capacity
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          point.status === 'active' ? 'bg-success' :
                          point.status === 'full' ? 'bg-warning' : 'bg-destructive'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;