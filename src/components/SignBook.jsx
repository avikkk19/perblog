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

  useEffect(() => {
    fetchEntries();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.suggestion.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const { error } = await supabase.from("visitor_signbook").insert([
        {
          name: formData.name.trim(),
          suggestion: formData.suggestion.trim(),
        },
      ]);

      if (error) {
        throw error;
      }

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Sign the Guestbook
        </h2>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
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
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
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
            <div className="py-10 text-center text-gray-600 dark:text-gray-400">
              No entries yet. Be the first to sign the guestbook!
            </div>
          ) : (
            <div className="grid gap-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700"
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
