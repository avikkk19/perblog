import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://ldhrauogmxyxtqmeccgs.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      // List files in the 'photography' folder inside 'images' bucket
      const { data, error } = await supabase.storage
        .from("images")
        .list("photography", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) throw error;

      if (!data || data.length === 0) {
        setPhotos([]);
        setLoading(false);
        return;
      }

      // Filter only image files
      const imageFiles = data.filter((file) =>
        /\.(jpe?g|png|gif|webp|svg)$/i.test(file.name)
      );

      // Generate public URLs for each image
      const photosWithUrls = imageFiles.map((file) => {
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(`photography/${file.name}`);

        return {
          id: file.id || file.name,
          name: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
          url: data.publicUrl,
        };
      });

      console.log("Generated URLs:", photosWithUrls); // Debug log
      setPhotos(photosWithUrls);
    } catch (err) {
      setError(err.message || "Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "avinash@6871") {
      setIsUploaderOpen(true);
      setPasswordError("");
      document.getElementById("password-modal").close();
    } else {
      setPasswordError("Invalid password");
      setTimeout(() => setPasswordError(""), 3000);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadingFiles(files);
    setUploadProgress({});
    setUploadSuccess(false);
  };

  const uploadFiles = async () => {
    if (uploadingFiles.length === 0) return;

    const uploads = uploadingFiles.map(async (file) => {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExt}`;
        const filePath = `photography/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            onUploadProgress: (progress) => {
              const percent = Math.round(
                (progress.loaded / progress.total) * 100
              );
              setUploadProgress((prev) => ({
                ...prev,
                [file.name]: percent,
              }));
            },
          });

        if (uploadError) throw uploadError;
        return { success: true, fileName, path: filePath };
      } catch (err) {
        return { success: false, fileName: file.name, error: err.message };
      }
    });

    const results = await Promise.all(uploads);
    const allSuccessful = results.every((result) => result.success);

    if (allSuccessful) {
      setUploadSuccess(true);
      setUploadingFiles([]);
      setTimeout(() => {
        setRefreshTrigger((prev) => prev + 1);
      }, 1000);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading photos...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
        My <span className="text-green-500">Photography, </span>
      </h2>
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 ml-4">
        and <span className="text-green-500">the images i admire.</span>
      </h2>

      {photos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">
            No images found. Upload some photos to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative pb-[66.25%]">
                <img
                  src={photo.url}
                  alt={photo.name || "Photography"}
                  className="absolute h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Image+Not+Found";
                  }}
                />
              </div>
              {photo.name && (
                <div className="p-2 bg-gray-800 bg-opacity-80">
                  <p className="text-sm text-gray-300 text-center">
                    {photo.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Admin Upload Section */}
      <div className="mt-16 flex justify-center">
        {!isUploaderOpen ? (
          <div className="text-center">
            <button
              onClick={() =>
                document.getElementById("password-modal").showModal()
              }
              className="opacity-30 hover:opacity-100 transition-opacity duration-300 text-xs text-gray-500 dark:text-gray-400 py-2 px-4 rounded-full"
              aria-label="Admin Upload"
            >
              •••
            </button>

            {/* Password Modal */}
            <dialog
              id="password-modal"
              className="modal p-6 rounded-lg bg-gray-800 shadow-xl"
            >
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Admin Access</h3>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
                    required
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
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        ) : (
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Upload Images</h3>

            <div className="mb-4">
              <label className="block w-full cursor-pointer bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 text-center transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {uploadingFiles.length === 0
                  ? "Select Images"
                  : `${uploadingFiles.length} files selected`}
              </label>
            </div>

            {uploadingFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                {uploadingFiles.map((file, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1 truncate text-white">
                      {file.name}
                    </div>
                    <div className="w-16 text-right text-white">
                      {uploadProgress[file.name]
                        ? `${uploadProgress[file.name]}%`
                        : "0%"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {uploadSuccess && (
              <div className="mb-4 p-2 bg-green-600 text-white rounded text-center">
                Upload successful!
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsUploaderOpen(false);
                  setUploadingFiles([]);
                  setPassword("");
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={uploadFiles}
                disabled={uploadingFiles.length === 0}
                className={`px-4 py-2 rounded text-white ${
                  uploadingFiles.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photography;
