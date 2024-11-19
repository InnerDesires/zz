import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6' }}>
      <h1 style={{ marginBottom: '20px' }}>Welcome to the Home Page</h1>
      <p style={{ marginBottom: '20px' }}>This is a simple home page with a button below.</p>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '10px' }}>About Us</h2>
        <p>We are a company dedicated to providing the best services to our customers.</p>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '10px' }}>Our Services</h2>
        <ul>
          <li>Service 1: Description of service 1.</li>
          <li>Service 2: Description of service 2.</li>
          <li>Service 3: Description of service 3.</li>
        </ul>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '10px' }}>Contact Us</h2>
        <p>Feel free to reach out to us at contact@example.com.</p>
      </section>
      
      <img src="https://via.placeholder.com/150" alt="Placeholder Image" style={{ display: 'block', marginBottom: '20px' }} />
      
      <Button>Увійти</Button>
    </div>
  );
}
