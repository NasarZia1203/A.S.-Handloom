import FabricCarousel from './FabricCarousel';

const fabrics = [
  { img: '/assets/fabric-swiper-carousel-images/fabric1.webp', code: 'FAB3001', desc: 'Light Blue Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric2.webp', code: 'FAB3002', desc: 'Grey Pure Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric3.webp', code: 'FAB3003', desc: 'Milk White Linen Handloom Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric4.webp', code: 'FAB3004', desc: 'Peach Linen-Cotton Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric5.webp', code: 'FAB3005', desc: 'Yellow Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric6.webp', code: 'FAB3006', desc: 'Chocolate Brown Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric7.webp', code: 'FAB3007', desc: 'Premium Pink Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric8.webp', code: 'FAB3008', desc: 'Lime Handloom Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric9.webp', code: 'FAB3009', desc: 'Orange Linen-Cotton Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric10.webp', code: 'FAB3010', desc: 'Light Yellow Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric11.webp', code: 'FAB3011', desc: 'Light Purple Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric12.webp', code: 'FAB3012', desc: 'Premium Moss Green Linen-Cotton Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric13.webp', code: 'FAB3013', desc: 'Premium Jet Black Handloom Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric14.webp', code: 'FAB3014', desc: 'Maroon Linen-Cotton Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric15.webp', code: 'FAB3015', desc: 'Premium Sky Blue Linen Fabric' },
  { img: '/assets/fabric-swiper-carousel-images/fabric16.webp', code: 'FAB3016', desc: 'Dark Peach Linen Fabric' }
];

const FabricCollection: React.FC = () => (
  <section id="fabrics" className="section fabrics-collections ">
    <div className="container-image">
      <h2 className="section-title-fabric">Fabric Collection</h2>
      <div className="collection-carousel">
        <FabricCarousel
          items={fabrics}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={1200}
        />
      </div>
    </div>
  </section>
);

export default FabricCollection;
