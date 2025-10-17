import SareeCarousel from './SareeCarousel';

const sarees = [
  { img: '/assets/saree-swiper-carousel-images/saree1.webp', code: 'SAR1001', desc: 'White Elegant Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree2.webp', code: 'SAR1002', desc: 'Mint Green Handloom Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree3.webp', code: 'SAR1003', desc: 'Pastel Pink Soft Cotton Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree4.webp', code: 'SAR1004', desc: 'Blue Cotton Handloom Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree5.webp', code: 'SAR1005', desc: 'Pink Banarasi Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree6.webp', code: 'SAR1006', desc: 'Yellow Linen Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree7.webp', code: 'SAR1007', desc: 'Red Bridal Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree8.webp', code: 'SAR1008', desc: 'Purple Designer Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree9.webp', code: 'SAR1009', desc: 'Beige Classic Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree10.webp', code: 'SAR1010', desc: 'Green Festive Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree11.webp', code: 'SAR1011', desc: 'Ivory Chanderi Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree12.webp', code: 'SAR1012', desc: 'Golden Zari Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree13.webp', code: 'SAR1013', desc: 'Peach Soft Cotton Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree14.webp', code: 'SAR1014', desc: 'Grey Linen Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree15.webp', code: 'SAR1015', desc: 'Royal Blue Silk Saree' },
  { img: '/assets/saree-swiper-carousel-images/saree16.webp', code: 'SAR1016', desc: 'Orange Silk Wedding Saree' },
];

const SareeCollection: React.FC = () => (
  <section id="sarees" className="section collections">
    <div className="container-image">
      <h2 className="section-title-saree">Saree Collection</h2>
      <div className="collection-carousel">
        <SareeCarousel
          items={sarees}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={600}
        />
      </div>
    </div>
  </section>
);

export default SareeCollection;
