"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/RichTextEditor";
import MediaPicker from "@/components/MediaPicker";
export default function EditPostForm({ post }: { post: any }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
const [seoTitle, setSeoTitle] = useState(post.seo_title ?? "");
const [metaDescription, setMetaDescription] = useState(
  post.meta_description ?? ""
);

const [featuredImage, setFeaturedImage] = useState<File | null>(null);
const [bannerImage, setBannerImage] = useState<File | null>(null);
const [featuredImageUrl, setFeaturedImageUrl] = useState(
  post.featured_image ?? ""
);

const [bannerImageUrl, setBannerImageUrl] = useState(
  post.banner ?? ""
);
async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

  async function handleUpdate() {
    let finalFeaturedImageUrl = featuredImageUrl;
let finalBannerUrl = bannerImageUrl;

if (featuredImage) {
  finalFeaturedImageUrl =
    await uploadImage(featuredImage);
}

if (bannerImage) {
  finalBannerUrl =
    await uploadImage(bannerImage);
}
    const { error } = await supabase
      .from("posts")
      .update({
  title,
  slug,
  category,
  description,
  content,
  seo_title: seoTitle,
  meta_description: metaDescription,
  featured_image: finalFeaturedImageUrl,
  banner: finalBannerUrl,
})
      .eq("id", post.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Article Updated Successfully");
    router.refresh();
  }

  return (
    <>
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <label>Slug</label>
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <br />
      <br />

      <label>Description</label>
      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />
      <label>Category</label>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="AI">AI</option>
  <option value="Gaming">Gaming</option>
  <option value="Smartphones">Smartphones</option>
  <option value="Guides">Guides</option>
  <option value="PC Build">PC Build</option>
</select>


      <label>Content</label>
      <RichTextEditor
  value={content}
  onChange={setContent}
/>

      <br />
      <br />
      <label>Featured Image</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0] || null;

    setFeaturedImage(file);

    if (file) {
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

<br /><br />

<label>Banner Image</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0] || null;

    setBannerImage(file);

    if (file) {
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

      <button onClick={handleUpdate}>
        💾 Save Changes
      </button>
      <label>SEO Title</label>

<input
  value={seoTitle}
  onChange={(e) => setSeoTitle(e.target.value)}
/>

<br /><br />

<label>Meta Description</label>

<textarea
  rows={4}
  value={metaDescription}
  onChange={(e) =>
    setMetaDescription(e.target.value)
  }
/>
    </>
    
  );
  
}
