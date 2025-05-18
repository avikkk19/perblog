import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const SignBook = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    suggestion: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  useEffect(() => {
    fetchEntries();
    // Get last submission timestamp from localStorage
    const lastSubmit = localStorage.getItem("lastSubmission");
    if (lastSubmit) {
      setLastSubmission(parseInt(lastSubmit));
    }
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("visitor_signbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setEntries(data || []);
    } catch (err) {
      console.error("Error fetching entries:", err);
      setError("Failed to load entries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateContent = (text) => {
    // Check for suspicious patterns (spam keywords, excessive URLs, etc.)
    const spamPatterns = [
      /\b(casino|viagra|forex|crypto|buy now|click here)\b/i,
      /(https?:\/\/[^\s]+){3,}/, // More than 2 URLs
      /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}){2,}/, // Multiple emails
    ];

    return !spamPatterns.some((pattern) => pattern.test(text));
  };

  const checkRateLimit = () => {
    const now = Date.now();
    // Limit to one submission every 5 minutes (300000 ms)
    if (lastSubmission && now - lastSubmission < 300000) {
      return false;
    }
    return true;
  };

  const checkDuplicate = async (name, suggestion) => {
    try {
      // Check for identical entries in the last 24 hours
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const { data, error } = await supabase
        .from("visitor_signbook")
        .select("*")
        .eq("name", name)
        .eq("suggestion", suggestion)
        .gte("created_at", twentyFourHoursAgo.toISOString());

      if (error) throw error;

      return data && data.length > 0;
    } catch (err) {
      console.error("Error checking for duplicates:", err);
      return false; // In case of error, proceed with caution
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.suggestion.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Content validation
    if (!validateContent(formData.suggestion)) {
      setError(
        "Your message was flagged as potential spam. Please revise your content."
      );
      return;
    }

    // Rate limiting
    if (!checkRateLimit()) {
      setError("Please wait at least 5 minutes between submissions.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Check for duplicate entries
      const isDuplicate = await checkDuplicate(
        formData.name.trim(),
        formData.suggestion.trim()
      );

      if (isDuplicate) {
        setError(
          "A similar entry was recently submitted. Please wait before submitting again."
        );
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.from("visitor_signbook").insert([
        {
          name: formData.name.trim(),
          suggestion: formData.suggestion.trim(),
        },
      ]);

      if (error) {
        throw error;
      }

      // Store submission timestamp
      const now = Date.now();
      localStorage.setItem("lastSubmission", now.toString());
      setLastSubmission(now);

      // Reset form and show success message
      setFormData({ name: "", suggestion: "" });
      setSuccess(true);

      // Refresh entries
      fetchEntries();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting entry:", err);
      setError(err.message || "Failed to submit your entry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 relative"
      style={{
        backgroundImage: "url('/fivicon2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8">
          Sign the <span className="text-green-500">Guestbook.</span>
        </h2>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-xl shadow-md p-6 mb-10 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="suggestion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Suggestion or Feedback
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                value={formData.suggestion}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Sign the Book"
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                Thank you for signing the guestbook!
              </div>
            )}
          </form>
        </div>

        {/* Entries */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Entries
          </h3>

          {loading ? (
            <div className="flex justify-center py-10">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-10 text-center text-white">
              No entries yet. Be the first to sign the guestbook!
            </div>
          ) : (
            <div className="grid gap-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {entry.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {entry.suggestion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignBook;
