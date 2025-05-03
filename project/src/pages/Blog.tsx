// src/pages/Blog.tsx
import { Link } from 'react-router-dom';
import '../styles/blog.css'; // Adjust the path if needed


const Blog = () => {
  return (
    <div className="blog-list">
      <h1>Our Blog</h1>
      <ul>
        <li><Link to="/blog/how-to-convert-images-to-pdf">How to Convert Images to PDF in Just a Few Steps</Link></li>
        {/* Add more blog post links here */}
      </ul>
    </div>
  );
}

export default Blog;
