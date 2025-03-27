import React from 'react'

const chartInput = () => {
  return (
      <div> <div className="p-4 w-full">
          {imagePreview && (
              <div className="mb-3 flex items-center gap-2">
                  <div className="relative">
                      <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                      />
                      <button
                          onClick={removeImage}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                          type="button"
                      >
                          <FaTimes className="size-3" />
                      </button>
                  </div>
              </div>
          )}

          <form onSubmit={sendMessage} className="flex items-center gap-2">
              <div className="flex-1 flex gap-2">
                  <input
                      type="text"
                      className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                  />
                  <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                  />

                  <button
                      type="button"
                      className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                      onClick={() => fileInputRef.current?.click()}
                  >
                      <FaImage size={20} />
                  </button>
              </div>
              <button
                  type="submit"
                  className="btn btn-sm btn-circle"
                  disabled={!message.trim() && !imagePreview}
              >
                  <FaPaperPlane size={22} />
              </button>
          </form>
      </div></div>
  )
}

export default chartInput