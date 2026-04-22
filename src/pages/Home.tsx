import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-muted to-sage/10">
        <div className="container-custom text-center py-20">
          <Badge variant="outline" className="mb-6 border-sage text-sage">
            Premium Organic Collection
          </Badge>
          
          <h1 className="type-hero text-foreground mb-6">
            The Pantry of<br />the Earth
          </h1>
          
          <p className="type-tagline text-muted-foreground max-w-2xl mx-auto mb-8">
            Sourced with intention, delivered with reverence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sage-dark hover:bg-sage text-white">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Our Story
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-sage/10 rounded-full blur-3xl"></div>
        </div>
      </section>
      
      {/* Product Categories */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="type-overline text-sage">Featured Collections</span>
            <h2 className="type-section-title text-foreground mt-4">
              Curated with Care
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Wild Honey',
                description: 'Pure, unprocessed honey from pristine forests',
                image: '/img/honey-blackforest-front.jpg',
                badge: 'Bestseller',
              },
              {
                title: 'Premium Spices',
                description: 'Aromatic spices sourced from organic farms',
                image: '/img/ceylon-cinnamon-c5-grade.jpg',
                badge: 'New',
              },
              {
                title: 'Gift Collections',
                description: 'Thoughtfully curated gift boxes',
                image: '/img/gift-box-honeypack.jpg',
                badge: 'Limited',
              },
            ].map((product, index) => (
              <Card 
                key={index}
                className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="type-card-title text-foreground">{product.title}</h3>
                    <Badge className="bg-terracotta text-white">{product.badge}</Badge>
                  </div>
                  <p className="type-body text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <Button variant="ghost" className="w-full justify-between group">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Story Teaser */}
      <section className="py-20 bg-sage-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="type-overline text-white/80">Our Philosophy</span>
              <h2 className="type-display-lg text-white mt-4 mb-6">
                From Nature,<br />For Nature
              </h2>
              <p className="type-body-lg text-white/90 mb-8">
                Every product in our collection tells a story of sustainable sourcing, 
                traditional craftsmanship, and deep respect for the earth.
              </p>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sage-dark">
                Read Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src="/img/story-harvest-hands.png"
                alt="Harvesting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
