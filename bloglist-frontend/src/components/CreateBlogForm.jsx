const CreateBlogForm = ({ handleCreateBlog, title, author, url, handleTitle, handleAuthor, handleUrl}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={handleUrl}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm