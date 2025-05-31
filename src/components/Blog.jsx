import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogPage, setShowBlogPage] = useState(false);

  // Blog creation form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching blogs:", error);
    else setBlogs(data);
    setLoading(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "avinash@6871") {
      setIsCreatorOpen(true);
      setPasswordError("");
      document.getElementById("password-modal").close();
    } else {
      setPasswordError("Invalid password");
      setTimeout(() => setPasswordError(""), 3000);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogForm((prev) => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setUploading(true);
    setCreateError("");

    try {
      let imageUrl = null;

      // Upload image if provided
      if (blogForm.image) {
        imageUrl = await uploadImage(blogForm.image);
      }

      // Parse tags
      const tagsArray = blogForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Insert blog post
      const blogData = {
        title: blogForm.title,
        summary: blogForm.summary,
        content: blogForm.content,
        tags: tagsArray,
        created_at: new Date().toISOString(),
      };

      // Only include image_url if we have one
      if (imageUrl) {
        blogData.image_url = imageUrl;
      }

      const { error } = await supabase.from("blogs").insert([blogData]);

      if (error) throw error;

      // Reset form
      setBlogForm({
        title: "",
        summary: "",
        content: "",
        tags: "",
        image: null,
      });
      setImagePreview(null);
      setCreateSuccess(true);

      // Refresh blogs list
      setTimeout(() => {
        setRefreshTrigger((prev) => prev + 1);
        setCreateSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setCreateError(error.message || "Failed to create blog post");
    } finally {
      setUploading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setBlogForm((prev) => ({ ...prev, [field]: value }));
  };

  const openBlogPage = (blog) => {
    setSelectedBlog(blog);
    setShowBlogPage(true);
  };

  const closeBlogPage = () => {
    setSelectedBlog(null);
    setShowBlogPage(false);
  };

  // Custom components for ReactMarkdown
  const markdownComponents = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3 mt-6 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-zinc-900 dark:text-white mb-2 mt-4 first:mt-0">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-medium text-zinc-900 dark:text-white mb-2 mt-4 first:mt-0">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-medium text-zinc-900 dark:text-white mb-2 mt-4 first:mt-0">
        {children}
      </h6>
    ),

    // Paragraphs and text
    p: ({ children }) => {
      // Prevent <div> inside <p> by checking if children contains a block element
      const hasBlock =
        Array.isArray(children) &&
        children.some((child) => {
          if (!child) return false;
          if (typeof child === "object" && child.type) {
            const blockTags = [
              "div",
              "pre",
              "table",
              "blockquote",
              "ul",
              "ol",
              "hr",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
            ];
            return blockTags.includes(child.type);
          }
          return false;
        });
      if (hasBlock) {
        return (
          <div className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
            {children}
          </div>
        );
      }
      return (
        <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
          {children}
        </p>
      );
    },

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-zinc-700 dark:text-zinc-300">{children}</li>
    ),

    // Code blocks and inline code
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      if (!inline) {
        // Block code with syntax highlighting
        return (
          <div className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
            {language && (
              <div className="bg-zinc-800 dark:bg-zinc-900 px-4 py-2 text-zinc-300 text-sm font-medium border-b border-zinc-700">
                {language}
              </div>
            )}
            <SyntaxHighlighter
              style={oneDark}
              language={language || "text"}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderRadius: language ? "0 0 0.5rem 0.5rem" : "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                background: "#0d1117",
              }}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // Inline code
        return (
          <code
            className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono border border-zinc-200 dark:border-zinc-700"
            {...props}
          >
            {children}
          </code>
        );
      }
    },

    // Pre tags - prevent double wrapping
    pre: ({ children }) => {
      return <>{children}</>;
    },

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-400 dark:border-zinc-600 pl-4 my-4 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 py-2">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-50 dark:bg-zinc-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white dark:bg-zinc-900/30">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-zinc-200 dark:border-zinc-700">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold text-zinc-900 dark:text-white border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-t border-zinc-300 dark:border-zinc-600" />
    ),

    // Images
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-6 border border-zinc-200 dark:border-zinc-700"
      />
    ),

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-700 dark:text-zinc-300">{children}</em>
    ),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-zinc-600 dark:text-zinc-400">Loading blogs...</div>
      </div>
    );
  } // Blog Detail Page
  if (showBlogPage && selectedBlog) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900/30">
        {/* Header with back button */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900/30 border-b border-zinc-200 dark:border-zinc-700">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={closeBlogPage}
              className="flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 rounded-full dark:bg-zinc-800/30 dark:hover:bg-blue-700/70 p-2 shadow-sm hover:shadow-md"
              aria-label="Back to blog list"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Featured Image */}
          {selectedBlog.image_url && (
            <div className="w-full h-74 md:h-74 mb-8 rounded-lg overflow-hidden">
              <img
                src={selectedBlog.image_url}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article>
            {/* Title and Meta */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                <time dateTime={selectedBlog.created_at}>
                  {new Date(selectedBlog.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
                {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              {selectedBlog.summary && (
                <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border-l-4 border-zinc-400 dark:border-zinc-600">
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 font-medium italic">
                    {selectedBlog.summary}
                  </p>
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {selectedBlog.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Main Blog List Page
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 ml-4">
        My <span className="text-blue-600 dark:text-blue-400">Blog Posts</span>
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 ml-4">
        Thoughts, ideas, and stories worth sharing.
      </p>

      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-zinc-400 dark:text-zinc-500">
            No blog posts yet. Check back soon for new content.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div key={blog.blog_id} className="group">
              <div
                onClick={() => openBlogPage(blog)}
                className="cursor-pointer p-6 bg-white dark:bg-gray-900/30 rounded-lg shadow-sm hover:shadow-sm transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg
                      className="w-5 h-5 text-zinc-400 dark:text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {index < blogs.length - 1 && (
                <div className="relative my-6 flex items-center justify-center">
                  {/* Gradient line */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Admin Create Blog Section */}
      <div className="mt-16 flex justify-center">
        {!isCreatorOpen ? (
          <div className="text-center">
            <button
              onClick={() =>
                document.getElementById("password-modal").showModal()
              }
              className="opacity-30 hover:opacity-100 transition-opacity duration-300 text-xs text-zinc-500 dark:text-zinc-400 py-2 px-4 rounded-full"
              aria-label="Admin Create Blog"
            >
              •••
            </button>

            {/* Password Modal - FIXED WITH FORM */}
            <dialog
              id="password-modal"
              className="modal p-6 rounded-lg bg-zinc-800 dark:bg-zinc-900 shadow-xl"
            >
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Admin Access</h3>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-2 rounded bg-zinc-700 dark:bg-zinc-800 text-white border border-zinc-600 dark:border-zinc-700 focus:border-blue-500 focus:outline-none"
                    required
                    autoComplete="new-password"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("password-modal").close();
                      setPassword("");
                    }}
                    className="px-4 py-2 bg-zinc-600 dark:bg-zinc-700 text-white rounded hover:bg-zinc-700 dark:hover:bg-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              Create New Blog Post
            </h3>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="w-full p-3 rounded bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Summary *
                </label>
                <textarea
                  value={blogForm.summary}
                  onChange={(e) => handleFormChange("summary", e.target.value)}
                  className="w-full p-3 rounded bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:outline-none h-20 resize-none"
                  placeholder="Brief summary of the blog post"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => handleFormChange("content", e.target.value)}
                  className="w-full p-3 rounded bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:outline-none h-32 resize-none"
                  placeholder="Full blog content (supports Markdown formatting, code blocks with ```language)"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => handleFormChange("tags", e.target.value)}
                  className="w-full p-3 rounded bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter tags separated by commas (e.g., tech, programming, web)"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Featured Image
                </label>
                <div className="space-y-3">
                  <label className="block w-full cursor-pointer bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white rounded-lg p-4 text-center transition border border-zinc-300 dark:border-zinc-600">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    {blogForm.image ? blogForm.image.name : "Select Image"}
                  </label>

                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-zinc-300 dark:border-zinc-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              {createSuccess && (
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded text-center border border-blue-200 dark:border-blue-800">
                  Blog post created successfully!
                </div>
              )}

              {createError && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded text-center border border-red-200 dark:border-red-800">
                  {createError}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatorOpen(false);
                    setBlogForm({
                      title: "",
                      summary: "",
                      content: "",
                      tags: "",
                      image: null,
                    });
                    setImagePreview(null);
                    setPassword("");
                    setCreateError("");
                  }}
                  className="px-6 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-900 dark:text-white rounded hover:bg-zinc-300 dark:hover:bg-zinc-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    uploading ||
                    !blogForm.title ||
                    !blogForm.summary ||
                    !blogForm.content
                  }
                  className={`px-6 py-2 rounded text-white transition ${
                    uploading ||
                    !blogForm.title ||
                    !blogForm.summary ||
                    !blogForm.content
                      ? "bg-zinc-400 dark:bg-zinc-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {uploading ? "Creating..." : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
