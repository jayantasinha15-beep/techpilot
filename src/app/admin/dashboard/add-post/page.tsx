"use client";

import "./add-post.css";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/RichTextEditor";
import { useEffect } from "react";
import MediaPicker from "@/components/MediaPicker";
export default function AddPost() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("AI");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
const [featuredImageUrl, setFeaturedImageUrl] = useState("");

const [bannerImage, setBannerImage] = useState<File | null>(null);
const [bannerImageUrl, setBannerImageUrl] = useState("");
const [categories, setCategories] = useState<any[]>([]);
const [status, setStatus] = useState("Published");
const [keywords, setKeywords] = useState("");
const [canonicalUrl, setCanonicalUrl] = useState("");
const [ogImage, setOgImage] = useState("");
useEffect(() => {
  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setCategories(data || []);
  }

  loadCategories();
}, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitle = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };
  const uploadImage = async (file: File) => {
  const supabase = createClient();

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    let finalFeaturedImageUrl = featuredImageUrl;
let finalBannerImageUrl = bannerImageUrl;

try {
  if (featuredImage) {
    finalFeaturedImageUrl =
      await uploadImage(featuredImage);
  }

  if (bannerImage) {
    finalBannerImageUrl =
      await uploadImage(bannerImage);
  }
} catch (err) {
  setLoading(false);
  setMessage("Image upload failed!");
  return;
}

    const { error } = await supabase
      .from("posts")
      .insert([
  {
    title,
    slug,
    category,
    description,
    content,
    featured_image: finalFeaturedImageUrl,
    banner: finalBannerImageUrl,

    seo_title: seoTitle,
    meta_description: metaDescription,
    keywords,
    canonical_url: canonicalUrl,
    og_image: ogImage,
    author: "Jayanta Singha",
    reading_time: "5 min read",
    featured: true,
    status,
  },
]);

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("✅ Article Published Successfully!");

    setTitle("");
    setSlug("");
    setCategory("AI");
    setDescription("");
    setContent("");
    setSeoTitle("");
    setMetaDescription("");
    setKeywords("");
    setCanonicalUrl("");
    setOgImage("");
    setFeaturedImage(null);
setFeaturedImageUrl("");

setBannerImage(null);
setBannerImageUrl("");
  };

  return (
    <main className="add-post">

      <h1>Add New Article</h1>

      {message && (
        <p
          style={{
            color: "limegreen",
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {message}
        </p>
      )}

      <form
        className="post-form"
        onSubmit={handleSubmit}
      >

        <label>Article Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            handleTitle(e.target.value)
          }
          placeholder="Enter title..."
          required
        />

        <label>Slug</label>

        <input
          type="text"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          required
        />

        <label>Category</label>

        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  {categories.map((cat) => (
  <option key={cat.id} value={cat.name}>
    {cat.name}
  </option>
))}
  
</select>

<label>Status</label>

<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="Published">Published</option>
  <option value="Draft">Draft</option>
</select>

        <label>Short Description</label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Short summary..."
        />

        <label>Article Content</label>

        <RichTextEditor
  value={content}
  onChange={setContent}
/>

        <label>Featured Image</label>
        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setFeaturedImage(e.target.files[0]);
      setFeaturedImageUrl("");
    }
  }}
/>

        
<MediaPicker
  label="Or choose Featured Image from Media Library"
  value={featuredImageUrl}
  onSelect={(url) => {
    setFeaturedImageUrl(url);
    setFeaturedImage(null);
  }}
/>

        <label>Banner Image</label>
        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setBannerImage(e.target.files[0]);
      setBannerImageUrl("");
    }
  }}
/>

        
<MediaPicker
  label="Or choose Banner Image from Media Library"
  value={bannerImageUrl}
  onSelect={(url) => {
    setBannerImageUrl(url);
    setBannerImage(null);
  }}
/>

        <label>SEO Title</label>

        <input
          type="text"
          value={seoTitle}
          onChange={(e) =>
            setSeoTitle(e.target.value)
          }
          placeholder="SEO Title"
        />

        <label>Meta Description</label>

        <textarea
          rows={4}
          value={metaDescription}
          onChange={(e) =>
            setMetaDescription(
              e.target.value
            )
          }
          placeholder="Meta description..."
        />
        <label>Keywords</label>

<input
  type="text"
  value={keywords}
  onChange={(e) => setKeywords(e.target.value)}
  placeholder="AI, ChatGPT, Gemini, Claude"
/>

<label>Canonical URL</label>

<input
  type="text"
  value={canonicalUrl}
  onChange={(e) => setCanonicalUrl(e.target.value)}
  placeholder="https://techpilot.in/blog/post-slug"
/>

<label>Open Graph Image URL</label>

<input
  type="text"
  value={ogImage}
  onChange={(e) => setOgImage(e.target.value)}
  placeholder="https://techpilot.in/uploads/image.webp"
/>


        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Publishing..."
            : "🚀 Publish Article"}
        </button>

      </form>

    </main>
  );
}
